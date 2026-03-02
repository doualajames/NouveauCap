import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

// AI-powered CV optimization
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    const zai = await ZAI.create()

    if (action === 'optimize-cv') {
      const { cvContent, targetJob, language } = data

      const prompt = language === 'fr' 
        ? `Vous êtes un expert en recrutement canadien. Optimisez ce CV pour le marché du travail canadien et le poste suivant: ${targetJob || 'poste général'}.
          
CV original:
${cvContent}

Fournissez:
1. Un CV optimisé au format canadien (structuré et clair)
2. Des suggestions d'amélioration (3-5 points)
3. Des mots-clés ATS pertinents à ajouter

Répondez en français avec le format JSON suivant:
{
  "optimizedCv": "CV optimisé...",
  "suggestions": ["suggestion1", "suggestion2"],
  "keywords": ["mot-clé1", "mot-clé2"]
}`
        : `You are a Canadian recruitment expert. Optimize this CV for the Canadian job market and the following position: ${targetJob || 'general position'}.
          
Original CV:
${cvContent}

Provide:
1. An optimized CV in Canadian format (structured and clear)
2. Improvement suggestions (3-5 points)
3. Relevant ATS keywords to add

Respond in English with the following JSON format:
{
  "optimizedCv": "Optimized CV...",
  "suggestions": ["suggestion1", "suggestion2"],
  "keywords": ["keyword1", "keyword2"]
}`

      const completion = await zai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a professional CV writer specializing in Canadian job markets. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })

      const responseText = completion.choices[0]?.message?.content || ''
      
      try {
        // Try to parse JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0])
          return NextResponse.json(result)
        }
      } catch {
        // If JSON parsing fails, return raw text
      }

      return NextResponse.json({
        optimizedCv: responseText,
        suggestions: [],
        keywords: []
      })
    }

    if (action === 'interview-prep') {
      const { jobTitle, company, language } = data

      const prompt = language === 'fr'
        ? `Préparez des questions d'entretien courantes pour un poste de ${jobTitle} au Canada${company ? ` chez ${company}` : ''}.
          
Fournissez:
1. 10 questions fréquentes pour ce type de poste
2. Des conseils pour répondre en format STAR (Situation, Tâche, Action, Résultat)
3. Questions à poser à l'employeur

Répondez en JSON:
{
  "questions": ["question1", "question2"],
  "starTips": "conseils...",
  "questionsToAsk": ["question1", "question2"]
}`
        : `Prepare common interview questions for a ${jobTitle} position in Canada${company ? ` at ${company}` : ''}.
          
Provide:
1. 10 frequent questions for this type of position
2. Tips for answering in STAR format (Situation, Task, Action, Result)
3. Questions to ask the employer

Respond in JSON:
{
  "questions": ["question1", "question2"],
  "starTips": "tips...",
  "questionsToAsk": ["question1", "question2"]
}`

      const completion = await zai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are an interview coach specializing in Canadian job markets. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })

      const responseText = completion.choices[0]?.message?.content || ''
      
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0])
          return NextResponse.json(result)
        }
      } catch {
        // If JSON parsing fails
      }

      return NextResponse.json({
        questions: [],
        starTips: responseText,
        questionsToAsk: []
      })
    }

    if (action === 'chat') {
      const { message, context, language } = data

      const systemPrompt = language === 'fr'
        ? `Vous êtes un assistant IA utile pour les nouveaux immigrants au Canada. Répondez de manière claire, empathique et pratique. 
Contexte: ${context || 'Utilisateur général'}`
        : `You are a helpful AI assistant for new immigrants to Canada. Respond in a clear, empathetic, and practical manner.
Context: ${context || 'General user'}`

      const completion = await zai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7
      })

      return NextResponse.json({
        response: completion.choices[0]?.message?.content || ''
      })
    }

    return NextResponse.json({ error: 'Action invalide' }, { status: 400 })
  } catch (error) {
    console.error('AI error:', error)
    return NextResponse.json(
      { error: 'Erreur IA' },
      { status: 500 }
    )
  }
}
