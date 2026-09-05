/* eslint-disable @typescript-eslint/no-require-imports */
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-jwt'

// pdf-parse (pdfjs) référence DOMMatrix au chargement du module : l'importer
// en top-level casse la collecte de pages au build. On force le runtime Node,
// on désactive l'évaluation statique et on charge les libs à la demande.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) {
      return authResult
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = file.name.toLowerCase()
    let text = ''

    // Extract text based on file type (libs chargées à la demande, cf. runtime Node)
    if (fileName.endsWith('.pdf')) {
      const pdfParse = require('pdf-parse')
      const pdfData = await pdfParse(buffer)
      text = pdfData.text
    } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      const mammoth = require('mammoth')
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else if (fileName.endsWith('.txt')) {
      text = buffer.toString('utf-8')
    } else {
      return NextResponse.json({ 
        error: 'Unsupported file format. Please use PDF, DOCX, or TXT.' 
      }, { status: 400 })
    }

    // Clean up the text
    text = text
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim()

    if (!text || text.length < 50) {
      return NextResponse.json({ 
        error: 'Could not extract enough text from the file. Please try another file or paste the text directly.' 
      }, { status: 400 })
    }

    return NextResponse.json({ 
      text,
      length: text.length,
      fileName: file.name
    })

  } catch (error: any) {
    console.error('File extraction error:', error)
    return NextResponse.json({ 
      error: 'Failed to extract text from file',
      details: error.message 
    }, { status: 500 })
  }
}
