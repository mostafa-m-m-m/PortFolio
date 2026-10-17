import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from './i18n/en'
import ar from './i18n/ar'

const dictionaries = { en, ar }
const SettingsContext = createContext(null)

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage unavailable: keep working with in-memory state
  }
}

export function SettingsProvider({ children }) {
  const [lang, setLang] = useState(() => load('mm.lang', navigator.language?.startsWith('ar') ? 'ar' : 'en'))
  const [theme, setTheme] = useState(() => load('mm.theme', 'light'))

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
    root.dataset.theme = theme
    save('mm.lang', lang)
    save('mm.theme', theme)
  }, [lang, theme])

  const t = useCallback(
    (key, vars) => {
      const text = dictionaries[lang][key] ?? dictionaries.en[key] ?? key
      return vars ? text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '') : text
    },
    [lang],
  )
  const tr = useCallback((value) => (value ? value[lang] ?? value.en : ''), [lang])

  const value = useMemo(() => ({ lang, setLang, theme, setTheme, t, tr }), [lang, theme, t, tr])
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider')
  return ctx
}
