import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = file.name.toLowerCase()
    let text = ''
    if (fileName.endsWith('.pdf')) {
      const { extractText } = await import('unpdf')
      const { text: pdfText } = await extractText(new Uint8Array(buffer), { mergePages: true })
      text = pdfText
    } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      const mammoth = require('mammoth')
      text = (await mammoth.extractRawText({ buffer })).value
    } else if (fileName.endsWith('.txt')) {
      text = buffer.toString('utf-8')
    } else {
      return NextResponse.json({ error: 'Format non supporté. PDF, DOCX ou TXT uniquement.' }, { status: 400 })
    }
    text = text.replace(/\s+/g, ' ').trim()
    if (!text || text.length < 50)
      return NextResponse.json({ error: 'Texte insuffisant extrait du fichier.' }, { status: 400 })
    return NextResponse.json({ text, length: text.length, fileName: file.name })
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Échec extraction', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
