export function triggerHaptic(pattern: number | number[] = 10): void {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignore vibration errors gracefully on unsupported devices
    }
  }
}
