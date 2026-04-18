import React from 'react';
import HeartsBar from './HeartsBar';
import XPBar from './XPBar';
import StreakBadge from './StreakBadge';
import ProgressDots from './ProgressDots';
import { ChevronLeft, Volume2, VolumeX } from 'lucide-react';

export const GameHUD = ({
  hearts, xp, streakCount, streakMultiplier,
  currentRound, totalRounds, onBack, soundEnabled, onToggleSound, showBackButton = true
}) => (
  <div className="sticky top-3 z-30 mx-auto w-[min(420px,calc(100%-24px))] pp-glass rounded-full px-3 py-2.5" data-testid="game-hud">
    <div className="flex items-center gap-2">
      {showBackButton && (
        <button
          onClick={onBack}
          className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          aria-label="Back"
          data-testid="hud-back"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}
      {hearts !== undefined && <HeartsBar hearts={hearts} />}
      <XPBar xp={xp} />
      <StreakBadge count={streakCount} multiplier={streakMultiplier} />
      <button
        onClick={onToggleSound}
        className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
        aria-label="Toggle sound"
        data-testid="hud-sound"
      >
        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
    </div>
    {typeof currentRound === 'number' && (
      <div className="mt-2 flex justify-center">
        <ProgressDots current={currentRound} total={totalRounds} />
      </div>
    )}
  </div>
);

export default GameHUD;
