// Renders cv/cv.html to public/Mostafa-Mahmoud-CV.pdf. Run with: npm run cv
import { chromium } from '@playwright/test'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(pathToFileURL(path.join(root, 'cv', 'cv.html')).href)
await page.evaluate(() => document.fonts.ready)
const out = path.join(root, 'public', 'Mostafa-Mahmoud-CV.pdf')
await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true })
await browser.close()
console.log('wrote', out)
