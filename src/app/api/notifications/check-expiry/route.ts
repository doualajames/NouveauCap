import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendEmail, permitExpiryEmailHtml, taskDeadlineEmailHtml } from '@/lib/email'

// GET /api/notifications/check-expiry?secret=CRON_SECRET
// Intended to be called by a cron job (Vercel Cron, external scheduler, etc.)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const now = new Date()
  const results = { permitEmails: 0, taskEmails: 0, errors: 0 }

  // ── Permit expiry reminders (30 / 60 / 90 day thresholds) ──────────────────
  const thresholds = [30, 60, 90]

  for (const days of thresholds) {
    const start = new Date(now)
    start.setDate(now.getDate() + days - 1)
    const end = new Date(now)
    end.setDate(now.getDate() + days + 1)

    const users = await db.user.findMany({
      where: {
        OR: [
          { studyPermitExpiry: { gte: start, lte: end } },
          { workPermitExpiry: { gte: start, lte: end } },
          { passportExpiry: { gte: start, lte: end } },
          { visaExpiry: { gte: start, lte: end } },
        ],
      },
      select: {
        id: true,
        email: true,
        name: true,
        preferredLanguage: true,
        studyPermitExpiry: true,
        workPermitExpiry: true,
        passportExpiry: true,
        visaExpiry: true,
        alerts: { where: { type: 'PERMIT_EXPIRY', isEmailSent: false } },
      },
    })

    for (const user of users) {
      const permits: Array<{ type: string; expiry: Date }> = [
        ...(user.studyPermitExpiry ? [{ type: 'Study Permit', expiry: user.studyPermitExpiry }] : []),
        ...(user.workPermitExpiry ? [{ type: 'Work Permit', expiry: user.workPermitExpiry }] : []),
        ...(user.passportExpiry ? [{ type: 'Passport', expiry: user.passportExpiry }] : []),
        ...(user.visaExpiry ? [{ type: 'Visa', expiry: user.visaExpiry }] : []),
      ].filter((p) => p.expiry >= start && p.expiry <= end)

      for (const permit of permits) {
        const alertKey = `PERMIT_EXPIRY_${permit.type}_${days}d`
        const alreadySent = user.alerts.some((a) => a.title?.includes(alertKey))
        if (alreadySent) continue

        try {
          const lang = user.preferredLanguage || 'fr'
          const sent = await sendEmail({
            to: user.email,
            subject:
              lang === 'fr'
                ? `⏰ Rappel: ${permit.type} expire dans ${days} jours`
                : `⏰ Reminder: ${permit.type} expires in ${days} days`,
            html: permitExpiryEmailHtml(user.name || '', permit.type, days, lang),
          })

          if (sent) {
            // Create or update alert record with isEmailSent = true
            const existing = await db.alert.findFirst({
              where: {
                userId: user.id,
                type: 'PERMIT_EXPIRY',
                title: { contains: alertKey },
              },
            })

            if (existing) {
              await db.alert.update({ where: { id: existing.id }, data: { isEmailSent: true } })
            } else {
              await db.alert.create({
                data: {
                  userId: user.id,
                  type: 'PERMIT_EXPIRY',
                  title: alertKey,
                  message: `${permit.type} expires in ${days} days`,
                  dueDate: permit.expiry,
                  isEmailSent: true,
                  isRead: false,
                },
              })
            }

            results.permitEmails++
          }
        } catch (err) {
          console.error(`[notifications] Permit email error for ${user.email}:`, err)
          results.errors++
        }
      }
    }
  }

  // ── Task deadline reminders (tasks due within 24 hours) ───────────────────
  const tomorrow = new Date(now)
  tomorrow.setDate(now.getDate() + 1)

  const overdueTasks = await db.task.findMany({
    where: {
      dueDate: { gte: now, lte: tomorrow },
      status: { notIn: ['COMPLETED', 'SKIPPED'] },
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          preferredLanguage: true,
          alerts: { where: { type: 'TASK_DEADLINE', isEmailSent: false } },
        },
      },
    },
  })

  for (const task of overdueTasks) {
    const user = task.user
    const alertKey = `TASK_${task.id}`
    const alreadySent = user.alerts.some((a) => a.title?.includes(alertKey))
    if (alreadySent) continue

    try {
      const lang = user.preferredLanguage || 'fr'
      const dueLabel = task.dueDate!.toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA')
      const sent = await sendEmail({
        to: user.email,
        subject:
          lang === 'fr'
            ? `📋 Tâche à compléter: ${task.title}`
            : `📋 Task due: ${task.titleEn || task.title}`,
        html: taskDeadlineEmailHtml(
          user.name || '',
          lang === 'fr' ? task.title : (task.titleEn || task.title),
          dueLabel,
          lang,
        ),
      })

      if (sent) {
        await db.alert.create({
          data: {
            userId: user.id,
            type: 'TASK_DEADLINE',
            title: alertKey,
            message: `Task "${task.title}" is due within 24 hours`,
            dueDate: task.dueDate!,
            isEmailSent: true,
            isRead: false,
          },
        })
        results.taskEmails++
      }
    } catch (err) {
      console.error(`[notifications] Task email error for ${user.email}:`, err)
      results.errors++
    }
  }

  return NextResponse.json({ ok: true, ...results })
}
