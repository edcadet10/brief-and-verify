import { expect, test } from '@playwright/test'
import axe from 'axe-core'
import { diagnosticQuestions } from '../src/data/diagnostic'
import { scenarios } from '../src/data/scenarios'

const criticalRoutes = [
  '',
  '#/check-in',
  '#/home',
  '#/path',
  '#/lesson/patterns-not-proof',
  '#/practice',
  '#/practice/everyday-plan-comparison',
  '#/library',
  '#/resource/one-pager-brief-canvas',
  '#/studio',
  '#/impact',
  '#/about',
]

const plainLanguageRoutes = criticalRoutes

const specialistTerms = [
  'adapter',
  'analytics',
  'API',
  'artifact',
  'calibration',
  'comprehension',
  'consequential',
  'deterministic',
  'inference',
  'JSON',
  'Markdown',
  'model-neutral',
  'provider',
  'runtime',
  'schema',
  'simulation',
  'static',
  'WCAG',
]

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear())
})

test('a learner can finish onboarding and receive a role-shaped path', async ({ page }) => {
  const browserErrors: string[] = []
  page.on('pageerror', (error) => browserErrors.push(error.message))

  await page.goto('./')
  await expect(page).toHaveTitle(/Brief & Verify/)
  await page.getByRole('link', { name: 'Start free' }).click()
  await page.getByText('Education', { exact: true }).click()
  await page.getByText('Occasional', { exact: true }).click()
  await page.getByRole('button', { name: /Start the check-in/ }).click()

  for (const [index, question] of diagnosticQuestions.entries()) {
    const strongest = [...question.options].sort((a, b) => b.score - a.score)[0]
    await page.getByText(strongest.label, { exact: true }).click()
    await page.getByText('Very sure', { exact: true }).click()
    await page
      .getByRole('button', {
        name: index === diagnosticQuestions.length - 1 ? /See my path/ : /Next question/,
      })
      .click()
  }

  await expect(page.getByRole('heading', { name: /judgment to build on/i })).toBeVisible()
  await page.getByRole('button', { name: /Open my path/ }).click()
  await expect(page).toHaveURL(/#\/home$/)
  await expect(page.getByText('EDUCATION PATH')).toBeVisible()

  const savedRole = await page.evaluate(() => {
    const value = window.localStorage.getItem('brief-and-verify:learner:v1')
    return value ? JSON.parse(value).role as string : null
  })
  expect(savedRole).toBe('education')
  expect(browserErrors).toEqual([])
})

test('the deterministic scenario reaches the authored 100-point debrief', async ({ page }) => {
  const scenario = scenarios[0]
  await page.goto(`./#/practice/${scenario.id}`)

  for (const [index, stage] of scenario.stages.entries()) {
    const strongest = stage.choices.find((choice) => choice.score === 2)
    expect(strongest).toBeTruthy()
    if (!strongest) continue

    await page.getByText(strongest.label, { exact: true }).click()
    await page.getByRole('button', { name: /See the consequence/ }).click()
    await expect(page.getByRole('status')).toContainText(strongest.feedback)
    await page
      .getByRole('button', {
        name: index === scenario.stages.length - 1 ? /See debrief/ : /Continue/,
      })
      .click()
  }

  await expect(page.getByRole('heading', { name: /decisions held up/i })).toBeVisible()
  await expect(page.locator('.scenario-result-card__score')).toHaveText('100/100')
  await expect
    .poll(() => page.evaluate(() => {
      const value = window.localStorage.getItem('brief-and-verify:learner:v1')
      return value ? JSON.parse(value).scenarioAttempts.length as number : 0
    }))
    .toBe(1)
})

test('critical routes render one main landmark without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })

  for (const route of criticalRoutes) {
    await page.goto(`./${route}`)
    await expect(page.locator('main')).toHaveCount(1)
    await expect(page.locator('main')).toBeVisible()
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    )
    expect(hasOverflow, `horizontal overflow at ${route || 'landing'}`).toBe(false)
  }
})

test('critical screens pass a real-browser axe audit', async ({ page }) => {
  for (const route of criticalRoutes) {
    await page.goto(`./${route}`)
    await page.addScriptTag({ content: axe.source })
    const violations = await page.evaluate(async () => {
      const axeApi = (window as unknown as {
        axe: {
          run: () => Promise<{
            violations: Array<{
              id: string
              impact: string | null
              nodes: Array<{ target: string[] }>
            }>
          }>
        }
      }).axe
      const results = await axeApi.run()
      return results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        targets: violation.nodes.map((node) => node.target),
      }))
    })

    expect(violations, `axe violations at ${route || 'landing'}`).toEqual([])
  }
})

test('core learner screens meet the plain-language guardrails', async ({ page }) => {
  for (const route of plainLanguageRoutes) {
    await page.goto(`./${route}`)
    const results = await page.locator('main').evaluate((main, terms) => {
      const blocks = [...main.querySelectorAll('h1, h2, h3, p, li, dd, dt, label, button, small, blockquote')]
        .filter((element) => element.checkVisibility())
        .map((element) => (element.textContent ?? '').replace(/\s+/g, ' ').trim())
        .filter(Boolean)
      const longSentences = blocks.flatMap((block) =>
        (block.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [])
          .map((sentence) => ({
            text: sentence.trim(),
            words: sentence.match(/[\p{L}\p{N}][\p{L}\p{N}’'&/-]*/gu)?.length ?? 0,
          }))
          .filter((sentence) => sentence.words > 25),
      )
      const pageText = (main.textContent ?? '').replace(/\s+/g, ' ').trim()
      const unexplainedTerms = terms.filter((term) => {
        if (!new RegExp(`\\b${term.replace('-', '\\-')}\\b`, 'i').test(pageText)) return false
        return !(term === 'WCAG' && /Web Content Accessibility Guidelines\s*\(WCAG\)/i.test(pageText))
      })

      return { longSentences, unexplainedTerms }
    }, specialistTerms)

    expect(results.longSentences, `long sentences at ${route || 'landing'}`).toEqual([])
    expect(results.unexplainedTerms, `unexplained terms at ${route || 'landing'}`).toEqual([])
  }
})
