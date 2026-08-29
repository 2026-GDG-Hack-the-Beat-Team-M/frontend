import { RoundResult, RoundReaction, UserTasteSummary, Badge, Track } from '@/types';
import {
  WIN_RATE_BADGES,
  GENRE_BADGES,
  ENGAGEMENT_BADGES,
  FALLBACK_BADGE,
} from '@/data/badges';
import { calculateGenreDistribution } from './genreDistribution';
import presets from '@/data/presets.json';

export function evaluateTasteBadges(
  nickname: string,
  battleLogs: RoundResult[],
  reactionLogs: RoundReaction[]
): UserTasteSummary {
  const totalWins = battleLogs.filter((b) => b.didIWin).length;
  const totalLosses = battleLogs.length - totalWins;
  const totalTaps = battleLogs.reduce((sum, b) => sum + b.myTapCount, 0);
  const totalReactions = reactionLogs.filter((r) => r.reaction !== null).length;

  const genreDistribution = calculateGenreDistribution(battleLogs, reactionLogs);

  // Fallback: 0 taps & 0 reactions
  if (totalTaps === 0 && totalReactions === 0) {
    return {
      nickname: nickname || '파티피플',
      primaryBadge: FALLBACK_BADGE,
      secondaryBadges: [],
      genreDistribution,
      totalWins,
      totalLosses,
      totalTaps,
      totalReactions,
      roundHistory: battleLogs,
      favoriteDrop: null,
    };
  }

  // 1. Primary Win-Rate Badge (Category 2)
  const primaryBadge: Badge = WIN_RATE_BADGES[totalWins] || WIN_RATE_BADGES[1];

  // 2. Secondary Badge 1 - Genre Taste (Category 1)
  const secondaryBadges: Badge[] = [];
  const topGenre = genreDistribution[0];

  if (topGenre && topGenre.percentage >= 60 && GENRE_BADGES[topGenre.genre]) {
    secondaryBadges.push(GENRE_BADGES[topGenre.genre]);
  } else {
    secondaryBadges.push(GENRE_BADGES.omnivore);
  }

  // 3. Secondary Badge 2 - Engagement (Category 3)
  const hasReactedAll = totalReactions >= battleLogs.length;
  const hasTag = reactionLogs.some((r) => r.tags.length > 0);
  const avgTaps = battleLogs.length > 0 ? totalTaps / battleLogs.length : 0;

  if (hasReactedAll && hasTag) {
    secondaryBadges.push(ENGAGEMENT_BADGES.anr_pro);
  } else if (avgTaps >= 60) {
    secondaryBadges.push(ENGAGEMENT_BADGES.tap_machine);
  }

  // 4. Favorite Drop: track that user gave 'good' reaction to and won with highest score
  let favoriteDrop: Track | null = null;
  const goodTrackIds = reactionLogs
    .filter((r) => r.reaction === 'good')
    .map((r) => r.trackId);

  const winningGoodTracks = battleLogs.filter(
    (b) => goodTrackIds.includes(b.winner.id)
  );

  if (winningGoodTracks.length > 0) {
    const highestScoring = winningGoodTracks.reduce((prev, curr) =>
      curr.scoreA + curr.scoreB > prev.scoreA + prev.scoreB ? curr : prev
    );
    favoriteDrop = highestScoring.winner;
  } else if (battleLogs.length > 0) {
    favoriteDrop = battleLogs[0].winner;
  }

  return {
    nickname: nickname || '파티피플',
    primaryBadge,
    secondaryBadges: secondaryBadges.slice(0, 2),
    genreDistribution,
    totalWins,
    totalLosses,
    totalTaps,
    totalReactions,
    roundHistory: battleLogs,
    favoriteDrop,
  };
}
