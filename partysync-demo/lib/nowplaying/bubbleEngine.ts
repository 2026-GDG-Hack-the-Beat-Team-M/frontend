import { randomFloat, randomInt } from '@/lib/shared/random';
import { REACTION_CONFIG } from './reactionConfig';

export interface BubbleItem {
  id: string;
  emoji: string;
  leftPercent: number;
  sizePx: number;
  durationSec: number;
  isUser: boolean;
}

export class BubbleEngine {
  private bubbles: BubbleItem[] = [];
  private maxBubbles: number = REACTION_CONFIG.MAX_BUBBLES;
  private onUpdate: (bubbles: BubbleItem[]) => void;

  constructor(onUpdate: (bubbles: BubbleItem[]) => void) {
    this.onUpdate = onUpdate;
  }

  public spawn(emoji: string, isUser: boolean = false): void {
    const id = `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const leftPercent = isUser ? randomFloat(38, 62) : randomFloat(10, 90);
    const sizePx = isUser ? randomInt(42, 54) : randomInt(24, 38);
    const durationSec = isUser ? 2.2 : randomFloat(2.4, 3.2);

    const newBubble: BubbleItem = {
      id,
      emoji,
      leftPercent,
      sizePx,
      durationSec,
      isUser,
    };

    this.bubbles = [...this.bubbles.slice(-this.maxBubbles), newBubble];
    this.onUpdate(this.bubbles);

    // Auto remove after animation duration
    setTimeout(() => {
      this.bubbles = this.bubbles.filter((b) => b.id !== id);
      this.onUpdate(this.bubbles);
    }, durationSec * 1000 + 200);
  }

  public clear(): void {
    this.bubbles = [];
    this.onUpdate([]);
  }
}
