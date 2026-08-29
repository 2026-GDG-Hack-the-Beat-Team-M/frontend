import {
  MoodKey,
  RoundReaction,
  RoundResult,
  SelectedTrackItem,
  TasteAxis,
  TasteProfile,
  Track,
} from '@/types';
import {
  calculateGenreDistribution,
  calculateMoodDistribution,
} from './genreDistribution';

/**
 * 반응에 따른 가중치.
 * 반응은 "그 라운드에서 재생된 승리곡"에 대한 것이므로,
 * 내가 고른 곡이 이겼을 때(= 반응 대상 == 내 픽)만 가중치에 반영한다.
 */
const REACTION_WEIGHT: Record<string, number> = {
  good: 1.5,
  soso: 1.0,
  bad: 0.6,
};

const LIKE_BONUS = 0.3;

/**
 * 라운드 로그 + 반응 로그 → 사용자가 실제로 선택한 곡 목록.
 * 이 목록이 최종 취향 분석의 단 하나의 입력(source of truth)이다.
 */
export function buildSelectedTracks(
  battleLogs: RoundResult[],
  reactionLogs: RoundReaction[]
): SelectedTrackItem[] {
  return [...battleLogs]
    .sort((a, b) => a.round - b.round)
    .map((log) => {
      const rx = reactionLogs.find((r) => r.round === log.round);
      const myTrack = log.myTrack;

      // 반응 대상은 승리곡이다. 내 픽이 진 라운드의 반응은 내 취향 가중치가 아니다.
      const reactionIsOnMyPick =
        !!myTrack && !!rx?.reaction && rx.trackId === myTrack.id;

      let weight = 1;
      if (reactionIsOnMyPick && rx?.reaction) {
        weight = REACTION_WEIGHT[rx.reaction] ?? 1;
        if (rx.isLiked) weight += LIKE_BONUS;
      }

      const winRatio =
        log.myTeam === 'A' ? log.ratioA : log.myTeam === 'B' ? log.ratioB : 0;

      return {
        round: log.round,
        track: myTrack,
        side: log.myTeam,
        didIWin: log.didIWin,
        myTapCount: log.myTapCount,
        reaction: rx?.reaction ?? null,
        tags: rx?.tags ?? [],
        isLiked: rx?.isLiked ?? false,
        reactionIsOnMyPick,
        winRatio,
        weight: myTrack ? weight : 0,
      };
    });
}

function weightedAverage(
  picks: SelectedTrackItem[],
  pick: (track: Track) => number
): number {
  let weighted = 0;
  let totalWeight = 0;

  picks.forEach((item) => {
    if (!item.track) return;
    weighted += pick(item.track) * item.weight;
    totalWeight += item.weight;
  });

  return totalWeight > 0 ? weighted / totalWeight : 0;
}

/** 문장 안에서 자연스럽게 이어지는 무드 형용사 */
const MOOD_ADJECTIVE: Record<MoodKey, string> = {
  hype: '터질 듯한',
  groovy: '그루비한',
  emotional: '감성적인',
  chill: '나른한',
};

const MOOD_HEADLINE: Record<MoodKey, string> = {
  hype: '플로어를 뒤집는',
  groovy: '리듬에 몸을 맡기는',
  emotional: '가사에 젖어드는',
  chill: '느긋하게 흐르는',
};

const GENRE_HEADLINE: Record<string, string> = {
  'K-POP': 'K-POP 하이텐션러',
  국힙: '국힙 라임 헌터',
  외힙: '외힙 앤섬 메이커',
  EDM: 'EDM 드랍 사냥꾼',
  'R&B': 'R&B 그루브 콜렉터',
  싱어롱: '떼창 지휘자',
  '2000s': '2000s 감성 아카이버',
};

const MIXED_HEADLINE = '장르 넘나드는 옴니보어';

function buildHeadline(
  topMood: MoodKey | null,
  topGenre: string | null,
  topGenreShare: number
): string {
  if (!topMood || !topGenre) return '아직 취향을 고르지 않은 관찰자';

  const moodPart = MOOD_HEADLINE[topMood];
  const genrePart =
    topGenreShare >= 60 ? GENRE_HEADLINE[topGenre] ?? `${topGenre} 러버` : MIXED_HEADLINE;

  return `${moodPart} ${genrePart}`;
}

function buildSummary(
  analyzed: Track[],
  topGenre: string | null,
  topGenreShare: number,
  topMood: MoodKey | null,
  avgBpm: number
): string {
  if (analyzed.length === 0) {
    return '3라운드 동안 곡을 고르지 않아 취향을 분석할 데이터가 없어요. 다시 한 판 어때요?';
  }

  const moodAdjective = topMood ? MOOD_ADJECTIVE[topMood] : '독특한';
  const titles = analyzed.map((t) => `「${t.title}」`).join(', ');
  const genrePart =
    topGenreShare >= 60
      ? `${topGenre} 쪽으로 확실히 기울어 있고`
      : `${topGenre}를 중심으로 여러 장르를 넘나들고`;

  return `${titles} — 이 ${analyzed.length}곡이 당신의 취향을 만들었어요. ${genrePart}, ${moodAdjective} 분위기에 평균 ${Math.round(avgBpm)} BPM을 선호합니다.`;
}

function buildAxes(picks: SelectedTrackItem[], avgBpm: number): TasteAxis[] {
  const energy = weightedAverage(picks, (t) => t.audio.energy);
  const dance = weightedAverage(picks, (t) => t.audio.danceability);
  const emotion = weightedAverage(picks, (t) => t.audio.emotion);
  // 80~160 BPM을 0~100으로 매핑
  const tempo = Math.max(0, Math.min(1, (avgBpm - 80) / 80));

  return [
    {
      key: 'energy',
      label: '에너지',
      value: Math.round(energy * 100),
      caption: energy >= 0.7 ? '터지는 드랍 선호' : energy >= 0.45 ? '적당한 텐션' : '잔잔한 흐름 선호',
    },
    {
      key: 'danceability',
      label: '그루브',
      value: Math.round(dance * 100),
      caption: dance >= 0.7 ? '몸이 먼저 반응' : dance >= 0.5 ? '리듬은 챙기는 편' : '듣는 쪽에 가까움',
    },
    {
      key: 'emotion',
      label: '감성',
      value: Math.round(emotion * 100),
      caption: emotion >= 0.7 ? '가사에 진심' : emotion >= 0.45 ? '분위기도 챙김' : '비트 우선',
    },
    {
      key: 'tempo',
      label: '템포',
      value: Math.round(tempo * 100),
      caption: `평균 ${Math.round(avgBpm)} BPM`,
    },
  ];
}

/**
 * 사용자가 선택한 곡들만으로 취향 프로필을 만든다.
 * 후보 10곡 전체나 승리곡은 여기에 개입하지 않는다.
 */
export function buildTasteProfile(
  battleLogs: RoundResult[],
  reactionLogs: RoundReaction[]
): TasteProfile {
  const picks = buildSelectedTracks(battleLogs, reactionLogs);
  const analyzedTracks = picks
    .map((p) => p.track)
    .filter((t): t is Track => t !== null);

  const genreDistribution = calculateGenreDistribution(picks);
  const moodDistribution = calculateMoodDistribution(picks);

  const topGenre = genreDistribution[0]?.genre ?? null;
  const topGenreShare = genreDistribution[0]?.percentage ?? 0;

  // 최빈 무드는 가중치 합 기준
  const moodWeights: Record<string, number> = {};
  picks.forEach((p) => {
    if (!p.track) return;
    const key = p.track.audio.mood;
    moodWeights[key] = (moodWeights[key] || 0) + p.weight;
  });
  const topMood =
    (Object.entries(moodWeights).sort((a, b) => b[1] - a[1])[0]?.[0] as MoodKey) ??
    null;

  const avgBpm = weightedAverage(picks, (t) => t.audio.bpm);

  return {
    analyzedTracks,
    picks,
    genreDistribution,
    moodDistribution,
    axes: buildAxes(picks, avgBpm),
    topGenre,
    topGenreShare,
    topMood,
    avgBpm,
    headline: buildHeadline(topMood, topGenre, topGenreShare),
    summary: buildSummary(analyzedTracks, topGenre, topGenreShare, topMood, avgBpm),
  };
}
