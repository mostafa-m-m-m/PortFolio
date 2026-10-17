import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

async function scan(page) {
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(300)
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  return results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s), e.g. ${v.nodes[0].html.slice(0, 110)} ${JSON.stringify(v.nodes[0].any[0]?.data ?? {}).slice(0, 160)}`)
}

for (const [lang, theme] of [['en', 'light'], ['en', 'dark'], ['ar', 'light'], ['ar', 'dark']]) {
  test(`the page has no accessibility violations (${lang}, ${theme})`, async ({ page }) => {
    await page.addInitScript(([l, t]) => {
      localStorage.setItem('mm.lang', JSON.stringify(l))
      localStorage.setItem('mm.theme', JSON.stringify(t))
    }, [lang, theme])
    await page.goto('/')
    expect(await scan(page)).toEqual([])
  })
}

test('the open mobile menu has no accessibility violations', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'only the phone layout has a menu button')
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  expect(await scan(page)).toEqual([])
})

test('every interactive element is reachable with the keyboard and shows focus', async ({ page, isMobile, browserName }) => {
  test.skip(isMobile || browserName === 'webkit', 'keyboard navigation check is for desktop Chromium and Firefox')
  await page.goto('/')
  const labels = new Set()
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab')
    const info = await page.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return null
      const style = getComputedStyle(el)
      return { name: el.getAttribute('aria-label') || el.textContent.trim().slice(0, 40), outline: style.outlineStyle !== 'none' || style.boxShadow !== 'none' }
    })
    if (info) {
      expect(info.outline, `no focus ring on "${info.name}"`).toBe(true)
      labels.add(info.name)
    }
  }
  expect(labels.size).toBeGreaterThan(15)
})
