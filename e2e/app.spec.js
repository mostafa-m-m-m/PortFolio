import { expect, test } from '@playwright/test'

const SECTIONS = ['work', 'experience', 'about', 'skills', 'contact']

test.describe('page content', () => {
  test('shows the hero, a title and social metadata', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('I build production web apps with React and Next.js.')
    await expect(page).toHaveTitle('Mostafa Mahmoud | Front-End Developer')
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/og\.png$/)
    const jsonLd = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())
    expect(jsonLd).toMatchObject({ '@type': 'Person', name: 'Mostafa Mahmoud', jobTitle: 'Front-End Developer' })
  })

  test('has every section with one heading each', async ({ page }) => {
    await page.goto('/')
    for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toBeVisible()
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(['Projects', 'Experience', 'About', 'Skills', 'Contact'])
  })

  test('lists the four projects in order, each with a screenshot and tests highlighted', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#work article h3')).toHaveText(['Ember Roastery', 'Masar Car Rental', 'Forma Fitness', 'Spotify Web Player'])
    await expect(page.locator('#work').getByText('Featured')).toHaveCount(1)
    for (const name of ['Ember Roastery', 'Masar Car Rental', 'Forma Fitness', 'Spotify Web Player']) {
      await expect(page.getByRole('img', { name: `Screenshot of ${name}` })).toHaveAttribute('width', '1200')
    }
  })

  test('source links point to GitHub and open safely in a new tab', async ({ page }) => {
    await page.goto('/')
    const links = page.getByRole('link', { name: /^Source code:/ })
    await expect(links).toHaveCount(4)
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('href', /^https:\/\/github\.com\/mostafa-m-m-m\//)
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', /noreferrer/)
    }
  })

  test('every project has a Live demo button that points to its deployment', async ({ page }) => {
    await page.goto('/')
    const live = page.getByRole('link', { name: /^Live demo:/ })
    await expect(live).toHaveCount(4)
    const hrefs = await live.evaluateAll((els) => els.map((e) => e.href))
    expect(hrefs).toEqual([
      'https://coffee-ten-khaki.vercel.app/',
      'https://masar-car-rental.vercel.app/',
      'https://forma-fitness-six.vercel.app/',
      'https://spotify-web-player-jet.vercel.app/',
    ])
  })

  test('the CV button downloads a real one-page PDF', async ({ page, request }) => {
    await page.goto('/')
    const cv = page.getByRole('link', { name: 'Download CV' })
    await expect(cv).toHaveAttribute('href', '/Mostafa-Mahmoud-CV.pdf')
    await expect(cv).toHaveAttribute('download', '')
    const res = await request.get('/Mostafa-Mahmoud-CV.pdf')
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toContain('application/pdf')
    const body = (await res.body()).toString('latin1')
    expect(body.startsWith('%PDF')).toBe(true)
    expect((body.match(/\/Type\s*\/Page[^s]/g) || []).length).toBe(1)
  })

  test('shows the two jobs in the experience timeline, with the company link', async ({ page }) => {
    await page.goto('/')
    const exp = page.locator('#experience')
    await expect(exp.getByRole('heading', { name: 'Front-End Developer', exact: true })).toBeVisible()
    const company = exp.getByRole('link', { name: 'Vconnct' })
    await expect(company).toHaveAttribute('href', 'https://www.vconnct.me/en/home')
    await expect(company).toHaveAttribute('rel', /noreferrer/)
    await expect(exp.getByText('Oct 2024 – Sep 2026')).toBeVisible()
    await expect(exp.getByRole('heading', { name: 'Junior Front-End Developer' })).toBeVisible()
    await expect(exp.getByText('Nasr City, Cairo · Feb 2023 – Mar 2024')).toBeVisible()
    await expect(exp.getByText(/One of the main developers on all three/)).toBeVisible()
  })

  test('contact links are real mailto, tel, LinkedIn and GitHub links', async ({ page }) => {
    await page.goto('/')
    const contact = page.locator('#contact')
    await expect(contact.getByRole('link', { name: /Email/ })).toHaveAttribute('href', 'mailto:mostafa.mahmoud.mohamed00@gmail.com')
    await expect(contact.getByRole('link', { name: /Phone/ })).toHaveAttribute('href', 'tel:+201125121424')
    await expect(contact.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', /linkedin\.com\/in\//)
    await expect(contact.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/mostafa-m-m-m')
    await expect(contact.getByRole('link', { name: 'Send me an email' })).toHaveAttribute('href', /^mailto:/)
  })

  test('every external link uses rel noreferrer', async ({ page }) => {
    await page.goto('/')
    const bad = await page.locator('a[target="_blank"]').evaluateAll((els) => els.filter((e) => !/noreferrer/.test(e.rel)).map((e) => e.href))
    expect(bad).toEqual([])
  })

  test('images have text alternatives and dimensions', async ({ page }) => {
    await page.goto('/')
    // decorative images (inside aria-hidden links) intentionally have an empty alt
    const bad = await page.locator('main img').evaluateAll((imgs) =>
      imgs.filter((i) => !i.getAttribute('width') || !i.getAttribute('height') || (!i.alt && !i.closest('[aria-hidden="true"]'))).length,
    )
    expect(bad).toBe(0)
  })
})

test.describe('navigation', () => {
  test('nav links jump to their sections and mark the current one', async ({ page, isMobile }) => {
    test.skip(isMobile, 'covered by the mobile menu test')
    await page.goto('/')
    for (const [label, id] of [['Projects', 'work'], ['Experience', 'experience'], ['About', 'about'], ['Skills', 'skills'], ['Contact', 'contact']]) {
      await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: label }).click()
      await expect(page).toHaveURL(new RegExp(`#${id}$`))
      await expect(page.locator(`#${id}`)).toBeInViewport()
      await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: label })).toHaveAttribute('aria-current', 'true')
    }
  })

  test('the hero buttons go to Work and Contact', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'See my work' }).click()
    await expect(page).toHaveURL(/#work$/)
    await page.goto('/')
    await page.getByRole('link', { name: 'Contact me' }).click()
    await expect(page).toHaveURL(/#contact$/)
  })

  test('mobile menu opens, navigates, closes and responds to Escape', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'only the phone layout has a menu button')
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Open menu' })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(page.getByRole('link', { name: 'Skills' })).toBeHidden()
    await toggle.click()
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible()
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('link', { name: 'Projects', exact: true }).click()
    await expect(page).toHaveURL(/#work$/)
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  test('the skip link is the first focusable element and jumps to the content', async ({ page, isMobile, browserName }) => {
    test.skip(isMobile || browserName === 'webkit', 'Safari does not Tab to links by default')
    await page.goto('/')
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#main$/)
  })
})

test.describe('settings', () => {
  test('Arabic switches to RTL, translates the page and is remembered', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /^Language/ }).click()
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('أبني تطبيقات ويب للإنتاج بـ React وNext.js.')
    await expect(page.locator('#work article h3').first()).toHaveText('إمبر روستري')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  })

  test('theme toggles and is remembered', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await page.getByRole('button', { name: /^Theme/ }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })

  test('corrupted storage falls back to the defaults', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('mm.lang', '{bad')
      localStorage.setItem('mm.theme', '{bad')
    })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})

test.describe('layout', () => {
  test('no horizontal scroll in English or Arabic', async ({ page }) => {
    for (const lang of ['en', 'ar']) {
      await page.addInitScript((l) => localStorage.setItem('mm.lang', JSON.stringify(l)), lang)
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow, lang).toBeLessThanOrEqual(1)
    }
  })

  test('works without JavaScript animations: all sections are visible with reduced motion', async ({ page }) => {
    await page.goto('/')
    const hidden = await page.locator('.reveal').evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length)
    expect(hidden).toBe(0)
  })
})
