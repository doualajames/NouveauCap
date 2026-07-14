// Peuple la table TaskTemplate depuis le corpus versionné (src/lib/onboarding-templates).
// Idempotent : ne fait rien si la table contient déjà des templates actifs
// (pour ne pas écraser les modifications faites via l'admin).
// Forcer un re-seed complet : node --experimental-strip-types prisma/seed-templates.ts --force
import { PrismaClient } from '@prisma/client'
import { taskTemplates, provinceSpecificTasks } from '../src/lib/onboarding-templates.ts'

const prisma = new PrismaClient()

async function main() {
  const force = process.argv.includes('--force')
  const existing = await prisma.taskTemplate.count()
  if (existing > 0 && !force) {
    console.log(`TaskTemplate contient déjà ${existing} lignes — seed ignoré (utilisez --force pour réécraser).`)
    return
  }
  if (force) {
    await prisma.taskTemplate.deleteMany({})
  }

  const rows: any[] = []
  for (const [status, tasks] of Object.entries(taskTemplates)) {
    for (const t of tasks as any[]) {
      rows.push({ status, province: null, ...pick(t) })
    }
  }
  for (const [province, byStatus] of Object.entries(provinceSpecificTasks)) {
    for (const [status, tasks] of Object.entries(byStatus)) {
      for (const t of tasks as any[]) {
        rows.push({ status, province, ...pick(t) })
      }
    }
  }

  await prisma.taskTemplate.createMany({ data: rows })
  console.log(`Seed terminé : ${rows.length} templates insérés.`)
}

function pick(t: any) {
  return {
    title: t.title,
    titleEn: t.titleEn,
    description: t.description ?? null,
    descriptionEn: t.descriptionEn ?? null,
    category: t.category,
    priority: t.priority,
    isRequired: !!t.isRequired,
    order: t.order ?? 0,
    source: t.source ?? null,
  }
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
