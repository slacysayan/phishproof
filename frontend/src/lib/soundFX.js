// Web Audio API sound FX — tiny, no files
let audioCtx = null;
const getCtx = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) { return null; }
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
};

const playTone = (freq, duration = 0.12, type = 'sine', gain = 0.15, startOffset = 0) => {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + startOffset);
  g.gain.setValueAtTime(0, ctx.currentTime + startOffset);
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + startOffset + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startOffset + duration);
  osc.connect(g).connect(ctx.destination);
  osc.start(ctx.currentTime + startOffset);
  osc.stop(ctx.currentTime + startOffset + duration + 0.05);
};

export const sfx = {
  correct: () => {
    playTone(523.25, 0.1, 'sine', 0.18, 0);     // C5
    playTone(659.25, 0.1, 'sine', 0.18, 0.08);  // E5
    playTone(783.99, 0.18, 'sine', 0.2, 0.16);  // G5
  },
  wrong: () => {
    playTone(110, 0.25, 'sawtooth', 0.14, 0);
    playTone(90, 0.2, 'sawtooth', 0.1, 0.05);
  },
  xp: () => {
    playTone(880, 0.08, 'triangle', 0.14, 0);
    playTone(1174, 0.08, 'triangle', 0.14, 0.06);
    playTone(1568, 0.1, 'triangle', 0.14, 0.12);
  },
  tap: () => { playTone(420, 0.05, 'triangle', 0.08); },
  levelup: () => {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1568];
    notes.forEach((n, i) => playTone(n, 0.16, 'triangle', 0.18, i * 0.08));
  },
  badge: () => {
    playTone(1318.5, 0.18, 'sine', 0.2, 0);
    playTone(1760, 0.22, 'sine', 0.2, 0.1);
    playTone(2093, 0.3, 'sine', 0.18, 0.22);
  },
  heart: () => { playTone(220, 0.3, 'sawtooth', 0.12, 0); },
};

export const playSFX = (name, enabled = true) => {
  if (!enabled) return;
  if (sfx[name]) sfx[name]();
};
