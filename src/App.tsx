import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, ArrowRight } from 'lucide-react';
import { QUESTIONS } from './constants/questions';
import { Choice, DiagnosisResult } from './types';
import { getDiagnosis } from './services/localDiagnosis';
import Card from './components/Card';
import Diagnosis from './components/Diagnosis';

type AppState = 'start' | 'playing' | 'result';

export default function App() {
  const [state, setState] = useState<AppState>('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; choice: string; score: number; source: string }[]>([]);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleSelect = (choice: Choice) => {
    const newAnswers = [
      ...answers,
      {
        question: QUESTIONS[currentIdx].text,
        choice: choice.text,
        score: choice.score,
        source: QUESTIONS[currentIdx].source,
      },
    ];
    setAnswers(newAnswers);

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      const diagnosis = getDiagnosis(newAnswers);
      setResult(diagnosis);
      setState('result');
    }
  };

  const reset = () => {
    setState('start');
    setCurrentIdx(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-32 pb-32 px-6 relative">
      <div className="atmosphere" />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-8 left-0 right-0 flex justify-center items-center gap-3 z-50"
      >
        <div className="p-2 rounded-xl bg-ember-accent/20 border border-ember-accent/30">
          <Flame className="w-6 h-6 text-ember-accent" />
        </div>
        <h1 className="font-serif text-2xl tracking-tight">Ember</h1>
      </motion.header>

      <main className="w-full max-w-4xl relative z-10">
        <AnimatePresence mode="wait">
          {state === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 rounded-3xl overflow-hidden border border-white/10 shadow-2xl card-shadow"
                >
                  <img src="/card.png" alt="Ember Card" className="w-full h-full object-cover pixelated" />
                </motion.div>
                <h2 className="text-6xl md:text-8xl font-serif leading-none">
                  Assess your <br />
                  <span className="italic text-ember-accent">well-being.</span>
                </h2>
                <p className="text-xl opacity-60 max-w-lg mx-auto font-light leading-relaxed">
                  Burnout isn't just exhaustion; it's a loss of spark.
                  Let's evaluate your current workload and identify sources of stress.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setState('playing')}
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-ember-bg rounded-full font-bold overflow-hidden"
              >
                <div className="absolute inset-0 bg-ember-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Begin Assessment</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:text-white transition-colors duration-300" />
              </motion.button>
            </motion.div>
          )}

          {state === 'playing' && (
            <div key={QUESTIONS[currentIdx].id}>
              <Card
                question={QUESTIONS[currentIdx]}
                onSelect={handleSelect}
                index={currentIdx}
                total={QUESTIONS.length}
              />
            </div>
          )}

          {state === 'result' && result && (
            <Diagnosis result={result} onReset={reset} />
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-8 opacity-20 text-[10px] tracking-[0.3em] uppercase font-bold">
        A journey of self-discovery
      </footer>
    </div>
  );
}
