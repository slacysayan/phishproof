// Aggregated scenario bank - imports from per-category files
import { SMS_SCENARIOS } from '@/data/scenarios/sms';
import { UPI_SCENARIOS } from '@/data/scenarios/upi';
import { KYC_SCENARIOS } from '@/data/scenarios/kyc';
import { SOCIAL_SCENARIOS } from '@/data/scenarios/social';
import { JOBS_SCENARIOS } from '@/data/scenarios/jobs';
import { EXPERT_SCENARIOS } from '@/data/scenarios/expert';

export const SCENARIOS = [
  ...SMS_SCENARIOS,
  ...UPI_SCENARIOS,
  ...KYC_SCENARIOS,
  ...SOCIAL_SCENARIOS,
  ...JOBS_SCENARIOS,
  ...EXPERT_SCENARIOS,
];

export const getScenariosByCategory = (categoryId, count = 8) => {
  const pool = SCENARIOS.filter((s) => s.category === categoryId);
  // Shuffle and take count
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getLessons = () => {
  // 3 lessons per category, differentiated by difficulty
  const lessons = [];
  const cats = ['sms', 'upi', 'kyc', 'social', 'jobs', 'expert'];
  cats.forEach((cat) => {
    for (let i = 1; i <= 3; i++) {
      lessons.push({ id: `${cat}-${i}`, category: cat, order: i, title: `Lesson ${i}` });
    }
  });
  return lessons;
};

export default SCENARIOS;
