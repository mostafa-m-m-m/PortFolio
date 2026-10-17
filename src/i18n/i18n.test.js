import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import en from './en'
import ar from './ar'
import { projects } from '../data/projects'
import { profile, skills } from '../data/profile'

const placeholders = (s) => (s.match(/\{\w+\}/g) || []).sort().join(',')

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) return name === 'assets' ? [] : sourceFiles(full)
    return /\.jsx?$/.test(name) && !name.endsWith('.test.js') ? [full] : []
  })
}

describe('translations', () => {
  it('has the same keys in English and Arabic', () => {
    expect(Object.keys(ar).sort()).toEqual(Object.keys(en).sort())
  })

  it('uses the same placeholders in both languages', () => {
    for (const key of Object.keys(en)) expect(placeholders(ar[key]), key).toBe(placeholders(en[key]))
  })

  it('has no empty strings and every Arabic string contains Arabic letters', () => {
    for (const [key, value] of Object.entries(ar)) {
      expect(value.trim(), key).not.toBe('')
      expect(/[؀-ۿ]/.test(value), key).toBe(true)
    }
  })

  it('defines every key the source asks for, and has no unused keys', () => {
    const root = path.resolve(__dirname, '..')
    const text = sourceFiles(root).map((f) => readFileSync(f, 'utf8')).join('\n')
    const used = new Set()
    for (const m of text.matchAll(/\bt\('([\w.]+)'/g)) used.add(m[1])
    for (const m of text.matchAll(/'((?:hero|exp|about|contact|work|footer|nav|skills)\.[\w.]+)'/g)) used.add(m[1])
    for (const id of ['about', 'skills', 'work', 'experience', 'contact']) used.add(`nav.${id}`)
    for (const g of skills) used.add(`skills.${g.id}`)
    for (const key of used) expect(en[key], key).toBeDefined()
    const dynamic = /^(nav|skills)\./
    const unused = Object.keys(en).filter((key) => !dynamic.test(key) && !text.includes(`'${key}'`))
    expect(unused).toEqual([])
  })
})

describe('content', () => {
  const ok = (v) => typeof v?.en === 'string' && v.en.trim() && /[؀-ۿ]/.test(v.ar ?? '')

  it('every project string exists in English and Arabic', () => {
    const bad = []
    for (const p of projects) {
      for (const k of ['title', 'kind', 'summary']) if (!ok(p[k])) bad.push(`${p.id}.${k}`)
      p.highlights.forEach((h, i) => ok(h) || bad.push(`${p.id}.highlight.${i}`))
    }
    expect(bad).toEqual([])
  })

  it('projects have unique ids, an image, a source link and a stack', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length)
    for (const p of projects) {
      expect(p.code, p.id).toMatch(/^https:\/\/github\.com\/[\w-]+\/[\w.-]+$/)
      expect(p.stack.length, p.id).toBeGreaterThan(2)
      if (p.live) expect(p.live, p.id).toMatch(/^https:\/\//)
    }
  })

  it('has valid contact details', () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    expect(profile.phoneTel).toMatch(/^\+201[0125]\d{8}$/)
    expect(profile.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\//)
    expect(profile.github).toMatch(/^https:\/\/github\.com\//)
  })

  it('every project screenshot exists', () => {
    const dir = path.resolve(__dirname, '../assets/projects')
    const files = readdirSync(dir)
    for (const p of projects) expect(files, p.image).toContain(`${p.image}.webp`)
  })
})
