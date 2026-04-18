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
  <div className="sticky top-3 z-30 mx-auto w-[min(460px,calc(100%-24px))] bg-white rounded-full shadow-[var(--pp-shadow-card)] px-3 py-2.5" data-testid="game-hud">
    <div className="flex items-center gap-2">
      {showBackButton && (
        <button
          onClick={onBack}
          className="h-8 w-8 rounded-full bg-[#f5f5f5] hover:bg-[#ebebeb] flex items-center justify-center text-[#242424] transition"
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
        className="h-8 w-8 rounded-full bg-[#f5f5f5] hover:bg-[#ebebeb] flex items-center justify-center text-[#242424] transition"
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
