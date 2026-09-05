// Abstraction du fournisseur IA.
// - ANTHROPIC_API_KEY présent → API Claude (@anthropic-ai/sdk), fournisseur recommandé.
// - Sinon → z-ai-web-dev-sdk (legacy, environnement de dev Z.ai uniquement).
// Toutes les routes passent par aiChat()/readWebPage() ; aucun SDK n'est appelé directement.
import Anthropic from '@anthropic-ai/sdk'
import { lookup } from 'node:dns/promises'
import { isIP } from 'node:net'

const CLAUDE_MODEL = 'claude-opus-4-8'

// --- Protection SSRF -------------------------------------------------------
// readWebPage récupère une URL fournie par l'utilisateur. Sans garde, un
// utilisateur authentifié peut faire appeler par le serveur des adresses
// internes (metadata cloud 169.254.169.254, localhost, réseau privé). On
// résout le nom en IP et on rejette toute plage non publique AVANT le fetch,
// puis on revalide à chaque redirection (une redirection peut viser une IP privée).

function ipIsPrivate(ip: string): boolean {
  // IPv6 mappé IPv4 (::ffff:a.b.c.d) → tester la partie v4
  const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i)
  if (mapped) ip = mapped[1]

  if (isIP(ip) === 4) {
    const p = ip.split('.').map(Number)
    if (p.some(n => Number.isNaN(n) || n < 0 || n > 255)) return true
    const [a, b] = p
    if (a === 10) return true                         // 10.0.0.0/8
    if (a === 127) return true                        // loopback
    if (a === 0) return true                          // 0.0.0.0/8
    if (a === 169 && b === 254) return true           // link-local + metadata
    if (a === 172 && b >= 16 && b <= 31) return true  // 172.16.0.0/12
    if (a === 192 && b === 168) return true           // 192.168.0.0/16
    if (a === 100 && b >= 64 && b <= 127) return true // CGNAT 100.64.0.0/10
    if (a === 198 && (b === 18 || b === 19)) return true // bench 198.18.0.0/15
    if (a >= 224) return true                         // multicast/réservé
    return false
  }

  // IPv6
  const low = ip.toLowerCase()
  if (low === '::1' || low === '::') return true      // loopback / non spécifié
  if (low.startsWith('fe80')) return true             // link-local
  if (low.startsWith('fc') || low.startsWith('fd')) return true // ULA fc00::/7
  return false
}

async function assertPublicHost(hostname: string): Promise<void> {
  // Si littéral IP, tester directement ; sinon résoudre toutes les adresses.
  if (isIP(hostname)) {
    if (ipIsPrivate(hostname)) throw new Error('URL non autorisée (adresse privée)')
    return
  }
  const addrs = await lookup(hostname, { all: true })
  if (addrs.length === 0) throw new Error('URL non résolue')
  for (const { address } of addrs) {
    if (ipIsPrivate(address)) throw new Error('URL non autorisée (adresse privée)')
  }
}

// Fetch qui refuse toute cible non publique, redirections comprises.
async function safeFetch(rawUrl: string): Promise<Response> {
  let current = rawUrl
  for (let hop = 0; hop < 4; hop++) {
    const u = new URL(current)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') {
      throw new Error('Protocole non autorisé')
    }
    await assertPublicHost(u.hostname)
    const res = await fetch(current, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NouveauCapBot/1.0)' },
      signal: AbortSignal.timeout(15000),
      redirect: 'manual',
    })
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get('location')
      if (!loc) return res
      current = new URL(loc, current).toString() // valider au prochain tour
      continue
    }
    return res
  }
  throw new Error('Trop de redirections')
}

const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null

export interface AiChatArgs {
  system: string
  prompt: string
  maxTokens?: number
}

// Envoie un échange system+user et retourne le texte de la réponse.
export async function aiChat({ system, prompt, maxTokens = 16000 }: AiChatArgs): Promise<string> {
  if (anthropic) {
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: prompt }],
    })
    if (response.stop_reason === 'refusal') {
      throw new Error('AI request refused by safety systems')
    }
    return response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map(b => b.text)
      .join('')
  }

  // Legacy Z.ai (dev)
  const { default: ZAI } = await import('z-ai-web-dev-sdk')
  const zai = await ZAI.create()
  const completion = await zai.chat.completions.create({
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: prompt },
    ],
  })
  return completion.choices[0]?.message?.content || ''
}

// Récupère le contenu texte d'une page web (offre d'emploi, etc.).
export async function readWebPage(url: string): Promise<{ content: string; title: string }> {
  if (anthropic) {
    // Fetch protégé SSRF + extraction texte grossière (suffisant pour l'extraction de mots-clés)
    const res = await safeFetch(url)
    if (!res.ok) {
      return { content: '', title: '' }
    }
    const html = await res.text()
    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || ''
    const content = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim()
    return { content, title }
  }

  const { default: ZAI } = await import('z-ai-web-dev-sdk')
  const zai = await ZAI.create()
  // web_reader absent des types du SDK legacy mais disponible à l'exécution
  const webContent: any = await (zai.functions as any).invoke('web_reader', { url })
  return {
    content: webContent?.content || webContent?.text || '',
    title: webContent?.title || '',
  }
}
