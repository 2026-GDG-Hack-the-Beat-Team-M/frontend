import { ReactionType } from '@/types';
import { randomInt, randomChoice, weightedPick } from '@/lib/shared/random';
import { VIRTUAL_NICKNAMES } from '@/data/nicknames';
import { REACTION_CONFIG } from './reactionConfig';

export interface ReactionSimulatorCallbacks {
  onReaction: (reaction: ReactionType, emoji: string) => void;
  onToast: (nickname: string, emoji: string) => void;
}

export class ReactionSimulator {
  private timerId: number | null = null;
  private isRunning: boolean = false;
  private startTime: number = 0;
  private callbacks: ReactionSimulatorCallbacks;
  private positivityBias: number;

  constructor(callbacks: ReactionSimulatorCallbacks, positivityBias: number = 0.70) {
    this.callbacks = callbacks;
    this.positivityBias = positivityBias;
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = Date.now();

    const scheduleNext = () => {
      if (!this.isRunning) return;

      const elapsed = Date.now() - this.startTime;
      const isDecayed = elapsed > REACTION_CONFIG.DECAY_START_TIME_MS;

      // Base interval slows down after 15s to mimic natural decay
      const minInterval = isDecayed ? 700 : REACTION_CONFIG.INTERVAL_MIN;
      const maxInterval = isDecayed ? 1600 : REACTION_CONFIG.INTERVAL_MAX;
      const delay = randomInt(minInterval, maxInterval);

      this.timerId = window.setTimeout(() => {
        if (!this.isRunning) return;

        // Pick reaction based on positivity bias
        const sosoWeight = (1 - this.positivityBias) * 0.75;
        const badWeight = (1 - this.positivityBias) * 0.25;

        const reaction = weightedPick<ReactionType>({
          good: this.positivityBias,
          soso: sosoWeight,
          bad: badWeight,
        });

        const emoji = REACTION_CONFIG.EMOJI_MAP[reaction];
        this.callbacks.onReaction(reaction, emoji);

        // Randomly trigger nickname toast
        if (Math.random() < REACTION_CONFIG.TOAST_TRIGGER_CHANCE) {
          const nickname = randomChoice(VIRTUAL_NICKNAMES);
          this.callbacks.onToast(nickname, emoji);
        }

        scheduleNext();
      }, delay);
    };

    scheduleNext();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}
