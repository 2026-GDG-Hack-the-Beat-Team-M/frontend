import { randomInt } from '@/lib/shared/random';
import { BATTLE_CONFIG } from './battleConfig';

export interface VoteSimulationOptions {
  onVoteDelta: (side: 'A' | 'B', delta: number) => void;
}

export class VoteSimulator {
  private timerId: number | null = null;
  private isRunning: boolean = false;
  private onVoteDelta: (side: 'A' | 'B', delta: number) => void;

  constructor(options: VoteSimulationOptions) {
    this.onVoteDelta = options.onVoteDelta;
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;

    const scheduleNext = () => {
      if (!this.isRunning) return;

      const delay = randomInt(
        BATTLE_CONFIG.TICK_INTERVAL_MIN,
        BATTLE_CONFIG.TICK_INTERVAL_MAX
      );

      this.timerId = window.setTimeout(() => {
        if (!this.isRunning) return;

        const side: 'A' | 'B' = Math.random() < 0.5 ? 'A' : 'B';
        const delta = randomInt(
          BATTLE_CONFIG.DELTA_MIN,
          BATTLE_CONFIG.DELTA_MAX
        );

        this.onVoteDelta(side, delta);
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
