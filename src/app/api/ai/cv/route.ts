import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { cvText, jobDescription, language = 'fr' } = body

    if (!cvText) {
      return NextResponse.json(
        { error: 'CV text is required' },
        { status: 400 }
      )
    }

    const zai = await ZAI.create()

    const systemPrompt = language === 'fr' 
      ? `Tu es un expert en ressources humaines et en CV canadiens. Tu aide les nouveaux arrivants au Canada à optimiser leur CV selon les normes canadiennes.

Règles importantes pour un CV canadien:
- Pas de photo, pas d'âge, pas d'état civil
- Format chronologique inverse
- 2 pages maximum pour la plupart des postes
- Utiliser des verbes d'action
- Quantifier les accomplissements
- Adapter le CV au poste visé
- Inclure les compétences transférables
- Mentionner la maîtrise des langues (français/anglais)

Réponds en format JSON avec la structure suivante:
{
  "score": <note sur 100>,
  "strengths": [<liste des points forts>],
  "improvements": [<liste des améliorations suggérées>],
  "canadianFormatTips": [<conseils spécifiques au format canadien>],
  "suggestedSummary": "<résumé professionnel suggéré>",
  "keywords": [<mots-clés pertinents à ajouter>]
}`
      : `You are an HR expert specializing in Canadian CVs. You help newcomers to Canada optimize their CVs according to Canadian standards.

Important rules for a Canadian CV:
- No photo, no age, no marital status
- Reverse chronological format
- Maximum 2 pages for most positions
- Use action verbs
- Quantify accomplishments
- Tailor the CV to the target position
- Include transferable skills
- Mention language proficiency (French/English)

Respond in JSON format with the following structure:
{
  "score": <score out of 100>,
  "strengths": [<list of strengths>],
  "improvements": [<list of suggested improvements>],
  "canadianFormatTips": [<tips specific to Canadian format>],
  "suggestedSummary": "<suggested professional summary>",
  "keywords": [<relevant keywords to add>]
}`

    const userPrompt = language === 'fr'
      ? `Voici mon CV:\n\n${cvText}\n\n${jobDescription ? `Voici la description du poste visé:\n\n${jobDescription}` : 'Je cherche un poste général.'}\n\nAnalyse mon CV et donne-moi des conseils pour l'optimiser selon les normes canadiennes.`
      : `Here is my CV:\n\n${cvText}\n\n${jobDescription ? `Here is the target job description:\n\n${jobDescription}` : 'I am looking for a general position.'}\n\nAnalyze my CV and give me advice to optimize it according to Canadian standards.`

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
    })

    const responseText = completion.choices[0]?.message?.content || ''

    // Try to parse as JSON, if not, wrap in a structured response
    let analysis
    try {
      // Extract JSON from the response if it's wrapped in markdown code blocks
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || 
                        responseText.match(/```\s*([\s\S]*?)\s*```/)
      const jsonStr = jsonMatch ? jsonMatch[1] : responseText
      analysis = JSON.parse(jsonStr)
    } catch {
      // If parsing fails, create a structured response
      analysis = {
        score: 70,
        strengths: ['CV bien structuré'],
        improvements: [responseText.substring(0, 500)],
        canadianFormatTips: ['Consultez notre guide pour plus de détails'],
        suggestedSummary: '',
        keywords: [],
        rawResponse: responseText,
      }
    }

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error('CV analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze CV' },
      { status: 500 }
    )
  }
}
