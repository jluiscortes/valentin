import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import FloatingHearts from './components/FloatingHearts'
import Hero from './components/Hero'
import QuestionCard from './components/QuestionCard'
import Celebration from './components/Celebration'

type Stage = 'hero' | 'question' | 'celebration'

function App() {
  const [stage, setStage] = useState<Stage>('hero')

  return (
    <div className="relative w-full bg-gradient-to-b from-rose-50 via-white to-rose-100" style={{ minHeight: '100dvh' }}>
      <FloatingHearts />
      <AnimatePresence mode="wait">
        {stage === 'hero' && (
          <Hero key="hero" onContinue={() => setStage('question')} />
        )}
        {stage === 'question' && (
          <QuestionCard key="question" onYes={() => setStage('celebration')} />
        )}
        {stage === 'celebration' && (
          <Celebration key="celebration" />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
