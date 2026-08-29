export interface BattleTimerOptions {
  durationSeconds: number;
  onTick: (remainingSeconds: number) => void;
  onComplete: () => void;
}

export class BattleTimer {
  private durationMs: number;
  private startTime: number = 0;
  private timerId: number | null = null;
  private onTick: (remainingSeconds: number) => void;
  private onComplete: () => void;
  private isRunning: boolean = false;

  constructor(options: BattleTimerOptions) {
    this.durationMs = options.durationSeconds * 1000;
    this.onTick = options.onTick;
    this.onComplete = options.onComplete;
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = Date.now();

    const loop = () => {
      if (!this.isRunning) return;

      const elapsed = Date.now() - this.startTime;
      const remainingMs = Math.max(0, this.durationMs - elapsed);
      const remainingSec = Math.ceil(remainingMs / 1000);

      this.onTick(remainingSec);

      if (remainingMs <= 0) {
        this.stop();
        this.onComplete();
        return;
      }

      this.timerId = window.setTimeout(loop, 100);
    };

    loop();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}
