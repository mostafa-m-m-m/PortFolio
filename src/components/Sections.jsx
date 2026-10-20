import { LuArrowUpRight, LuBadgeCheck, LuDownload, LuGithub, LuLanguages, LuLinkedin, LuMail, LuMapPin, LuPhone, LuTestTubes } from 'react-icons/lu'
import { useSettings } from '../SettingsContext'
import { useReveal } from '../hooks/useReveal'
import { profile, skills } from '../data/profile'
import { projects } from '../data/projects'

const images = import.meta.glob('../assets/projects/*.webp', { eager: true, query: '?url', import: 'default' })
const imageFor = (name) => images[`../assets/projects/${name}.webp`]

const btn =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors'
const btnPrimary = `${btn} bg-accent text-on-accent hover:bg-accent-strong`
const btnGhost = `${btn} border border-border text-fg hover:bg-surface-2`

function Section({ id, title, children, className = '' }) {
  const ref = useReveal()
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`mx-auto max-w-6xl px-5 py-16 md:py-24 ${className}`}>
      <div ref={ref} className="reveal">
        <h2 id={`${id}-title`} className="mb-10 text-3xl font-extrabold tracking-tight md:text-4xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

export function Hero() {
  const { t, tr } = useSettings()
  const ref = useReveal()
  const featured = projects.find((p) => p.featured)
  const points = [
    [LuBadgeCheck, 'hero.point.prod'],
    [LuLanguages, 'hero.point.rtl'],
    [LuTestTubes, 'hero.point.tests'],
  ]
  return (
    <section id="top" aria-labelledby="hero-title" className="mx-auto max-w-6xl px-5 pb-12 pt-16 md:pb-20 md:pt-24">
      <div ref={ref} className="reveal grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-accent-strong">{t('hero.eyebrow')}</p>
          <h1 id="hero-title" className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{t('hero.lead')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className={btnPrimary}>{t('hero.cta.work')}</a>
            <a href="#contact" className={btnGhost}>{t('hero.cta.contact')}</a>
            {profile.cvUrl && (
              <a href={profile.cvUrl} download className={btnGhost}>
                <LuDownload aria-hidden="true" /> {t('hero.cta.cv')}
              </a>
            )}
          </div>
          <ul className="mt-12 grid gap-3 sm:grid-cols-3">
            {points.map(([Icon, key]) => (
              <li key={key} className="flex items-start gap-3 text-sm text-muted">
                <Icon aria-hidden="true" className="mt-0.5 shrink-0 text-lg text-accent-strong" />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
        {featured && (
          <a
            href="#work"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden overflow-hidden rounded-3xl border border-border bg-surface shadow-card transition-transform hover:-translate-y-1 lg:block"
          >
            <img
              src={imageFor(featured.image)}
              alt=""
              width="1200"
              height="750"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover object-top"
            />
            <span className="block border-t border-border px-5 py-4 text-sm font-bold">
              {t('work.featured')}: {tr(featured.title)}
            </span>
          </a>
        )}
      </div>
    </section>
  )
}

export function About() {
  const { t } = useSettings()
  return (
    <Section id="about" title={t('about.title')}>
      <div className="max-w-3xl space-y-5 text-lg">
        <p>{t('about.p1')}</p>
        <p className="text-muted">{t('about.p2')}</p>
        <p className="text-muted">{t('about.p3')}</p>
      </div>
    </Section>
  )
}

export function Skills() {
  const { t } = useSettings()
  return (
    <Section id="skills" title={t('skills.title')}>
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.id} className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted">{t(`skills.${group.id}`)}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-sm font-semibold">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

function ProjectCard({ project }) {
  const { t, tr } = useSettings()
  const name = tr(project.title)
  return (
    <article className="grid overflow-hidden rounded-3xl border border-border bg-surface shadow-card md:grid-cols-2">
      <div className="bg-surface-2">
        <img
          src={imageFor(project.image)}
          alt={t('work.preview', { name })}
          width="1200"
          height="750"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-8">
        <div>
          {project.featured && (
            <p className="mb-2 inline-block rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-on-accent">{t('work.featured')}</p>
          )}
          <h3 className="text-2xl font-extrabold tracking-tight">{name}</h3>
          <p className="text-sm font-semibold text-accent-strong">{tr(project.kind)}</p>
        </div>
        <p className="text-muted">{tr(project.summary)}</p>
        <ul className="space-y-2 text-sm">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-2">
              <LuBadgeCheck aria-hidden="true" className="mt-0.5 shrink-0 text-accent-strong" />
              <span>{tr(h)}</span>
            </li>
          ))}
        </ul>
        <div>
          <p className="sr-only">{t('work.stack')}</p>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="rounded-md bg-surface-2 px-2 py-0.5 text-xs font-semibold text-muted">{s}</li>
            ))}
          </ul>
        </div>
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className={btnPrimary} aria-label={t('work.openLive', { name })}>
              {t('work.live')} <LuArrowUpRight aria-hidden="true" />
            </a>
          )}
          <a href={project.code} target="_blank" rel="noreferrer" className={btnGhost} aria-label={t('work.openCode', { name })}>
            <LuGithub aria-hidden="true" /> {t('work.code')}
          </a>
        </div>
      </div>
    </article>
  )
}

export function Work() {
  const { t } = useSettings()
  return (
    <Section id="work" title={t('work.title')}>
      <p className="-mt-6 mb-10 max-w-2xl text-muted">{t('work.intro')}</p>
      <div className="grid gap-8">
        {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </Section>
  )
}

export function Experience() {
  const { t } = useSettings()
  const jobs = [
    {
      role: 'exp.vc.role',
      company: profile.company,
      dates: 'exp.vc.dates',
      bullets: ['exp.vc.b1', 'exp.vc.b2', 'exp.vc.b3', 'exp.vc.b4'],
    },
    { role: 'exp.role', place: 'exp.place', dates: 'exp.dates', bullets: ['exp.b1', 'exp.b2'] },
  ]
  return (
    <Section id="experience" title={t('exp.title')}>
      <ol className="space-y-8 border-s-2 border-border ps-6">
        {jobs.map((job) => (
          <li key={job.role} className="relative">
            <span className="absolute -start-[1.95rem] top-2 size-3 rounded-full bg-accent" aria-hidden="true" />
            <h3 className="text-xl font-bold">{t(job.role)}</h3>
            <p className="text-sm text-muted">
              {job.company ? (
                <a href={job.company.url} target="_blank" rel="noreferrer" className="font-semibold text-accent-strong underline-offset-4 hover:underline">
                  {job.company.name}
                </a>
              ) : (
                t(job.place)
              )}{' '}
              · {t(job.dates)}
            </p>
            <ul className="mt-3 list-disc space-y-1.5 ps-5 text-muted marker:text-accent-strong">
              {job.bullets.map((b) => <li key={b}>{t(b)}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function Contact() {
  const { t } = useSettings()
  const rows = [
    [LuMail, 'contact.email', profile.email, `mailto:${profile.email}`, undefined],
    [LuPhone, 'contact.phone', profile.phone, `tel:${profile.phoneTel}`, 'ltr'],
    [LuLinkedin, 'contact.linkedin', 'mostafa-mahmoud-mohamed', profile.linkedin, 'ltr'],
    [LuGithub, 'contact.github', 'mostafa-m-m-m', profile.github, 'ltr'],
  ]
  return (
    <Section id="contact" title={t('contact.title')}>
      <p className="mb-8 max-w-2xl text-lg text-muted">{t('contact.intro')}</p>
      <ul className="mb-8 grid gap-4 sm:grid-cols-2">
        {rows.map(([Icon, label, value, href, dir]) => (
          <li key={label} className="min-w-0">
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="flex min-w-0 items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-xl text-accent-strong">
                <Icon aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-wider text-muted">{t(label)}</span>
                <span className="block truncate font-semibold" dir={dir}>{value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-4">
        <a href={`mailto:${profile.email}`} className={btnPrimary}>
          <LuMail aria-hidden="true" /> {t('contact.cta')}
        </a>
        <p className="flex items-center gap-2 text-sm text-muted">
          <LuMapPin aria-hidden="true" /> {t('contact.location')}
        </p>
      </div>
    </Section>
  )
}

export function Footer() {
  const { t } = useSettings()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-muted">
        <p>{t('footer.built')}</p>
        <a href="#top" className="font-semibold text-fg hover:text-accent-strong">{t('footer.top')}</a>
      </div>
    </footer>
  )
}
