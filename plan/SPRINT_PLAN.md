# PartySync Demo Sprint Plan

## Sprint 0: Foundation & Core Primitives
- Setup Next.js 15 + Tailwind CSS configuration
- Define domain interfaces, fixtures, and presets
- Implement `Screen`, `Button`, `Sheet`, `RoundIndicator`, `NicknameForm`

## Sprint 1: Drop Battle Engine
- Implement high-res `BattleTimer` & `VoteSimulator`
- Implement `SplitCard`, `TugGauge`, `TapArea`, `Countdown`, `CriticalTimeOverlay`, `WinnerReveal`
- Build `/dev/battle` route

## Sprint 2: NOW PLAYING & Live Vibe Tracker
- Implement `ReactionSimulator` & `BubbleEngine`
- Implement `AlbumArt`, `FakeProgressBar`, `Visualizer`, `ReactionButtons`, `TagPicker`, `BubbleLayer`, `NicknameToast`
- Build `/dev/nowplaying` route

## Sprint 3: Taste Recap & Share Card
- Implement `badgeEngine` (§0.10 rules) & `genreDistribution`
- Implement `shareImage` (9:16 Canvas rendering)
- Implement `BadgeStack`, `GenreDonut`, `RoundStrip`, `FeedbackForm`, `DoneScreen`
- Build `/dev/result` route

## Sprint 4: Integration & E2E Verification
- Connect `SessionOrchestrator` to complete full 3-round golden path
- Tune vote influx & reaction decay parameters
