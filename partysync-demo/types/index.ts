export type BattleSide = 'A' | 'B';

export type ReactionType = 'good' | 'soso' | 'bad';

export type SessionPhase =
  | 'onboarding'
  | 'battle'
  | 'nowplaying'
  | 'result'
  | 'done';

export interface Track {
  id: string;
  title: string;
  artist: string;
  artwork_url: string;
  genre_tags: string[];
  basePositivity: number; // e.g. 0.70 for 70% good bias
}

export interface BattlePreset {
  round: number;
  theme_tag: string;
  theme_title: string;
  trackA: Track;
  trackB: Track;
}

export interface RoundResult {
  round: number;
  winner: Track;
  winnerSide: BattleSide;
  myTeam: BattleSide | null;
  myTapCount: number;
  didIWin: boolean;
  scoreA: number;
  scoreB: number;
  ratioA: number;
  ratioB: number;
}

export interface RoundReaction {
  round: number;
  trackId: string;
  reaction: ReactionType | null;
  tags: string[];
  isLiked: boolean;
}

export type BadgeCategory = 1 | 2 | 3; // 1: Genre, 2: Win-rate, 3: Tension/Participation

export interface Badge {
  id: string;
  category: BadgeCategory;
  emoji: string;
  label: string;
  caption: string;
  description: string;
}

export interface GenreBreakdown {
  genre: string;
  percentage: number;
  count: number;
}

export interface UserTasteSummary {
  nickname: string;
  primaryBadge: Badge;
  secondaryBadges: Badge[];
  genreDistribution: GenreBreakdown[];
  totalWins: number;
  totalLosses: number;
  totalTaps: number;
  totalReactions: number;
  roundHistory: RoundResult[];
  favoriteDrop: Track | null;
}

export interface Feedback {
  rating: number;
  comment: string;
  submittedAt: string;
}
