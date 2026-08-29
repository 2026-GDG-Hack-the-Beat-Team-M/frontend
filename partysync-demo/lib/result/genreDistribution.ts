import { RoundResult, RoundReaction, GenreBreakdown } from '@/types';
import presets from '@/data/presets.json';

export function calculateGenreDistribution(
  battleLogs: RoundResult[],
  reactionLogs: RoundReaction[]
): GenreBreakdown[] {
  const genreCounts: Record<string, number> = {};
  let totalCount = 0;

  // 1. Collect genres from supported tracks
  battleLogs.forEach((log) => {
    if (log.myTeam) {
      const preset = presets.find((p) => p.round === log.round);
      if (preset) {
        const myTrack = log.myTeam === 'A' ? preset.trackA : preset.trackB;
        myTrack.genre_tags.forEach((genre) => {
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
          totalCount += 1;
        });
      }
    }
  });

  // 2. Collect genres from Good reaction tracks
  reactionLogs.forEach((rx) => {
    if (rx.reaction === 'good') {
      const preset = presets.find((p) => p.round === rx.round);
      if (preset) {
        const targetTrack =
          preset.trackA.id === rx.trackId ? preset.trackA : preset.trackB;
        targetTrack.genre_tags.forEach((genre) => {
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
          totalCount += 1;
        });
      }
    }
  });

  if (totalCount === 0) {
    return [
      { genre: '하우스', percentage: 40, count: 2 },
      { genre: '테크노', percentage: 35, count: 2 },
      { genre: 'K-POP', percentage: 25, count: 1 },
    ];
  }

  const breakdown: GenreBreakdown[] = Object.entries(genreCounts)
    .map(([genre, count]) => ({
      genre,
      count,
      percentage: Math.round((count / totalCount) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  return breakdown;
}
