import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import WorldHero from './components/WorldHero'
import SectionNav from './components/SectionNav'
import HistoricalLines from './components/HistoricalLines'
import CycleStory from './components/CycleStory'
import ScoreBarChart from './components/ScoreBarChart'
import RegionalGap from './components/RegionalGap'
import AiDebate from './components/AiDebate'
import ComputationalSection, { TalentSection } from './components/TalentAndComputational'
import GenderGaps from './components/GenderGaps'
import EquityContext from './components/EquityContext'
import WellbeingParadox from './components/WellbeingParadox'
import WorldTrends from './components/WorldTrends'
import Footer from './components/Footer'

type View = 'spain' | 'world'

function App() {
  const [view, setView] = useState<View>('spain')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SectionNav view={view} onViewChange={setView} />

      {/* Selector de vista */}
      <div className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-1 px-4 py-2.5 sm:gap-2 sm:px-6">
          {(
            [
              { id: 'spain' as View, label: '🇪🇸 España', hint: 'El caso español en detalle' },
              { id: 'world' as View, label: '🌍 Mundo', hint: 'Tendencias globales 2015–2025' },
            ]
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              title={t.hint}
              aria-pressed={view === t.id}
              className={`relative rounded-lg px-5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:px-8 ${
                view === t.id ? 'bg-slate-800 text-slate-50' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              {view === t.id && (
                <motion.span
                  layoutId="view-tab-pill"
                  className="absolute inset-0 rounded-lg border border-slate-700"
                  style={{ boxShadow: 'inset 0 -2px 0 #22d3ee' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {view === 'spain' ? (
            <main>
              <Hero />
              <HistoricalLines />
              <CycleStory />
              <ScoreBarChart />
              <RegionalGap />
              <AiDebate />
              <ComputationalSection />
              <TalentSection />
              <GenderGaps />
              <EquityContext />
              <WellbeingParadox />
            </main>
          ) : (
            <main>
              <WorldHero />
              <WorldTrends />
            </main>
          )}
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
