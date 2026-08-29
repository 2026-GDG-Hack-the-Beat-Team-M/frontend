import { BattlePreset, Track } from '@/types';
import { ALL_TRACKS, MOOD_LABELS } from './tracks';
import { BATTLE_CONFIG } from '@/lib/battle/battleConfig';

/**
 * 10곡 후보 풀에서 라운드별 매치업(2곡씩)을 만든다.
 * - 세션마다 새로 뽑아서 매 시연이 같은 구도로 반복되지 않게 한다.
 * - 뽑힌 곡은 세션 내에서 재등장하지 않는다 (라운드 간 중복 금지).
 * - 에너지 순으로 라운드를 배치해 R1은 하이텐션, R3은 감성 구도가 되도록 한다.
 *   → 라운드마다 장르/분위기 구도가 달라져야 3곡 선택 결과가 의미를 갖는다 (PRD §0.7)
 */
function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildThemeTag(trackA: Track, trackB: Track): string {
  const avgEnergy = (trackA.audio.energy + trackB.audio.energy) / 2;
  if (avgEnergy >= 0.75) return '에너지 폭발 대결 ⚡';
  if (avgEnergy >= 0.55) return '그루브 & 리듬 대결 🕺';
  return '감성 & 떼창 대결 🎙️';
}

function buildThemeTitle(trackA: Track, trackB: Track): string {
  const moodA = MOOD_LABELS[trackA.audio.mood];
  const moodB = MOOD_LABELS[trackB.audio.mood];
  if (moodA === moodB) {
    return `${trackA.primary_genre} vs ${trackB.primary_genre}`;
  }
  return `${moodA} vs ${moodB}`;
}

export function buildMatchups(
  roundTotal: number = BATTLE_CONFIG.ROUND_TOTAL
): BattlePreset[] {
  const needed = roundTotal * 2;
  const picked = shuffle(ALL_TRACKS).slice(0, Math.min(needed, ALL_TRACKS.length));

  // 에너지 내림차순 → 앞쪽 라운드일수록 텐션이 높은 구도
  const byEnergy = [...picked].sort((a, b) => b.audio.energy - a.audio.energy);

  const presets: BattlePreset[] = [];
  for (let round = 1; round <= roundTotal; round += 1) {
    const trackA = byEnergy[(round - 1) * 2];
    const trackB = byEnergy[(round - 1) * 2 + 1];
    if (!trackA || !trackB) break;

    presets.push({
      round,
      theme_tag: buildThemeTag(trackA, trackB),
      theme_title: buildThemeTitle(trackA, trackB),
      trackA,
      trackB,
    });
  }

  return presets;
}

/** 개발/스토리북용 고정 매치업 (랜덤성 없이 화면을 확인할 때 사용) */
export const STATIC_MATCHUPS: BattlePreset[] = [
  {
    round: 1,
    theme_tag: '에너지 폭발 대결 ⚡',
    theme_title: 'EDM vs K-POP',
    trackA: ALL_TRACKS.find((t) => t.id === 'ariana_grande')!,
    trackB: ALL_TRACKS.find((t) => t.id === 'rescene')!,
  },
  {
    round: 2,
    theme_tag: '그루브 & 리듬 대결 🕺',
    theme_title: '외힙 vs K-POP',
    trackA: ALL_TRACKS.find((t) => t.id === 'dj_khaled')!,
    trackB: ALL_TRACKS.find((t) => t.id === 'newjeans')!,
  },
  {
    round: 3,
    theme_tag: '감성 & 떼창 대결 🎙️',
    theme_title: '감성 vs 싱어롱',
    trackA: ALL_TRACKS.find((t) => t.id === 'epik_high')!,
    trackB: ALL_TRACKS.find((t) => t.id === 'ed_sheeran')!,
  },
];
