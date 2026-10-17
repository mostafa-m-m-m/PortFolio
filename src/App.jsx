import { SettingsProvider, useSettings } from './SettingsContext'
import Header from './components/Header'
import { About, Contact, Experience, Footer, Hero, Skills, Work } from './components/Sections'

function Page() {
  const { t } = useSettings()
  return (
    <>
      <a
        href="#main"
        className="fixed start-4 -top-16 z-50 rounded-lg bg-accent px-4 py-2 font-bold text-on-accent focus:top-4"
      >
        {t('skip')}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <SettingsProvider>
      <Page />
    </SettingsProvider>
  )
}
