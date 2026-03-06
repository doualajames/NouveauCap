import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

// Immigration knowledge base for the chatbot
const IMMIGRATION_KNOWLEDGE = `
# NouveauCap Immigration Assistant Knowledge Base

## Express Entry
- Express Entry is Canada's main immigration application management system
- It manages applications for 3 federal economic immigration programs:
  1. Federal Skilled Worker Program (FSWP)
  2. Federal Skilled Trades Program (FSTP)
  3. Canadian Experience Class (CEC)
- Candidates are ranked using the Comprehensive Ranking System (CRS)
- Regular draws invite the highest-ranking candidates to apply for PR

## CRS Score (2025 Update)
- Maximum CRS score is 1200 points
- As of March 25, 2025, job offer points (50-200) have been REMOVED
- Provincial Nominee adds 600 points
- Key factors: age, education, language, work experience
- CLB 9+ is optimal for maximum language points

## Provincial Nominee Programs (PNP)
- All provinces and territories have their own PNP (except Quebec)
- Enhanced PNPs are aligned with Express Entry (+600 points)
- Base PNPs are separate from Express Entry
- Popular tech streams: BC PNP Tech, Ontario Tech, Alberta Tech

## Study Permits
- Valid for duration of study program plus 90 days
- Can work off-campus up to 24 hours/week during studies
- Post-Graduation Work Permit (PGWP) available after graduation
- PGWP duration depends on program length and type

## Work Permits
- Open Work Permit: work for any employer
- Closed Work Permit: tied to specific employer (LMIA required)
- PGWP: Open work permit for graduates
- Spousal Open Work Permit: for spouses of skilled workers/students

## Permanent Residency Requirements
- Physical presence: 730 days in 5 years
- Tax obligations as a tax resident
- PR card valid for 5 years, renew before expiry
- Can apply for citizenship after 3 years (1095 days)

## Healthcare
- Each province has its own health insurance plan
- Waiting periods vary by province (0-3 months)
- Ontario (OHIP): NO waiting period for PRs
- Quebec (RAMQ): Up to 3 months waiting period
- BC (MSP): 3 months waiting period
- Private insurance recommended during waiting period

## Tax Filing
- Tax year: January 1 - December 31
- Filing deadline: April 30 of following year
- Newcomers file part-year return for first year
- Key credits: GST/HST, CCB, Climate Action Incentive
- Free tax filing: Wealthsimple Tax, CVITP clinics

## Credential Recognition
- ECA (Educational Credential Assessment) required for Express Entry
- Designated organizations: WES, IQAS, ICES, CES
- Regulated professions need provincial licensing
- Bridging programs available for newcomers

## Quebec Immigration
- Quebec has its own immigration system
- CSQ (Certificat de sélection du Québec) required
- Programs: PEQ, PRTQ, Programme pilote
- French language important for most Quebec programs

## Important Government Websites
- IRCC: www.canada.ca/immigration
- CRA: www.canada.ca/cra
- Job Bank: www.jobbank.gc.ca
- StatCan: www.statcan.gc.ca
`

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { message, history, language = 'fr' } = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const zai = await ZAI.create()

    // Build conversation history
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `You are a helpful immigration assistant for NouveauCap, a platform helping newcomers settle in Canada.
        
You have access to up-to-date information about Canadian immigration programs, procedures, and services.

Knowledge Base:
${IMMIGRATION_KNOWLEDGE}

Guidelines:
- Always respond in ${language === 'fr' ? 'French' : 'English'}
- Be helpful, accurate, and empathetic
- Cite official sources when possible (IRCC, CRA, provincial websites)
- If unsure, recommend consulting official government websites or an immigration professional
- Be concise but thorough
- Format responses with clear sections when appropriate
- Provide actionable next steps when relevant
- Mention that this is general information, not legal advice`
      },
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ]

    const completion = await zai.chat.completions.create({
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000,
    })

    const response = completion.choices[0]?.message?.content || 'Désolé, je n\'ai pas pu traiter votre demande.'

    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Chatbot error:', error)
    return NextResponse.json(
      { error: 'Failed to process request', details: error.message },
      { status: 500 }
    )
  }
}

// GET endpoint for quick Q&A
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const question = searchParams.get('q')
  const language = searchParams.get('lang') || 'fr'

  if (!question) {
    return NextResponse.json({ 
      error: 'Question parameter "q" is required',
      example: '/api/chatbot?q=What is Express Entry?&lang=en'
    }, { status: 400 })
  }

  try {
    const zai = await ZAI.create()

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an immigration assistant. Answer briefly and accurately in ${language === 'fr' ? 'French' : 'English'}.
          
Knowledge:
${IMMIGRATION_KNOWLEDGE}

Keep answers under 150 words unless complexity requires more.`
        },
        {
          role: 'user',
          content: question
        }
      ],
      temperature: 0.5,
      max_tokens: 500,
    })

    return NextResponse.json({
      question,
      answer: completion.choices[0]?.message?.content,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    )
  }
}
