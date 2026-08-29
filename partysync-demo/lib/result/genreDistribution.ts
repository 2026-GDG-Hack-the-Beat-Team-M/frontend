import { GenreBreakdown, SelectedTrackItem } from '@/types';
import { MOOD_LABELS } from '@/data/tracks';

/**
 * 가중치 합을 100% 분포로 변환한다.
 * 반올림 오차는 최상위 항목에 흡수시켜 합계를 항상 100으로 맞춘다.
 */
function toBreakdown(weights: Record<string, number>): GenreBreakdown[] {
  const total = Object.values(weights).reduce((sum, w) => sum + w, 0);
  if (total <= 0) return [];

  const rows = Object.entries(weights)
    .map(([genre, weight]) => ({
      genre,
      count: Number(weight.toFixed(2)),
      percentage: Math.round((weight / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  const diff = 100 - rows.reduce((sum, r) => sum + r.percentage, 0);
  if (diff !== 0 && rows.length > 0) {
    rows[0].percentage += diff;
  }

  return rows;
}

/**
 * 장르 분포 — 사용자가 실제로 고른 곡의 대표 장르만 집계한다.
 * 기권한 라운드(track === null)와 내가 고르지 않은 곡은 절대 포함하지 않는다.
 */
export function calculateGenreDistribution(
  picks: SelectedTrackItem[]
): GenreBreakdown[] {
  const weights: Record<string, number> = {};

  picks.forEach((pick) => {
    if (!pick.track) return;
    const genre = pick.track.primary_genre;
    weights[genre] = (weights[genre] || 0) + pick.weight;
  });

  return toBreakdown(weights);
}

/** 분위기(mood) 분포 — 역시 선택한 곡만 집계한다. */
export function calculateMoodDistribution(
  picks: SelectedTrackItem[]
): GenreBreakdown[] {
  const weights: Record<string, number> = {};

  picks.forEach((pick) => {
    if (!pick.track) return;
    const label = MOOD_LABELS[pick.track.audio.mood];
    weights[label] = (weights[label] || 0) + pick.weight;
  });

  return toBreakdown(weights);
}
