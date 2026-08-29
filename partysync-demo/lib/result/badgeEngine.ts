import {
  Badge,
  RoundReaction,
  RoundResult,
  SelectedTrackItem,
  Track,
  UserTasteSummary,
} from '@/types';
import {
  WIN_RATE_BADGES,
  GENRE_BADGES,
  ENGAGEMENT_BADGES,
  FALLBACK_BADGE,
} from '@/data/badges';
import { buildTasteProfile } from './tasteProfile';

/** PRD §0.10 ② — 최빈 장르 비중이 이 값 이상이면 장르 뱃지를 부여한다. */
const GENRE_BADGE_THRESHOLD = 60;
/** PRD §0.10 ③ — 배틀당 평균 탭 수 기준 */
const TAP_MACHINE_THRESHOLD = 60;

/**
 * 내가 고른 곡 중 '최애 드랍' 1곡을 고른다.
 * 우선순위: 내 픽에 🔥 반응 → 승리한 픽 → 첫 픽
 * (내가 고르지 않은 곡은 후보가 될 수 없다)
 */
function pickFavoriteDrop(picks: SelectedTrackItem[]): Track | null {
  const owned = picks.filter((p): p is SelectedTrackItem & { track: Track } => p.track !== null);
  if (owned.length === 0) return null;

  const hyped = owned.filter((p) => p.reactionIsOnMyPick && p.reaction === 'good');
  if (hyped.length > 0) {
    // 득표율이 가장 높았던 곡 (PRD §0.10 — 내 최애 드랍)
    return hyped.sort((a, b) => b.winRatio - a.winRatio)[0].track;
  }

  const won = owned.filter((p) => p.didIWin);
  if (won.length > 0) {
    return won.sort((a, b) => b.winRatio - a.winRatio)[0].track;
  }

  return owned[0].track;
}

/**
 * 3라운드 누적 데이터로 뱃지를 판정한다 (PRD §0.10).
 * 장르 판정의 입력은 오직 `battleLogs[].myTrack` — 사용자가 실제로 선택한 곡이다.
 */
export function evaluateTasteBadges(
  nickname: string,
  battleLogs: RoundResult[],
  reactionLogs: RoundReaction[]
): UserTasteSummary {
  const profile = buildTasteProfile(battleLogs, reactionLogs);
  const selectedTracks = profile.picks;

  const totalWins = battleLogs.filter((b) => b.didIWin).length;
  const totalLosses = battleLogs.length - totalWins;
  const totalTaps = battleLogs.reduce((sum, b) => sum + b.myTapCount, 0);
  const totalReactions = reactionLogs.filter((r) => r.reaction !== null).length;

  const base = {
    nickname: nickname || '파티피플',
    profile,
    genreDistribution: profile.genreDistribution,
    totalWins,
    totalLosses,
    totalTaps,
    totalReactions,
    roundHistory: [...battleLogs].sort((a, b) => a.round - b.round),
    selectedTracks,
    favoriteDrop: pickFavoriteDrop(selectedTracks),
  };

  // ④ 폴백 — 3라운드 내내 탭 0회 + 반응 0회
  if (totalTaps === 0 && totalReactions === 0) {
    return { ...base, primaryBadge: FALLBACK_BADGE, secondaryBadges: [] };
  }

  // ① 대표 뱃지 — 승률 (Category 2)
  const primaryBadge: Badge = WIN_RATE_BADGES[totalWins] ?? WIN_RATE_BADGES[0];

  const secondaryBadges: Badge[] = [];

  // ② 보조 뱃지 1 — 음악 취향 (Category 1). 선택한 곡의 장르 분포만 사용.
  const topGenreBadge =
    profile.topGenre && profile.topGenreShare >= GENRE_BADGE_THRESHOLD
      ? GENRE_BADGES[profile.topGenre]
      : undefined;
  secondaryBadges.push(topGenreBadge ?? GENRE_BADGES.omnivore);

  // ③ 보조 뱃지 2 — 텐션 & 참여도 (Category 3)
  const roundsPlayed = battleLogs.length || 1;
  const reactedEveryRound = totalReactions >= roundsPlayed;
  const hasTag = reactionLogs.some((r) => r.tags.length > 0);
  const avgTaps = totalTaps / roundsPlayed;

  if (reactedEveryRound && hasTag) {
    secondaryBadges.push(ENGAGEMENT_BADGES.anr_pro);
  } else if (avgTaps >= TAP_MACHINE_THRESHOLD) {
    secondaryBadges.push(ENGAGEMENT_BADGES.tap_machine);
  }

  return {
    ...base,
    primaryBadge,
    secondaryBadges: secondaryBadges.slice(0, 2),
  };
}
