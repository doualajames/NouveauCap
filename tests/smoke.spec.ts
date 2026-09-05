import { test, expect } from '@playwright/test'

// Filet de sécurité : les parcours qui, cassés, bloquent l'acquisition ou l'usage.
// Couvre exactement la classe de bugs de la refonte auth/onboarding.

test('landing publique se charge (SSR, hero serif)', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/nouveau départ|Immigrer/i)
})

test('page guide SEO rend + JSON-LD FAQ présent', async ({ page }) => {
  await page.goto('/guides/numero-assurance-sociale-nas')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/NAS|assurance sociale/i)
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(ld.some(s => s.includes('FAQPage'))).toBeTruthy()
})

test('capture de lead publique fonctionne', async ({ request }) => {
  const res = await request.post('/api/leads', {
    data: { email: `smoke-${Date.now()}@example.com`, source: 'landing' },
  })
  expect(res.status()).toBe(200)
})

test('routes IA protégées (401 sans session)', async ({ request }) => {
  const res = await request.post('/api/onboarding', {
    data: { onboardingData: { immigrationStatus: 'PERMANENT_RESIDENT', province: 'QC' } },
  })
  expect(res.status()).toBe(401)
})

test('parcours critique : inscription → onboarding → dashboard', async ({ page }) => {
  const email = `smoke-${Date.now()}@example.com`

  await page.goto('/app')
  await page.getByRole('button', { name: /Créer un compte/i }).first().click()

  await page.getByPlaceholder('Jean Dupont').fill('Smoke Test')
  await page.getByPlaceholder('jean@exemple.com').fill(email)
  await page.locator('input[type=password]').fill('Test12345!')
  await page.getByRole('button', { name: "S'inscrire" }).click()

  // Étape 1 : statut
  await expect(page.getByText(/statut d'immigration/i)).toBeVisible()
  await page.getByText('Résident Permanent').click()
  await page.getByRole('button', { name: /Suivant/i }).click()

  // Étape 2 : province
  await page.getByRole('button', { name: 'Québec' }).click()
  await page.getByRole('button', { name: /Suivant/i }).click()

  // Étapes 3-5 : date (skip), secteur, langue (défaut) — avancer
  await page.getByRole('button', { name: /Suivant/i }).click() // date
  await page.getByRole('button', { name: 'Technologie / TI' }).click()
  await page.getByRole('button', { name: /Suivant/i }).click() // secteur
  await page.getByRole('button', { name: /Suivant/i }).click() // langue

  // Étape 6 : situation familiale → terminer
  await page.getByText('En couple').click()
  await page.getByRole('button', { name: /Commencer à explorer/i }).click()

  // Le dashboard doit s'afficher (et NON revenir à l'accueil)
  await expect(page.getByRole('heading', { name: /Bienvenue/i })).toBeVisible()
})
