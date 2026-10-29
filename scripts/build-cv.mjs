// Renders cv/cv.html to public/Mostafa-Mahmoud-CV.pdf. Run with: npm run cv
//
// If a photo exists at cv/photo.jpg (or .jpeg, .png, .webp), it also renders a second
// version with the photo in the header to cv/out/Mostafa-Mahmoud-CV-photo.pdf.
// The photo and that PDF are git-ignored, so they never end up in the repo or on the site.
import { chromium } from '@playwright/test'
import { pathToFileURL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const cvHtml = pathToFileURL(path.join(root, 'cv', 'cv.html')).href
const pdfOptions = { format: 'A4', printBackground: true, preferCSSPageSize: true }

const browser = await chromium.launch()

async function render(out, photo) {
  const page = await browser.newPage()
  await page.goto(cvHtml)
  if (photo) {
    await page.evaluate((src) => {
      const img = document.createElement('img')
      img.src = src
      img.alt = ''
      img.className = 'photo'
      const head = document.createElement('header')
      head.className = 'with-photo'
      const text = document.createElement('div')
      for (const el of [...document.body.children].slice(0, 3)) text.append(el)
      head.append(text, img)
      document.body.prepend(head)
      const style = document.createElement('style')
      style.textContent = `
        .with-photo { display: flex; justify-content: space-between; align-items: center; gap: 6mm; }
        .with-photo > div { min-width: 0; }
        .photo { width: 27mm; height: 27mm; border-radius: 50%; object-fit: cover; flex: none; border: 0.5mm solid #cfd5ea; }`
      document.head.append(style)
    }, pathToFileURL(photo).href)
    await page.waitForFunction(() => document.querySelector('.photo').complete)
  }
  await page.evaluate(() => document.fonts.ready)
  await page.pdf({ path: out, ...pdfOptions })
  await page.close()
  console.log('wrote', out)
}

await render(path.join(root, 'public', 'Mostafa-Mahmoud-CV.pdf'))

const photo = ['jpg', 'jpeg', 'png', 'webp']
  .map((ext) => path.join(root, 'cv', `photo.${ext}`))
  .find((p) => fs.existsSync(p))
if (photo) {
  fs.mkdirSync(path.join(root, 'cv', 'out'), { recursive: true })
  await render(path.join(root, 'cv', 'out', 'Mostafa-Mahmoud-CV-photo.pdf'), photo)
} else {
  console.log('no cv/photo.jpg found, skipped the photo version')
}

await browser.close()
