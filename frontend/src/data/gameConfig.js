// Levels, badges, missions, XP rules
export const LEVELS = [
  { level: 1, title: 'Digital Rookie', xp: 0 },
  { level: 2, title: 'Link Looker', xp: 200 },
  { level: 3, title: 'OTP Guard', xp: 500 },
  { level: 4, title: 'Scam Spotter', xp: 900 },
  { level: 5, title: 'Phish Buster', xp: 1400 },
  { level: 6, title: 'KYC Defender', xp: 2000 },
  { level: 7, title: 'Cyber Sentinel', xp: 2800 },
  { level: 8, title: 'Fraud Fighter', xp: 3800 },
  { level: 9, title: 'Shield Master', xp: 5000 },
  { level: 10, title: 'Scam Immune', xp: 6500 },
];

export const getLevelFromXP = (xp) => {
  let current = LEVELS[0];
  for (const l of LEVELS) if (xp >= l.xp) current = l;
  return current;
};

export const getNextLevel = (xp) => {
  for (const l of LEVELS) if (xp < l.xp) return l;
  return null;
};

export const getLevelProgress = (xp) => {
  const current = getLevelFromXP(xp);
  const next = getNextLevel(xp);
  if (!next) return { current, next: null, percent: 100, needed: 0 };
  const span = next.xp - current.xp;
  const progress = xp - current.xp;
  return { current, next, percent: Math.min(100, (progress / span) * 100), needed: next.xp - xp };
};

export const BADGES = [
  { id: 'first_blood', icon: '🎯', name: 'First Blood', desc: 'Your first correct answer' },
  { id: 'otp_guardian', icon: '🔐', name: 'OTP Guardian', desc: 'Spot 10 OTP scams correctly' },
  { id: 'phish_hunter', icon: '🎣', name: 'Phish Hunter', desc: 'Spot 25 phishing attempts' },
  { id: 'bank_whisperer', icon: '🏦', name: 'Bank Whisperer', desc: 'Complete KYC category with 3 stars' },
  { id: 'speed_demon', icon: '⚡', name: 'Speed Demon', desc: '10 fast correct answers' },
  { id: 'unbreakable', icon: '🛡️', name: 'Unbreakable', desc: 'Complete a lesson without losing a heart' },
  { id: 'streak_legend', icon: '🔥', name: 'Streak Legend', desc: '7-day daily streak' },
  { id: 'scam_immune', icon: '👑', name: 'Scam Immune', desc: 'Complete all categories with 3 stars' },
  { id: 'upi_master', icon: '💳', name: 'UPI Master', desc: 'Complete UPI category perfectly' },
];

export const XP_VALUES = {
  correct: 50,
  speedBonus: 20,
  streakMultiplier: 1.5,
  perfectLesson: 100,
  partial: 20,
  wrong: 0,
};

export const CATEGORIES = [
  { id: 'sms', name: 'SMS Scams', icon: '📱', color: '#5C6BC0', desc: 'Fake bank SMS, delivery links, OTP baits' },
  { id: 'upi', name: 'UPI Tricks', icon: '💳', color: '#F093FB', desc: 'Collect requests, fake refunds, QR traps' },
  { id: 'kyc', name: 'KYC & Banks', icon: '🏦', color: '#4facfe', desc: 'Bank impersonation, Aadhaar traps' },
  { id: 'social', name: 'Social Engineering', icon: '💬', color: '#43A047', desc: 'WhatsApp, calls, fake friends' },
  { id: 'jobs', name: 'Fake Jobs', icon: '💼', color: '#FF9800', desc: 'Work-from-home traps, paid recruitment' },
  { id: 'expert', name: 'Expert Gauntlet', icon: '👑', color: '#FFD700', desc: 'Adaptive mix of everything' },
];

export const DAILY_MISSION_TEMPLATES = [
  { id: 'catch_upi', desc: 'Catch 3 UPI scams today', target: 3, xp: 75, emoji: '💳' },
  { id: 'perfect_lesson', desc: 'Complete a lesson without losing a heart', target: 1, xp: 100, emoji: '🛡️' },
  { id: 'spot_domains', desc: 'Identify 2 fake domains', target: 2, xp: 50, emoji: '🌐' },
  { id: 'streak_game', desc: 'Get a 5-answer streak in one lesson', target: 5, xp: 60, emoji: '🔥' },
  { id: 'play_any', desc: 'Play any lesson today', target: 1, xp: 30, emoji: '🎯' },
  { id: 'catch_phish', desc: 'Spot 3 phishing attempts', target: 3, xp: 75, emoji: '🎣' },
];

export const isSameDay = (a, b) => {
  if (!a || !b) return false;
  const d1 = new Date(a);
  const d2 = new Date(b);
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
};

export const isNextDay = (prev, now) => {
  if (!prev) return false;
  const p = new Date(prev);
  const n = new Date(now);
  const diff = Math.floor((n.setHours(0,0,0,0) - p.setHours(0,0,0,0)) / (1000*60*60*24));
  return diff === 1;
};
