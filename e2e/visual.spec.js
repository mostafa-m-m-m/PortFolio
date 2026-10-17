import { expect, test } from '@playwright/test'

// Visual regression (Chromium). Baselines are per platform, so CI skips these.
// Create or refresh with: npx playwright test visual --update-snapshots
test.describe('@visual', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'one engine is enough for pixel diffs')

  for (const [name, lang, theme] of [['light-en', 'en', 'light'], ['dark-en', 'en', 'dark'], ['light-ar', 'ar', 'light']]) {
    test(`${name} page`, async ({ page }) => {
      await page.addInitScript(([l, t]) => {
        localStorage.setItem('mm.lang', JSON.stringify(l))
        localStorage.setItem('mm.theme', JSON.stringify(t))
      }, [lang, theme])
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      await page.evaluate(async () => {
        const imgs = [...document.images]
        imgs.forEach((i) => { i.loading = 'eager' })
        await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r }))))
      })
      await expect(page).toHaveScreenshot(`${name}.png`, { animations: 'disabled', fullPage: true })
    })
  }
})
