/* eslint-disable @typescript-eslint/no-require-imports */
// IMPORTANT: server-polyfills MUST be the first import — it sets up DOMMatrix,
// ImageData, Path2D before pdfjs-dist (dep of pdf-parse) evaluates them.
import '@/lib/server-polyfills'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Lazy-require so the polyfills above run first
  const pdfParse = require('pdf-parse')
  const mammoth = require('mammoth')

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = file.name.toLowerCase()
    let text = ''

    if (fileName.endsWith('.pdf')) {
      const pdfData = await pdfParse(buffer)
      text = pdfData.text
    } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else if (fileName.endsWith('.txt')) {
      text = buffer.toString('utf-8')
    } else {
      return NextResponse.json({
        error: 'Unsupported file format. Please use PDF, DOCX, or TXT.',
      }, { status: 400 })
    }

    text = text.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim()

    if (!text || text.length < 50) {
      return NextResponse.json({
        error: 'Could not extract enough text from the file. Please try another file or paste the text directly.',
      }, { status: 400 })
    }

    return NextResponse.json({ text, length: text.length, fileName: file.name })

  } catch (error: unknown) {
    console.error('File extraction error:', error)
    return NextResponse.json({
      error: 'Failed to extract text from file',
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 })
  }
}
