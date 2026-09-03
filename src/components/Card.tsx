import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, Choice } from '../types';
import { cn } from '../lib/utils';
import { Info } from 'lucide-react';

interface CardProps {
  question: Question;
  onSelect: (choice: Choice) => void | Promise<void>;
  index: number;
  total: number;
}

export default function Card({ question, onSelect, index, total }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-[768px] mx-auto perspective-1000 aspect-square">
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full h-full preserve-3d"
      >
        {/* CARD BACK */}
        <div 
          className={cn(
            "absolute inset-0 backface-hidden glass card-shadow flex flex-col items-center justify-center cursor-pointer group",
            isFlipped && "pointer-events-none"
          )}
          onClick={() => setIsFlipped(true)}
        >
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
            <img 
              src="/card.png" 
              alt="Card Back Design" 
              className="w-full h-full object-cover rounded-3xl pixelated"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback if image is not uploaded yet
                e.currentTarget.src = "https://picsum.photos/seed/ember-back/768/768";
              }}
            />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-ember-accent/20 flex items-center justify-center animate-pulse">
              <div className="w-10 h-10 rounded-full bg-ember-accent/40" />
            </div>
            <p className="font-serif text-2xl italic opacity-60">Tap to reveal</p>
          </div>
          
          <div className="absolute bottom-8 text-[10px] tracking-[0.4em] uppercase font-bold opacity-30">
            Ember Assessment • {index + 1}
          </div>
        </div>

        {/* CARD FRONT */}
        <div 
          className={cn(
            "absolute inset-0 backface-hidden glass card-shadow p-8 md:p-10 flex flex-col justify-between overflow-y-auto",
            !isFlipped && "pointer-events-none"
          )}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <Info className="w-3 h-3 text-ember-accent" />
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                  {question.source}
                </span>
              </div>
              <div className="h-1 w-20 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-ember-accent"
                  initial={{ width: 0 }}
                  animate={{ width: isFlipped ? `${((index + 1) / total) * 100}%` : 0 }}
                />
              </div>
            </div>

            {/* Mini Figure */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shadow-inner">
                {question.miniFigureUrl && (
                  <img 
                    src={question.miniFigureUrl} 
                    alt="Mini Figure" 
                    className="w-full h-full object-contain pixelated"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-8 text-center">
              {question.text}
            </h2>
          </div>

          <div className="space-y-3 relative z-10">
            {question.choices.map((choice, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(choice)}
                className={cn(
                  "w-full text-left p-4 rounded-xl transition-colors duration-300",
                  "bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20",
                  "group relative overflow-hidden"
                )}
              >
                <span className="relative z-10 text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">
                  {choice.text}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-ember-accent/0 to-ember-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
