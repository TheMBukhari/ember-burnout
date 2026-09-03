export interface Choice {
  text: string;
  score: number; // 1 (healthy) to 5 (very burned)
}

export interface Question {
  id: string;
  text: string;
  source: string; // The category of burnout this question targets
  choices: Choice[];
  miniFigureUrl?: string;
}

export interface DiagnosisResult {
  level: 'Healthy' | 'Alright' | 'Fine' | 'Burning' | 'Burned';
  summary: string;
  source: string;
  advice: string;
  totalScore: number;
}
