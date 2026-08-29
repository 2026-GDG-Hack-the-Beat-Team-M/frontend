export const BATTLE_CONFIG = {
  ROUND_TOTAL: 3,
  BATTLE_DURATION: 20, // seconds
  PREROLL_DURATION: 3, // seconds for round 2+
  TAP_LIMIT: 100, // max user taps per battle
  TAP_WEIGHT_MIN: 1,
  TAP_WEIGHT_MAX: 3,
  TICK_INTERVAL_MIN: 200, // ms
  TICK_INTERVAL_MAX: 400, // ms
  DELTA_MIN: 1,
  DELTA_MAX: 15,
  SEED_TOTAL_MIN: 300,
  SEED_TOTAL_MAX: 600,
  SEED_RATIO_MIN: 0.45,
  SEED_RATIO_MAX: 0.55,
  /**
   * 배틀마다 정해지는 '군중이 미는 곡' 쏠림 정도.
   * 가상 투표가 한쪽으로 0.5±CROWD_BIAS 확률로 유입된다.
   * 이 값이 0이면 사용자의 연타가 판을 100% 지배해 매번 전승이 나온다.
   * 0.22에서 풀연타 시 라운드 승률 약 67%로, PRD §0.6의 60~70% 목표에 맞는다.
   */
  CROWD_BIAS: 0.22,
  GAUGE_CLAMP_MIN: 0.15,
  GAUGE_CLAMP_MAX: 0.85,
  CRITICAL_TIME_THRESHOLD: 5, // last 5 seconds
} as const;
