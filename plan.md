# PhishProof — Implementation Plan

## Problem
Duolingo-styled, animation-heavy, gamified web app training Indian teenagers (13–18) to detect UPI fraud, phishing, fake KYC calls, OTP scams, and social engineering — through interactive scenarios. No login. No friction. Pure frontend.

## User Decisions
- **No APIs / No API keys** — pure frontend, hardcoded scenario bank (no Claude)
- **No backend** — 100% client-side, localStorage persistence
- **CRA template** (not Vite) acceptable
- **All 6 categories + all 6 question types** required in v1
- **Sound effects** included via Web Audio API

## Tech Stack
- React 18 (CRA) + TailwindCSS 3
- GSAP 3 (core + Flip + MotionPath)
- Framer Motion 11 (page transitions)
- Zustand (global store)
- localStorage (persistence)
- canvas-confetti (celebrations)
- Lucide React (icons)
- Web Audio API (sounds)
- Nunito + Inter (Google Fonts)

## Phase 1 — POC: SKIPPED
No external integrations, no APIs. Core = pure game/UI logic. No POC risk.

## Phase 2 — Full Application Build

### User Stories
- US1: App playable within 5s of open (no signup)
- US2: Select SMS Scams → lesson of 8 scenarios loads → first question renders with entry animation
- US3: Correct answer → green burst, +50 XP, Kavach happy, next round
- US4: Wrong answer → red shake, −1 heart, Kavach sad, breakdown screen with annotated red flags
- US5: Lose all 5 hearts → lesson fails, restart available
- US6: Complete 8 rounds → Results screen (stars, XP, badges)
- US7: Level up → full-screen confetti + Kavach excited dance + new title
- US8: Return next day → streak increments, daily missions refresh
- US9: 6 question types (Legit/Scam swipe, Spot the Red Flag tap, What Would You Do 4-option, True/False card flip, Fill the Safe Response, Rank the Danger drag)
- US10: 6 scenario renderers (SMS Android style, UPI BHIM style, WhatsApp green bubbles, Call dialogue, Email with from/replyTo, Website with URL bar)
- US11: Mobile-first (390px), touch targets ≥48px, swipe gestures
- US12: `prefers-reduced-motion` respected
- US13: Sound toggle — correct chime, wrong thud, level fanfare
- US14: Progress persists across sessions via localStorage key `phishproof_state`
- US15: Every wrong answer teaches exact trick via annotated breakdown

### Build Order
1. Install deps (gsap, framer-motion, zustand, canvas-confetti, lucide-react)
2. Global CSS — animated gradient bg, clay/glass tokens, fonts
3. Scenario bank — 60+ realistic Indian scenarios (minimum ~10 per category)
4. Game config — levels 1–10, 9 badges, daily missions, XP rules
5. Zustand gameStore.js (localStorage persistence)
6. Kavach SVG mascot with 6 GSAP expression states
7. UI primitives — GlassCard, ClayButton, BadgeUnlock overlay, LevelUpBurst overlay
8. GameHUD — Hearts, XPBar, StreakBadge, ProgressDots
9. 6 Scenario renderers — SMSBubble, UPIScreen, WhatsAppChat, CallTranscript, EmailViewer, FakeWebsite
10. 6 Question types — LegitOrScam, SpotTheFlag, WhatWouldYouDo, TrueOrFalse, FillTheSafe, RankTheDanger
11. Feedback — CorrectFlash, WrongShake, AnnotationLayer
12. 5 Pages — Welcome, SkillMap, GameRound, Breakdown, Results
13. Sound system (Web Audio API)
14. Daily missions panel
15. Wire routing + page transitions

## Phase 3 — Testing & Polish
- End-to-end testing via testing_agent_v3 (skip voice/camera/drag-drop if not supported)
- Fix all reported bugs
- Final visual polish

## Status
- Phase 1: N/A (skipped)
- Phase 2: In progress
- Phase 3: Pending
