import { Track } from '@/types';

/**
 * 데모 후보곡 풀 — 총 10곡.
 * 3라운드 배틀에서 이 중 6곡이 매치업으로 뽑히고,
 * 사용자는 라운드마다 1곡씩 총 3곡을 선택한다.
 * 선택된 3곡만이 최종 취향 분석의 입력이 된다.
 */
export const TRACK_LIST: Record<string, Track> = {
  olivia_dean: {
    id: 'olivia_dean',
    title: 'Man I Need',
    artist: 'Olivia Dean',
    artwork_url: '/artwork/olivia_dean.svg',
    primary_genre: 'R&B',
    genre_tags: ['R&B', '소울', '팝'],
    audio: { energy: 0.52, danceability: 0.66, emotion: 0.72, bpm: 102, mood: 'groovy' },
    basePositivity: 0.76,
  },
  ed_sheeran: {
    id: 'ed_sheeran',
    title: 'Photograph',
    artist: 'Ed Sheeran',
    artwork_url: '/artwork/ed_sheeran.svg',
    primary_genre: '싱어롱',
    genre_tags: ['어쿠스틱', '팝', '싱어롱'],
    audio: { energy: 0.34, danceability: 0.41, emotion: 0.94, bpm: 108, mood: 'emotional' },
    basePositivity: 0.78,
  },
  rescene: {
    id: 'rescene',
    title: 'Love Attack',
    artist: '리센느 (RESCENE)',
    artwork_url: '/artwork/rescene.svg',
    primary_genre: 'K-POP',
    genre_tags: ['K-POP', '댄스', '아이돌'],
    audio: { energy: 0.86, danceability: 0.88, emotion: 0.38, bpm: 128, mood: 'hype' },
    basePositivity: 0.74,
  },
  young_k: {
    id: 'young_k',
    title: 'Shut The Door',
    artist: 'YOUNG K',
    artwork_url: '/artwork/young_k.svg',
    primary_genre: 'K-POP',
    genre_tags: ['K-POP', '밴드', '락'],
    audio: { energy: 0.78, danceability: 0.6, emotion: 0.68, bpm: 132, mood: 'hype' },
    basePositivity: 0.72,
  },
  dj_khaled: {
    id: 'dj_khaled',
    title: 'All I Do Is Win',
    artist: 'DJ Khaled (feat. T-Pain, Ludacris, Snoop Dogg, Rick Ross)',
    artwork_url: '/artwork/dj_khaled.svg',
    primary_genre: '외힙',
    genre_tags: ['외힙', '힙합', '앤섬'],
    audio: { energy: 0.92, danceability: 0.79, emotion: 0.24, bpm: 152, mood: 'hype' },
    basePositivity: 0.8,
  },
  ariana_grande: {
    id: 'ariana_grande',
    title: 'Break Free',
    artist: 'Ariana Grande (feat. Zedd)',
    artwork_url: '/artwork/ariana_grande.svg',
    primary_genre: 'EDM',
    genre_tags: ['EDM', '팝', '페스티벌'],
    audio: { energy: 0.94, danceability: 0.85, emotion: 0.35, bpm: 130, mood: 'hype' },
    basePositivity: 0.75,
  },
  newjeans: {
    id: 'newjeans',
    title: 'How Sweet',
    artist: 'NewJeans',
    artwork_url: '/artwork/newjeans.svg',
    primary_genre: 'K-POP',
    genre_tags: ['K-POP', '이지리스닝', '뉴트로'],
    audio: { energy: 0.68, danceability: 0.9, emotion: 0.42, bpm: 120, mood: 'groovy' },
    basePositivity: 0.82,
  },
  urban_zakapa: {
    id: 'urban_zakapa',
    title: '목요일 밤',
    artist: '어반자카파 (feat. 빈지노)',
    artwork_url: '/artwork/urban_zakapa.svg',
    primary_genre: 'R&B',
    genre_tags: ['R&B', '시티팝', '감성'],
    audio: { energy: 0.44, danceability: 0.62, emotion: 0.86, bpm: 96, mood: 'chill' },
    basePositivity: 0.75,
  },
  jazzyfact: {
    id: 'jazzyfact',
    title: '아까워',
    artist: '재지팩트 (Jazzyfact)',
    artwork_url: '/artwork/jazzyfact.svg',
    primary_genre: '국힙',
    genre_tags: ['국힙', '재즈힙합', '붐뱁'],
    audio: { energy: 0.5, danceability: 0.72, emotion: 0.66, bpm: 92, mood: 'groovy' },
    basePositivity: 0.78,
  },
  epik_high: {
    id: 'epik_high',
    title: '우산',
    artist: '에픽하이 (feat. 윤하)',
    artwork_url: '/artwork/epik_high.svg',
    primary_genre: '2000s',
    genre_tags: ['2000s', '국힙', '감성'],
    audio: { energy: 0.38, danceability: 0.48, emotion: 0.96, bpm: 84, mood: 'emotional' },
    basePositivity: 0.85,
  },
};

/** 후보곡 10곡 전체 */
export const ALL_TRACKS: Track[] = Object.values(TRACK_LIST);

export const MOOD_LABELS: Record<Track['audio']['mood'], string> = {
  hype: '하이텐션',
  groovy: '그루비',
  emotional: '감성',
  chill: '칠',
};
