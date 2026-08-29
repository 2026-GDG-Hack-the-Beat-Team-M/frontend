# PartySync Demo Task Tracker (Ralph-Style Workflow)

## Current Iteration
- **Status:** Scaffold Completed
- **Target:** Initial Project Structure & Modules Setup

---

## 1. Project Scaffolding & Setup (Chore)
- [x] Create project tree under `partysync-demo/` with Next.js 15, React 19, TypeScript, and Tailwind CSS.
- [x] Define Tailwind CSS color tokens and keyframe animations in `tailwind.config.ts`.
- [x] Configure base CSS in `app/globals.css`.
- [x] Create core types in `types/index.ts`.
- [x] Create static presets in `data/presets.json` and badge rules in `data/badges.ts`.

---

## 2. Core UI Primitives & Shell (Sprint 0)
- [x] `components/ui/Button.tsx` (48x48 min touch target guaranteed, neon variants)
- [x] `components/ui/Screen.tsx` (Safe area wrapper, ambient orbs)
- [x] `components/ui/Sheet.tsx` (Bottom sheet modal drawer)
- [x] `components/shell/RoundIndicator.tsx` (Reusable `ROUND n/3` indicator)
- [x] `components/shell/NicknameForm.tsx` (Input + profanity filter + randomizer)
- [x] `components/shell/OnboardingScreen.tsx` (QR + landing)
- [x] `components/shell/SessionOrchestrator.tsx` (Zustand state machine)

---

## 3. Drop Battle Loop (Sprint 1)
- [x] `lib/battle/battleConfig.ts` (Constants & balance tuning)
- [x] `lib/battle/battleTimer.ts` (Date.now() background-resilient timer)
- [x] `lib/battle/voteSimulator.ts` (Virtual vote influx 200~400ms)
- [x] `lib/battle/resolveWinner.ts` (Score tally and tie-breaking)
- [x] `components/battle/Countdown.tsx` (20s timer + 5s critical blink)
- [x] `components/battle/CriticalTimeOverlay.tsx` (Critical visual boost)
- [x] `components/battle/TugGauge.tsx` (15~85% clamp tug gauge)
- [x] `components/battle/SplitCard.tsx` (A vs B card selection)
- [x] `components/battle/TapArea.tsx` (Fast continuous tap boost with haptics & ripple)
- [x] `components/battle/PrerollIntro.tsx` (3-second candidate track intro for R2+)
- [x] `components/battle/WinnerReveal.tsx` (Confetti + winner reveal)
- [x] `components/battle/BattleScreen.tsx` (Battle main entry)

---

## 4. NOW PLAYING & Live Vibe Tracker (Sprint 2)
- [x] `lib/nowplaying/reactionConfig.ts` (Reaction parameters & bias)
- [x] `lib/nowplaying/reactionSimulator.ts` (300~900ms reaction influx & decay)
- [x] `lib/nowplaying/bubbleEngine.ts` (Emoji bubble physics & pooling)
- [x] `components/nowplaying/AlbumArt.tsx` (Large square artwork with glow)
- [x] `components/nowplaying/FakeProgressBar.tsx` (Simulated track progress)
- [x] `components/nowplaying/Visualizer.tsx` (Simulated audio visualizer)
- [x] `components/nowplaying/VoteResultSummary.tsx` (Tally & victory text)
- [x] `components/nowplaying/ReactionButtons.tsx` (🔥 / 😐 / 🥱 1-tap reaction)
- [x] `components/nowplaying/TagPicker.tsx` (Up to 3 secondary tags)
- [x] `components/nowplaying/ReactionRateBar.tsx` (Smooth easing reaction percentages)
- [x] `components/nowplaying/BubbleLayer.tsx` (Floating bubbles with pointer-events: none)
- [x] `components/nowplaying/NicknameToast.tsx` (Real-time nickname toasts)
- [x] `components/nowplaying/TagTicker.tsx` (Flowing tags marquee)
- [x] `components/nowplaying/NextRoundCta.tsx` (8s pulse CTA)
- [x] `components/nowplaying/NowPlayingScreen.tsx` (NowPlaying main entry)

---

## 5. Personal Taste Result & Recap (Sprint 3)
- [x] `lib/result/genreDistribution.ts` (Genre percentage aggregator)
- [x] `lib/result/badgeEngine.ts` (§0.10 Adjudication logic)
- [x] `lib/result/shareImage.ts` (9:16 Canvas share card generator)
- [x] `components/result/BadgeStack.tsx` (Primary + 2 secondary badges)
- [x] `components/result/GenreDonut.tsx` (SVG animated donut chart)
- [x] `components/result/RoundStrip.tsx` (3-round victory strip `✅ ❌ ✅`)
- [x] `components/result/StatsList.tsx` (Favorite drop, total taps, total reactions)
- [x] `components/result/ShareCard.tsx` (Share/Download button)
- [x] `components/result/FeedbackForm.tsx` (Star rating + 300 char feedback)
- [x] `components/result/DoneScreen.tsx` (Submission completion screen)
- [x] `components/result/TasteResultScreen.tsx` (Result main entry)

---

## 6. Dev & Isolated Verification Routes
- [x] `/dev/battle?round=1`
- [x] `/dev/nowplaying?case=win&last=true`
- [x] `/dev/result?case=2win`

---

## Blockers
- None.
