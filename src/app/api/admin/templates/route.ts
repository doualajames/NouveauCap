import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAuth, isAdmin } from '@/lib/auth-jwt'

// Administration du corpus de templates d'onboarding (réservé ADMIN_EMAILS)

async function requireAdmin(request: NextRequest) {
  const authResult = await requireAuth(request)
  if (authResult instanceof Response) return authResult
  if (!isAdmin(authResult)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  return authResult
}

// GET — liste filtrable (?status=&province=&active=)
export async function GET(request: NextRequest) {
  const guard = await requireAdmin(request)
  if (guard instanceof Response) return guard

  const { searchParams } = new URL(request.url)
  const where: any = {}
  const status = searchParams.get('status')
  const province = searchParams.get('province')
  const active = searchParams.get('active')
  if (status) where.status = status
  if (province) where.province = province === 'base' ? null : province
  if (active !== null && active !== '') where.active = active === 'true'

  const templates = await db.taskTemplate.findMany({
    where,
    orderBy: [{ status: 'asc' }, { province: 'asc' }, { order: 'asc' }],
  })
  return NextResponse.json({ templates, count: templates.length })
}

// POST — créer un template
export async function POST(request: NextRequest) {
  const guard = await requireAdmin(request)
  if (guard instanceof Response) return guard

  const body = await request.json()
  const { status, title, titleEn, category, priority } = body
  if (!status || !title || !titleEn || !category || !priority) {
    return NextResponse.json(
      { error: 'status, title, titleEn, category et priority sont requis' },
      { status: 400 }
    )
  }

  const template = await db.taskTemplate.create({
    data: {
      status,
      province: body.province || null,
      title,
      titleEn,
      description: body.description || null,
      descriptionEn: body.descriptionEn || null,
      category,
      priority,
      isRequired: !!body.isRequired,
      order: body.order ?? 0,
      source: body.source || null,
      active: body.active ?? true,
    },
  })
  return NextResponse.json({ template }, { status: 201 })
}

// PUT — mettre à jour un template ({ id, ...champs })
export async function PUT(request: NextRequest) {
  const guard = await requireAdmin(request)
  if (guard instanceof Response) return guard

  const { id, ...fields } = await request.json()
  if (!id) {
    return NextResponse.json({ error: 'id requis' }, { status: 400 })
  }

  const ALLOWED = [
    'status', 'province', 'title', 'titleEn', 'description', 'descriptionEn',
    'category', 'priority', 'isRequired', 'order', 'source', 'active',
  ]
  const data: any = {}
  for (const k of ALLOWED) {
    if (k in fields) data[k] = fields[k]
  }

  try {
    const template = await db.taskTemplate.update({ where: { id }, data })
    return NextResponse.json({ template })
  } catch {
    return NextResponse.json({ error: 'Template introuvable' }, { status: 404 })
  }
}

// DELETE — désactivation douce par défaut (?id=...), suppression réelle avec &hard=true
export async function DELETE(request: NextRequest) {
  const guard = await requireAdmin(request)
  if (guard instanceof Response) return guard

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'id requis' }, { status: 400 })
  }

  try {
    if (searchParams.get('hard') === 'true') {
      await db.taskTemplate.delete({ where: { id } })
    } else {
      await db.taskTemplate.update({ where: { id }, data: { active: false } })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Template introuvable' }, { status: 404 })
  }
}
