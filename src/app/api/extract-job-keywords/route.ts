import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { requireAuth } from '@/lib/auth-jwt'

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) {
      return authResult
    }

    const { url, language } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const zai = await ZAI.create()

    // Use web-reader to extract content from the job posting
    const webContent = await zai.functions.invoke("web_reader", {
      url: url
    })

    // Extract text content
    const pageContent = webContent?.content || webContent?.text || ''
    const pageTitle = webContent?.title || ''

    if (!pageContent || pageContent.length < 100) {
      return NextResponse.json({ 
        error: 'Could not extract sufficient content from the URL',
        keywords: [],
        jobInfo: null
      })
    }

    // Use AI to extract ATS keywords and job information
    const extractionPrompt = language === 'fr' 
      ? `Analyse cette offre d'emploi et extrait les informations suivantes au format JSON:
      
      1. "keywords": Un tableau de 15-25 mots-clés ATS importants (compétences techniques, outils, certifications, compétences soft skills mentionnées)
      2. "jobInfo": Un objet contenant:
         - "title": Le titre du poste
         - "company": Le nom de l'entreprise
         - "requirements": Un tableau des 5 principales exigences/qualifications
      
      Contenu de l'offre:
      Titre: ${pageTitle}
      Contenu: ${pageContent.substring(0, 5000)}
      
      Réponds UNIQUEMENT avec un JSON valide, sans texte avant ou après.`
      : `Analyze this job posting and extract the following information in JSON format:
      
      1. "keywords": An array of 15-25 important ATS keywords (technical skills, tools, certifications, soft skills mentioned)
      2. "jobInfo": An object containing:
         - "title": The job title
         - "company": The company name
         - "requirements": An array of the 5 main requirements/qualifications
      
      Job posting content:
      Title: ${pageTitle}
      Content: ${pageContent.substring(0, 5000)}
      
      Respond ONLY with valid JSON, no text before or after.`

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert ATS keyword extractor. You respond only with valid JSON.'
        },
        {
          role: 'user',
          content: extractionPrompt
        }
      ],
      temperature: 0.3
    })

    const responseContent = completion.choices[0]?.message?.content || '{}'
    
    // Parse the JSON response
    let extractedData = { keywords: [], jobInfo: null }
    try {
      // Clean up the response - remove markdown code blocks if present
      let cleanResponse = responseContent.trim()
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '')
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/```\n?/g, '')
      }
      extractedData = JSON.parse(cleanResponse)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      // Fallback: try to extract keywords manually from content
      extractedData = {
        keywords: extractKeywordsManually(pageContent),
        jobInfo: {
          title: pageTitle,
          company: '',
          requirements: []
        }
      }
    }

    return NextResponse.json({
      keywords: extractedData.keywords || [],
      jobInfo: extractedData.jobInfo || null,
      sourceTitle: pageTitle
    })

  } catch (error: any) {
    console.error('Extract keywords error:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to extract keywords',
      keywords: [],
      jobInfo: null
    }, { status: 500 })
  }
}

// Fallback function to extract keywords manually using common ATS patterns
function extractKeywordsManually(content: string): string[] {
  const commonATSKeywords = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'React', 'Vue', 'Angular', 
    'Node', 'SQL', 'PostgreSQL', 'MongoDB', 'AWS', 'Azure', 'Docker', 
    'Kubernetes', 'Git', 'Agile', 'Scrum', 'REST', 'API', 'Machine Learning',
    'Leadership', 'Communication', 'Problem Solving', 'Project Management'
  ]

  const foundKeywords: string[] = []

  commonATSKeywords.forEach(keyword => {
    if (content.toLowerCase().includes(keyword.toLowerCase())) {
      foundKeywords.push(keyword)
    }
  })

  return foundKeywords.slice(0, 20)
}
