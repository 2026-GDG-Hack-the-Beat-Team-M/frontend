import { Track } from '@/types';

/**
 * 데모 후보곡 풀 — 총 10곡.
 * artwork_url은 실제 앨범 커버(외부 URL), artwork_fallback은 로드 실패 시 쓰는 로컬 SVG.
 * 3라운드 배틀에서 이 중 6곡이 매치업으로 뽑히고,
 * 사용자는 라운드마다 1곡씩 총 3곡을 선택한다.
 * 선택된 3곡만이 최종 취향 분석의 입력이 된다.
 */
export const TRACK_LIST: Record<string, Track> = {
  olivia_dean: {
    id: 'olivia_dean',
    title: 'Man I Need',
    artist: 'Olivia Dean',
    artwork_url: 'https://assets.crownnote.com/s3fs-public/2025-09/Man%20I%20Need.jpg',
    artwork_fallback: '/artwork/olivia_dean.svg',
    primary_genre: 'R&B',
    genre_tags: ['R&B', '소울', '팝'],
    audio: { energy: 0.52, danceability: 0.66, emotion: 0.72, bpm: 102, mood: 'groovy' },
    basePositivity: 0.76,
  },
  ed_sheeran: {
    id: 'ed_sheeran',
    title: 'Photograph',
    artist: 'Ed Sheeran',
    artwork_url: 'https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/65/fb/84/65fb8432-f539-d67d-0670-b1358d16e5af/contsched.zkbwdtfj.jpg/600x600bb.jpg',
    artwork_fallback: '/artwork/ed_sheeran.svg',
    primary_genre: '싱어롱',
    genre_tags: ['어쿠스틱', '팝', '싱어롱'],
    audio: { energy: 0.34, danceability: 0.41, emotion: 0.94, bpm: 108, mood: 'emotional' },
    basePositivity: 0.78,
  },
  rescene: {
    id: 'rescene',
    title: 'Love Attack',
    artist: '리센느 (RESCENE)',
    artwork_url: 'https://i1.sndcdn.com/artworks-9a8zTyDwYnaHJuRh-jxyx4A-t1080x1080.jpg',
    artwork_fallback: '/artwork/rescene.svg',
    primary_genre: 'K-POP',
    genre_tags: ['K-POP', '댄스', '아이돌'],
    audio: { energy: 0.86, danceability: 0.88, emotion: 0.38, bpm: 128, mood: 'hype' },
    basePositivity: 0.74,
  },
  young_k: {
    id: 'young_k',
    title: 'Shut The Door',
    artist: 'YOUNG K',
    artwork_url: 'https://pimg.mk.co.kr/news/cms/202309/07/news-p.v1.20230907.9025df8fdb38463587d52f6947496d1c.jpg',
    artwork_fallback: '/artwork/young_k.svg',
    primary_genre: 'K-POP',
    genre_tags: ['K-POP', '밴드', '락'],
    audio: { energy: 0.78, danceability: 0.6, emotion: 0.68, bpm: 132, mood: 'hype' },
    basePositivity: 0.72,
  },
  dj_khaled: {
    id: 'dj_khaled',
    title: 'All I Do Is Win',
    artist: 'DJ Khaled (feat. T-Pain, Ludacris, Snoop Dogg, Rick Ross)',
    artwork_url: 'https://static.wixstatic.com/media/93eb5f_4a7f0b6373b245f1975ca07e7e712714~mv2.jpg/v1/fill/w_1000,h_1000,al_c,q_85/93eb5f_4a7f0b6373b245f1975ca07e7e712714~mv2.jpg',
    artwork_fallback: '/artwork/dj_khaled.svg',
    primary_genre: '외힙',
    genre_tags: ['외힙', '힙합', '앤섬'],
    audio: { energy: 0.92, danceability: 0.79, emotion: 0.24, bpm: 152, mood: 'hype' },
    basePositivity: 0.8,
  },
  ariana_grande: {
    id: 'ariana_grande',
    title: 'Break Free',
    artist: 'Ariana Grande (feat. Zedd)',
    artwork_url: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3d/7b/39/3d7b392e-38c4-bc3c-6a12-a7acd21fcc3c/24UMGIM88680.rgb.jpg/600x600bf-60.jpg',
    artwork_fallback: '/artwork/ariana_grande.svg',
    primary_genre: 'EDM',
    genre_tags: ['EDM', '팝', '페스티벌'],
    audio: { energy: 0.94, danceability: 0.85, emotion: 0.35, bpm: 130, mood: 'hype' },
    basePositivity: 0.75,
  },
  newjeans: {
    id: 'newjeans',
    title: 'How Sweet',
    artist: 'NewJeans',
    artwork_url: 'https://assets.crownnote.com/s3fs-public/2024-04/nujeansd.png',
    artwork_fallback: '/artwork/newjeans.svg',
    primary_genre: 'K-POP',
    genre_tags: ['K-POP', '이지리스닝', '뉴트로'],
    audio: { energy: 0.68, danceability: 0.9, emotion: 0.42, bpm: 120, mood: 'groovy' },
    basePositivity: 0.82,
  },
  urban_zakapa: {
    id: 'urban_zakapa',
    title: '목요일 밤',
    artist: '어반자카파 (feat. 빈지노)',
    artwork_url: 'https://www.kpopn.com/upload/old-post-images/2016/08/160822urbanzakapanbeenzino.jpg',
    artwork_fallback: '/artwork/urban_zakapa.svg',
    primary_genre: 'R&B',
    genre_tags: ['R&B', '시티팝', '감성'],
    audio: { energy: 0.44, danceability: 0.62, emotion: 0.86, bpm: 96, mood: 'chill' },
    basePositivity: 0.75,
  },
  jazzyfact: {
    id: 'jazzyfact',
    title: '아까워',
    artist: '재지팩트 (Jazzyfact)',
    artwork_url: 'https://i.ytimg.com/vi/ppudgIu2TaM/maxresdefault.jpg',
    artwork_fallback: '/artwork/jazzyfact.svg',
    primary_genre: '국힙',
    genre_tags: ['국힙', '재즈힙합', '붐뱁'],
    audio: { energy: 0.5, danceability: 0.72, emotion: 0.66, bpm: 92, mood: 'groovy' },
    basePositivity: 0.78,
  },
  epik_high: {
    id: 'epik_high',
    title: '우산',
    artist: '에픽하이 (feat. 윤하)',
    artwork_url: 'https://i.scdn.co/image/ab67616d0000b27338e8263b51bec04b91143b76',
    artwork_fallback: '/artwork/epik_high.svg',
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
