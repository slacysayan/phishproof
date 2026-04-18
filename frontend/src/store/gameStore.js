import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getLevelFromXP, XP_VALUES, isSameDay, isNextDay, DAILY_MISSION_TEMPLATES } from '@/data/gameConfig';

const pickRandomMissions = () => {
  const pool = [...DAILY_MISSION_TEMPLATES];
  const out = [];
  for (let i = 0; i < 3 && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push({ ...pool[idx], progress: 0, done: false });
    pool.splice(idx, 1);
  }
  return out;
};

const initialState = {
  playerName: '',
  xp: 0,
  streak: { count: 0, lastDate: null },
  badges: [], // array of ids
  lessonProgress: {}, // { 'sms-1': { stars: 3, bestScore: 800, completed: true } }
  soundEnabled: true,
  reducedMotion: false,
  dailyMissions: { date: null, missions: [] },
  stats: { otpCaught: 0, phishingCaught: 0, upiCaught: 0, fastCorrect: 0 },
  // session state (not persisted)
};

export const useGameStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      setPlayerName: (name) => set({ playerName: name }),
      toggleSound: () => set({ soundEnabled: !get().soundEnabled }),

      // ===== XP / Level =====
      addXP: (amount) => {
        const prevLevel = getLevelFromXP(get().xp).level;
        const newXP = get().xp + amount;
        const newLevel = getLevelFromXP(newXP).level;
        set({ xp: newXP });
        return { leveledUp: newLevel > prevLevel, newLevel };
      },

      // ===== Streak =====
      recordActivity: () => {
        const today = new Date().toISOString();
        const { streak } = get();
        if (!streak.lastDate) {
          set({ streak: { count: 1, lastDate: today } });
        } else if (isSameDay(streak.lastDate, today)) {
          // already counted today
        } else if (isNextDay(streak.lastDate, today)) {
          set({ streak: { count: streak.count + 1, lastDate: today } });
        } else {
          set({ streak: { count: 1, lastDate: today } });
        }
      },

      // ===== Badges =====
      unlockBadge: (id) => {
        const { badges } = get();
        if (badges.includes(id)) return false;
        set({ badges: [...badges, id] });
        return true;
      },

      // ===== Stats =====
      bumpStat: (key, amount = 1) => {
        const stats = { ...get().stats };
        stats[key] = (stats[key] || 0) + amount;
        set({ stats });
      },

      // ===== Lessons =====
      completeLesson: (lessonId, stars, score, perfect) => {
        const prev = get().lessonProgress[lessonId] || { stars: 0 };
        const lessonProgress = { ...get().lessonProgress };
        lessonProgress[lessonId] = {
          stars: Math.max(prev.stars, stars),
          bestScore: Math.max(prev.bestScore || 0, score),
          completed: true,
          perfect: prev.perfect || perfect,
        };
        set({ lessonProgress });
      },

      // ===== Daily missions =====
      ensureDailyMissions: () => {
        const today = new Date().toISOString();
        const { dailyMissions } = get();
        if (!dailyMissions.date || !isSameDay(dailyMissions.date, today)) {
          set({ dailyMissions: { date: today, missions: pickRandomMissions() } });
        }
      },

      updateMissionProgress: (missionId, amount = 1) => {
        const { dailyMissions } = get();
        const missions = dailyMissions.missions.map((m) => {
          if (m.id !== missionId || m.done) return m;
          const progress = Math.min(m.target, m.progress + amount);
          const done = progress >= m.target;
          return { ...m, progress, done };
        });
        set({ dailyMissions: { ...dailyMissions, missions } });
      },

      claimMission: (missionId) => {
        const { dailyMissions, addXP } = get();
        const mission = dailyMissions.missions.find((m) => m.id === missionId);
        if (!mission || !mission.done || mission.claimed) return null;
        const missions = dailyMissions.missions.map((m) =>
          m.id === missionId ? { ...m, claimed: true } : m
        );
        set({ dailyMissions: { ...dailyMissions, missions } });
        addXP(mission.xp);
        return mission.xp;
      },

      // ===== Reset =====
      resetAll: () => set({ ...initialState }),
    }),
    {
      name: 'phishproof_state',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
