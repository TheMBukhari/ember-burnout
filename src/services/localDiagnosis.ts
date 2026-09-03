import { DiagnosisResult } from '../types';

type Level = 'Healthy' | 'Alright' | 'Fine' | 'Burning' | 'Burned';

// ─── Level thresholds (6 questions × max 5 = 30 points) ────────────────────
function getLevel(score: number): Level {
  if (score <= 10) return 'Healthy';
  if (score <= 15) return 'Alright';
  if (score <= 19) return 'Fine';
  if (score <= 24) return 'Burning';
  return 'Burned';
}

// ─── Find the category with the highest total score ─────────────────────────
function getPrimarySource(answers: { source: string; score: number }[]): string {
  const totals: Record<string, number> = {};
  for (const a of answers) {
    totals[a.source] = (totals[a.source] ?? 0) + a.score;
  }
  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
}

// ─── Summaries per burnout level ────────────────────────────────────────────
const SUMMARIES: Record<Level, string> = {
  Healthy:
    "You're carrying your load with genuine resilience. Your energy reserves are holding up, and your relationship with work and rest seems balanced. Keep tending to the habits that got you here.",
  Alright:
    "You're managing well, but some signs of wear are showing under the surface. You haven't crossed into burnout territory, yet the early signals are worth paying attention to before they grow louder.",
  Fine:
    "You're functional, but coasting on fumes. The spark that used to make things feel meaningful is dimming. This is the zone where many people stay too long — because it's not bad enough to stop, but not good enough to thrive.",
  Burning:
    "The warning signs are hard to ignore now. Your capacity to absorb more stress is running thin, and recovery is taking longer than it should. This is your body and mind asking — clearly — for a change.",
  Burned:
    "You've been running on empty for a while. What you're feeling isn't weakness; it's the result of sustained pressure without enough recovery. Rest is not a reward here — it's a requirement. You deserve real support.",
};

// ─── Advice per primary burnout source ──────────────────────────────────────
const ADVICE: Record<string, string> = {
  'Emotional Exhaustion':
    'Tomorrow morning, before you check your phone, give yourself five minutes of quiet. No agenda — just stillness. Let the day begin on your terms.',
  'Cognitive Overload':
    'Pick one task today and finish it before opening anything else. Single-tasking, even for an hour, can begin to clear the mental fog.',
  'Interpersonal Burnout':
    "Protect one hour today as yours alone — no messages, no calls. Solitude isn't selfishness; it's maintenance.",
  'Depersonalization':
    "Do one small thing today purely because you enjoy it, not because it's productive. Reconnecting with pleasure is how the spark comes back.",
  'Somatic Stress':
    'Take three slow, deep breaths right now — inhale for four counts, hold for four, out for six. Your nervous system is listening.',
  'Existential Burnout':
    "Write down one thing — however small — you're looking forward to this week. Giving the mind a point on the horizon changes how the journey feels.",
};

const DEFAULT_ADVICE =
  'Step outside for ten minutes today. No destination needed. Movement and fresh air are among the simplest resets we have.';

// ─── Main export ─────────────────────────────────────────────────────────────
export function getDiagnosis(
  answers: { question: string; choice: string; score: number; source: string }[]
): DiagnosisResult {
  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
  const level = getLevel(totalScore);
  const source = getPrimarySource(answers);

  return {
    level,
    totalScore,
    summary: SUMMARIES[level],
    source,
    advice: ADVICE[source] ?? DEFAULT_ADVICE,
  };
}
