import Hero from './components/Hero'
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
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SectionNav />
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
      <Footer />
    </div>
  )
}

export default App
