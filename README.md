# PartySync (PartySync 1인 데모 — Phase 0)

> **실시간 참여형 파티 인터랙션 플랫폼**  
> 모바일 웹에서 닉네임 하나로 참여하여 실시간 탭 배틀로 음악을 결정하고, NOW PLAYING 화면에서 다른 관객과 반응을 공유하며, 3라운드 후 나만의 파티 취향 리캡 카드를 발급받습니다.

---

## 📁 프로젝트 구조 (Project Structure)

> **디자인 시스템 반영 사항**: 기존 CSS 토큰 파일(`styles/tokens.css`)을 제거하고, **Tailwind CSS (`tailwind.config.ts` 및 `app/globals.css`) 기반**으로 통일하여 재구성했습니다.

```text
├── plan/                                 📋 기획 및 개발 트래커
│   ├── TODO.md                           작업 진행 현황 (Ralph-Style Loop)
│   ├── ARCHITECTURE.md                   프론트엔드 아키텍처 및 상태 흐름도
│   └── SPRINT_PLAN.md                    스프린트 개발 계획
│
├── partysync-demo/                       ⚡ Next.js 프론트엔드 프로젝트
│   ├── app/
│   │   ├── layout.tsx                    ⚪ 루트 레이아웃 · 폰트 · 뷰포트 고정
│   │   ├── globals.css                   ⚪ Tailwind CSS 베이스 · 리셋 · 유틸리티
│   │   ├── page.tsx                      🅰️ / → 온보딩 진입
│   │   ├── play/
│   │   │   └── page.tsx                  🅰️ 세션 전체를 구동하는 단일 라우트
│   │   └── dev/                          ── 단독 검증용 라우트
│   │       ├── battle/page.tsx           🅱️ /dev/battle?round=1
│   │       ├── nowplaying/page.tsx       🅲 /dev/nowplaying?case=win&last=true
│   │       └── result/page.tsx           🅳 /dev/result?case=2win
│   │
│   ├── components/
│   │   ├── shell/                        🅰️ 공통 셸 & 상태 머신
│   │   │   ├── SessionOrchestrator.tsx   ★ Phase 상태 기계 · 라운드 분기
│   │   │   ├── OnboardingScreen.tsx        QR 랜딩 · 파티 소개
│   │   │   ├── NicknameForm.tsx            닉네임 입력 · 금칙어 필터
│   │   │   ├── PhaseTransition.tsx         화면 전환 크로스페이드
│   │   │   └── RoundIndicator.tsx          ROUND n/3 (공용 표시 컴포넌트)
│   │   │
│   │   ├── battle/                       🅱️ 배틀 화면 모듈
│   │   │   ├── BattleScreen.tsx          ★ 계약 진입점
│   │   │   ├── PrerollIntro.tsx            R2~ 3초 후보곡 소개
│   │   │   ├── SplitCard.tsx               A vs B 풀스크린 스플릿
│   │   │   ├── TugGauge.tsx                줄다리기 게이지 (clamp 15~85%)
│   │   │   ├── TapArea.tsx                 연타 영역 · 진영 확정 · 햅틱
│   │   │   ├── Countdown.tsx               20초 · 마지막 5초 강조
│   │   │   ├── CriticalTimeOverlay.tsx     P1 · 박빙 시 득표 2배
│   │   │   └── WinnerReveal.tsx            컨페티 · 승리곡 확정 연출
│   │   │
│   │   ├── nowplaying/                   🅲 승리곡 재생 & 라이브 반응 모듈
│   │   │   ├── NowPlayingScreen.tsx      ★ 계약 진입점
│   │   │   ├── AlbumArt.tsx                대형 아트워크 · 펄스 글로우
│   │   │   ├── FakeProgressBar.tsx         가짜 재생 진행바 (음원 재생 없음)
│   │   │   ├── Visualizer.tsx              오디오 비주얼라이저 (가짜)
│   │   │   ├── VoteResultSummary.tsx       득표수 · 득표율 · 내 승패 문구
│   │   │   ├── ReactionButtons.tsx         🔥 / 😐 / 🥱
│   │   │   ├── TagPicker.tsx               세부 태그 최대 3개
│   │   │   ├── ReactionRateBar.tsx         반응률 바 (ease 증가)
│   │   │   ├── BubbleLayer.tsx           ★ 이모지 버블 · pointer-events:none
│   │   │   ├── NicknameToast.tsx           "Yuna_92 님이 🔥 남겼어요"
│   │   │   ├── TagTicker.tsx               태그 흘러가는 티커
│   │   │   └── NextRoundCta.tsx            CTA · 8초 후 펄스 · 라벨 분기
│   │   │
│   │   ├── result/                       🅳 개인 취향 결과 & 리캡 모듈
│   │   │   ├── TasteResultScreen.tsx     ★ 계약 진입점
│   │   │   ├── BadgeStack.tsx              대표 1 + 보조 2
│   │   │   ├── GenreDonut.tsx              장르 분포 도넛
│   │   │   ├── RoundStrip.tsx              R1 ✅ R2 ❌ R3 ✅
│   │   │   ├── StatsList.tsx               최애 드랍 · 총 탭 · 반응 수
│   │   │   ├── ShareCard.tsx             ★ 9:16 canvas 이미지 생성
│   │   │   ├── FeedbackForm.tsx            별점 + 300자 소감
│   │   │   └── DoneScreen.tsx              제출 완료
│   │   │
│   │   └── ui/                           ⚪ 공용 프리미티브
│   │       ├── Button.tsx                  48×48 터치 타깃 보장
│   │       ├── Screen.tsx                  풀스크린 세이프에어리어 래퍼
│   │       └── Sheet.tsx                   하단 시트
│   │
│   ├── lib/
│   │   ├── battle/                       🅱️
│   │   │   ├── battleTimer.ts            ★ Date.now() 기준 · 백그라운드 복귀 보정
│   │   │   ├── voteSimulator.ts          ★ 가상 투표 유입 (200~400ms)
│   │   │   ├── resolveWinner.ts            동점 → random_tie
│   │   │   └── battleConfig.ts           ★ 밸런스 상수 (통합 때 여기만 조정)
│   │   │
│   │   ├── nowplaying/                   🅲
│   │   │   ├── reactionSimulator.ts      ★ 가상 반응 유입 (300~900ms) · 감쇠
│   │   │   ├── bubbleEngine.ts           ★ 버블 생성/소멸 · 60fps 예산 관리
│   │   │   └── reactionConfig.ts         ★ 밀도·편향 상수
│   │   │
│   │   ├── result/                       🅳
│   │   │   ├── badgeEngine.ts            ★ §0.10 판정 로직
│   │   │   ├── genreDistribution.ts        지지곡 + Good 반응곡 장르 집계
│   │   │   └── shareImage.ts             ★ canvas 9:16 렌더 · 폰트/이모지 대응
│   │   │
│   │   └── shared/                       ⚪ 동결 유틸리티
│   │       ├── random.ts                   randomInt · weightedPick · seedRatio
│   │       ├── clamp.ts
│   │       ├── haptics.ts                  Navigator.vibrate 래퍼
│   │       └── storage.ts                  localStorage 세션 복원
│   │
│   ├── store/
│   │   └── session.ts                    ⚪ Zustand 세션 상태 기계
│   │
│   ├── types/
│   │   └── index.ts                      ⚪ 도메인 인터페이스 및 공용 타입 정의
│   │
│   ├── data/                             ⚪ 정적 프리셋 & 뱃지 규칙
│   │   ├── presets.json                    3라운드 배틀 프리셋 (§0.7)
│   │   ├── badges.ts                       뱃지 정의 (id · emoji · label · caption)
│   │   ├── nicknames.ts                    가상 닉네임 풀 30+
│   │   ├── tags.ts                         세부 태그 목록
│   │   └── fixtures.ts                   ★ 브랜치 공용 테스트 데이터
│   │
│   ├── public/
│   │   ├── artwork/                        r1a.svg ~ r3b.svg (6장 프리셋 아트)
│   │   └── qr.svg                          데모용 고정 QR
│   │
│   ├── tailwind.config.ts                🎨 테일윈드 테마 토큰 및 애니메이션
│   ├── postcss.config.mjs                PostCSS 설정
│   ├── next.config.ts                    Next.js 설정
│   ├── tsconfig.json                     TypeScript 설정 (@/* alias)
│   └── package.json                      의존성 정의
│
├── PRD.md                                📖 단일 진실 공급원 (SSOT v2.1)
├── PROMPT.md                             🤖 Ralph-Style Engineering Guide
└── reference/
    └── partysync.html                    🎨 프로토타입 레퍼런스
```

---

## 🛠️ 기술 스택 (Tech Stack)

* **Framework**: Next.js 15 (App Router), React 19
* **Language**: TypeScript 5.8 (Strict Mode)
* **Styling**: Tailwind CSS (Dark Cyberpunk Party Theme Tokens)
* **State Management**: Zustand 5 + LocalStorage Persistence
* **Animations & Effects**: Canvas-Confetti, CSS Keyframe Animations, Sine-wave Bubble Engine
* **Haptics**: Web Vibration API Safe Wrapper

---

## 🚀 빠른 시작 (Getting Started)

```bash
cd partysync-demo
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

### 🧪 단독 검증 라우트 (Isolated Dev Pages)
* **배틀 화면 검증**: `http://localhost:3000/dev/battle?round=1` (1~3라운드 테스트)
* **승리곡 재생 화면 검증**: `http://localhost:3000/dev/nowplaying?case=win&last=false`
* **취향 결과 리캡 화면 검증**: `http://localhost:3000/dev/result?case=2win` (`3win`, `0win` 등 테스트)
