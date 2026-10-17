import { useEffect, useState } from 'react'
import { LuLanguages, LuMenu, LuMoon, LuSun, LuX } from 'react-icons/lu'
import { useSettings } from '../SettingsContext'
import { useActiveSection } from '../hooks/useActiveSection'

const SECTIONS = ['about', 'skills', 'work', 'experience', 'contact']

export default function Header() {
  const { t, lang, setLang, theme, setTheme } = useSettings()
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTIONS)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const iconBtn =
    'grid size-10 place-items-center rounded-full text-lg text-fg transition-colors hover:bg-surface-2'

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-accent text-sm text-on-accent" aria-hidden="true">
            MM
          </span>
          <span>{lang === 'ar' ? 'مصطفى محمود' : 'Mostafa Mahmoud'}</span>
        </a>

        <nav
          id="site-nav"
          aria-label={t('nav.label')}
          className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-16 flex-col border-b border-border bg-bg px-5 py-3 shadow-card md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 text-sm font-semibold transition-colors hover:text-accent-strong md:py-1 ${
                active === id ? 'text-accent-strong underline decoration-2 underline-offset-8' : 'text-muted'
              }`}
            >
              {t(`nav.${id}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className={iconBtn}
            aria-label={`${t('theme.toggle')}: ${theme === 'dark' ? t('theme.dark') : t('theme.light')}`}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <LuMoon aria-hidden="true" /> : <LuSun aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="flex h-10 items-center gap-1.5 rounded-full border border-border px-3 text-sm font-bold transition-colors hover:bg-surface-2"
            aria-label={`${t('lang.toggle')}: ${lang === 'ar' ? 'English' : 'العربية'}`}
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          >
            <LuLanguages aria-hidden="true" />
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>
          <button
            type="button"
            className={`${iconBtn} md:hidden`}
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? t('nav.close') : t('nav.open')}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  )
}
