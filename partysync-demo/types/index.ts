export type BattleSide = 'A' | 'B';

export type ReactionType = 'good' | 'soso' | 'bad';

export type SessionPhase =
  | 'onboarding'
  | 'battle'
  | 'nowplaying'
  | 'result'
  | 'done';

/** 곡의 분위기 축. 취향 프로필 헤드라인 생성의 기준이 된다. */
export type MoodKey = 'hype' | 'groovy' | 'emotional' | 'chill';

/** 취향 분석에 쓰이는 곡의 음악적 특성. 0~1 정규화 값. */
export interface TrackAudioProfile {
  energy: number;
  danceability: number;
  emotion: number;
  bpm: number;
  mood: MoodKey;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  artwork_url: string;
  /** artwork_url 로드 실패 시 사용할 로컬 이미지 */
  artwork_fallback?: string;
  /** 장르 분포 계산의 단위가 되는 대표 장르 (뱃지 매핑 키) */
  primary_genre: string;
  /** 화면 표시용 세부 태그 */
  genre_tags: string[];
  audio: TrackAudioProfile;
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
  /**
   * 사용자가 이 라운드에서 실제로 선택한 곡.
   * 한 번도 탭하지 않았다면 null(기권) — 승리곡으로 대체하지 않는다.
   * 최종 취향 분석의 source of truth.
   */
  myTrack: Track | null;
  myTapCount: number;
  didIWin: boolean;
  scoreA: number;
  scoreB: number;
  ratioA: number;
  ratioB: number;
}

export interface RoundReaction {
  round: number;
  /** 반응 대상 곡 = 그 라운드의 승리곡 (NOW PLAYING에서 재생 중인 곡) */
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

/** 취향 프로필의 4개 특성 축 (0~100) */
export interface TasteAxis {
  key: 'energy' | 'danceability' | 'emotion' | 'tempo';
  label: string;
  value: number;
  caption: string;
}

/** 사용자가 라운드마다 실제로 고른 곡 1개 + 그 라운드의 맥락 */
export interface SelectedTrackItem {
  round: number;
  /** 기권한 라운드는 null */
  track: Track | null;
  side: BattleSide | null;
  didIWin: boolean;
  myTapCount: number;
  /** 그 라운드 NOW PLAYING에서 남긴 반응 */
  reaction: ReactionType | null;
  tags: string[];
  isLiked: boolean;
  /** 반응 대상이 내가 고른 곡과 같은가 (= 내가 이긴 라운드인가) */
  reactionIsOnMyPick: boolean;
  /** 내가 고른 곡이 그 라운드에서 얻은 득표율 (0~1) */
  winRatio: number;
  /** 취향 분석에서 이 곡에 적용된 가중치 */
  weight: number;
}

/** 선택한 곡들만으로 만든 취향 프로필 */
export interface TasteProfile {
  /** 분석에 실제로 사용된 곡 (기권 라운드 제외) */
  analyzedTracks: Track[];
  picks: SelectedTrackItem[];
  genreDistribution: GenreBreakdown[];
  moodDistribution: GenreBreakdown[];
  axes: TasteAxis[];
  topGenre: string | null;
  topGenreShare: number;
  topMood: MoodKey | null;
  avgBpm: number;
  headline: string;
  summary: string;
}

export interface UserTasteSummary {
  nickname: string;
  primaryBadge: Badge;
  secondaryBadges: Badge[];
  profile: TasteProfile;
  genreDistribution: GenreBreakdown[];
  totalWins: number;
  totalLosses: number;
  totalTaps: number;
  totalReactions: number;
  roundHistory: RoundResult[];
  selectedTracks: SelectedTrackItem[];
  favoriteDrop: Track | null;
}

export interface Feedback {
  rating: number;
  comment: string;
  submittedAt: string;
}
