import { motion } from 'motion/react';
import { DiagnosisResult } from '../types';
import { RefreshCw, Sparkles, AlertCircle, Heart, Flame, ShieldCheck } from 'lucide-react';

interface DiagnosisProps {
  result: DiagnosisResult;
  onReset: () => void;
}

export default function Diagnosis({ result, onReset }: DiagnosisProps) {
  const getIcon = () => {
    switch (result.level) {
      case 'Burned': return <AlertCircle className="w-8 h-8 text-red-500" />;
      case 'Burning': return <Flame className="w-8 h-8 text-orange-400" />;
      case 'Fine': return <Sparkles className="w-8 h-8 text-amber-400" />;
      case 'Alright': return <Heart className="w-8 h-8 text-emerald-400" />;
      case 'Healthy': return <ShieldCheck className="w-8 h-8 text-blue-400" />;
      default: return <Heart className="w-8 h-8 text-emerald-400" />;
    }
  };

  const levels = ['Healthy', 'Alright', 'Fine', 'Burning', 'Burned'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="glass p-8 md:p-12 text-center space-y-12">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="p-4 rounded-full bg-white/5 mb-4"
          >
            {getIcon()}
          </motion.div>
          <h2 className="font-serif text-4xl md:text-5xl">{result.level}</h2>
          
          {/* Card of 5 Visual Indicator */}
          <div className="w-full max-w-md mx-auto my-6 p-6 rounded-3xl bg-white/5 border border-white/10">
            <div className="flex justify-between items-end mb-2">
              {levels.map((level, idx) => {
                const isActive = result.level === level;
                const isPast = levels.indexOf(result.level) >= idx;
                return (
                  <div key={level} className="flex flex-col items-center gap-2 flex-1">
                    <div 
                      className={`w-full h-2 rounded-full transition-all duration-500 ${
                        isActive ? 'bg-ember-accent scale-y-150' : 
                        isPast ? 'bg-ember-accent/50' : 'bg-white/10'
                      }`}
                    />
                    <span className={`text-[10px] font-bold tracking-widest uppercase transition-opacity duration-300 ${
                      isActive ? 'opacity-100 text-ember-accent' : 'opacity-30'
                    }`}>
                      {level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 mb-8">
            <div className="px-4 py-1 rounded-full bg-white/10 text-xs font-bold tracking-widest uppercase">
              {result.level} Burnout Risk
            </div>
            <div className="px-4 py-1 rounded-full bg-ember-accent/20 text-xs font-bold tracking-widest uppercase text-ember-accent">
              Score: {result.totalScore}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center text-left">
          {/* Left Column: Card Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-[400px] mx-auto aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl card-shadow"
          >
            <img 
              src={`/${result.level.toLowerCase()}.png`} 
              alt={`${result.level} Card`}
              className="w-full h-full object-cover pixelated"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback if image is not uploaded yet
                e.currentTarget.src = `https://picsum.photos/seed/${result.level}/786/786`;
              }}
            />
          </motion.div>

          {/* Right Column: Insights and Steps */}
          <div className="space-y-8">
            <section>
              <h3 className="text-xs font-bold tracking-widest uppercase opacity-40 mb-3">The Insight</h3>
              <p className="text-xl md:text-2xl font-serif leading-relaxed opacity-90">
                {result.summary}
              </p>
            </section>

            <section className="space-y-4">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <h3 className="text-xs font-bold tracking-widest uppercase opacity-40 mb-3">Primary Source</h3>
                <p className="text-lg font-medium text-ember-accent">{result.source}</p>
              </div>
              <div className="p-6 rounded-3xl bg-ember-accent/10 border border-ember-accent/20">
                <h3 className="text-xs font-bold tracking-widest uppercase opacity-40 mb-3">A Small Step</h3>
                <p className="text-lg font-medium">{result.advice}</p>
              </div>
            </section>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ember-bg rounded-full font-bold transition-transform"
        >
          <RefreshCw className="w-4 h-4" />
          Begin Again
        </motion.button>
      </div>
    </motion.div>
  );
}
