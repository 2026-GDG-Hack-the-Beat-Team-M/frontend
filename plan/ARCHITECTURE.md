# PartySync Frontend Architecture

## 1. High-Level Flow (Golden Path)
```mermaid
flowchart TD
    A[📷 QR Onboarding] --> B[NicknameForm]
    B --> C[🎧 Round 1: BattleScreen (In-Progress)]
    C --> D[🏆 WinnerReveal]
    D --> E[🎵 NowPlayingScreen + Live Reactions]
    E -->|Next Round| F[🎧 Round 2: Preroll + BattleScreen]
    F --> G[🎵 NowPlayingScreen + Live Reactions]
    G -->|Next Round| H[🎧 Round 3: Preroll + BattleScreen]
    H --> I[🎵 NowPlayingScreen + Live Reactions]
    I -->|View Recap| J[📇 TasteResultScreen (9:16 Share Card)]
    J --> K[FeedbackForm -> DoneScreen]
```

## 2. State Management Strategy
- **Client In-Memory State**: Zustand store (`useSessionStore`) handles current phase, active round, accumulated battle results, reaction history, and feedback.
- **Persistence**: `localStorage` backup via `lib/shared/storage.ts` allows session recovery on accidental page refreshes.
- **No WebSocket**: All real-time vote and reaction streams are simulated locally via deterministic pseudo-random generators (`VoteSimulator`, `ReactionSimulator`).

## 3. Styling & Design System
- **Tailwind CSS**: Pure utility classes and custom config extensions in `tailwind.config.ts`.
- **Palette**: Dark party cyberpunk aesthetics (`#07060B` background, `#121019` / `#1A1724` surfaces, `#FF2D95` neon magenta, `#00F0FF` cyan, `#FF4D3D` critical red).
- **Responsive Target**: Optimized for mobile touch devices (minimum 48x48px touch targets, safe-area-inset support).
