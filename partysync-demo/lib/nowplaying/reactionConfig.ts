export const REACTION_CONFIG = {
  INTERVAL_MIN: 300, // ms
  INTERVAL_MAX: 900, // ms
  DECAY_START_TIME_MS: 15000, // Start decaying rate after 15s
  MAX_BUBBLES: 25,
  TOAST_INTERVAL_MIN: 2500, // ms
  TOAST_INTERVAL_MAX: 4500, // ms
  TOAST_TRIGGER_CHANCE: 0.35,
  EMOJI_MAP: {
    good: '🔥',
    soso: '😐',
    bad: '🥱',
  },
  DEFAULT_BIAS: {
    good: 0.70,
    soso: 0.22,
    bad: 0.08,
  },
  CTA_PULSE_DELAY_MS: 8000,
} as const;
