// Abstraction du fournisseur IA.
// - ANTHROPIC_API_KEY présent → API Claude (@anthropic-ai/sdk), fournisseur recommandé.
// - Sinon → z-ai-web-dev-sdk (legacy, environnement de dev Z.ai uniquement).
// Toutes les routes passent par aiChat()/readWebPage() ; aucun SDK n'est appelé directement.
import Anthropic from '@anthropic-ai/sdk'

const CLAUDE_MODEL = 'claude-opus-4-8'

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
    // Fetch direct + extraction texte grossière (suffisant pour l'extraction de mots-clés)
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NouveauCapBot/1.0)' },
      signal: AbortSignal.timeout(15000),
    })
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
