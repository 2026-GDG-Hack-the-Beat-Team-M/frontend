export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function weightedPick<T extends string>(weights: Record<T, number>): T {
  const keys = Object.keys(weights) as T[];
  const total = keys.reduce((acc, k) => acc + weights[k], 0);
  let threshold = Math.random() * total;

  for (const key of keys) {
    threshold -= weights[key];
    if (threshold <= 0) {
      return key;
    }
  }

  return keys[keys.length - 1];
}
