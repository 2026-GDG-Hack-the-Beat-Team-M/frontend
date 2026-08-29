import { Badge } from '@/types';

export const WIN_RATE_BADGES: Record<number, Badge> = {
  3: {
    id: 'dj_telepathy',
    category: 2,
    emoji: '🔮',
    label: 'DJ 텔레파시',
    caption: '3승 0패 · 혹시 DJ랑 미리 짜고 온 거 아니죠? 👑',
    description: '선곡마다 100% 승리! DJ의 뇌와 실시간으로 완벽 동기화되었습니다.',
  },
  2: {
    id: 'good_listener',
    category: 2,
    emoji: '🎧',
    label: '굿 리스너',
    caption: '2승 1패 · 당신의 선택이 곧 오늘의 플레이리스트',
    description: '대중성과 힙함을 두루 갖춘 안목으로 플로어의 분위기를 이끌었습니다.',
  },
  1: {
    id: 'casting_voter',
    category: 2,
    emoji: '⚖️',
    label: '승부의 신 (캐스팅보터)',
    caption: '1승 2패 · 내 1표로 파티의 다음 곡이 뒤집혔다 💥',
    description: '결정적인 순간마다 판을 뒤흔들며 드라마틱한 명승부를 만들어냈습니다.',
  },
  0: {
    id: 'minor_taste',
    category: 2,
    emoji: '🥀',
    label: '고독한 마이너 취향',
    caption: '0승 3패 · 대중이 내 세련된 취향을 못 따라오는 중 🥲',
    description: '모두가 우회전할 때 좌회전하는 나만의 독보적인 힙스터 감성!',
  },
};

export const GENRE_BADGES: Record<string, Badge> = {
  'K-POP': {
    id: 'kpop_lover',
    category: 1,
    emoji: '🐰',
    label: 'K-POP 씹어먹은 덕후',
    caption: '내가 아는 노래 나오면 바로 무대 중앙 장악',
    description: '킬링파트와 댄스 챌린지에 반응하는 강력한 K-POP 비트 본능!',
  },
  국힙: {
    id: 'k_hiphop',
    category: 1,
    emoji: '🇰🇷',
    label: '국힙 전도사',
    caption: '붐뱁과 트랩이 흐르면 고개가 자동으로 꺾임',
    description: '에픽하이, 빈지노, 재지팩트의 묵직한 라임에 가슴이 뛰는 힙합 매니아.',
  },
  외힙: {
    id: 'global_hiphop',
    category: 1,
    emoji: '🗽',
    label: '외힙 외길 인생',
    caption: '영어 가사는 몰라도 추임새와 그루브는 1등',
    description: 'DJ Khaled 스타일의 강렬한 앤섬 비트와 글로벌 그루브를 사랑합니다.',
  },
  EDM: {
    id: 'edm_warrior',
    category: 1,
    emoji: '⚡',
    label: '150 BPM 페스티벌 광전사',
    caption: '심장 박동수보다 빠른 비트만 취급합니다',
    description: 'Ariana Grande & Zedd의 폭발적인 드랍에 몸을 맡기는 플로어의 지배자.',
  },
  '2000s': {
    id: 'retro_2000s',
    category: 1,
    emoji: '📼',
    label: '2000s 추억의 감성러',
    caption: '이 노래 나오면 눈물 흘리며 떼창 가능',
    description: '싸이월드 도토리 감성과 2000년대 명곡의 멜로디를 가슴에 품은 리스너.',
  },
  싱어롱: {
    id: 'singalong_master',
    category: 1,
    emoji: '🎙️',
    label: '떼창 전문 보컬리스트',
    caption: '음악은 함께 목청껏 부를 때 완성된다',
    description: 'Ed Sheeran & Olivia Dean의 감성 보컬에 화음을 얹는 참여형 리스너.',
  },
  'R&B': {
    id: 'rnb_groover',
    category: 1,
    emoji: '🍸',
    label: '심야 R&B 그루버',
    caption: '비트보다 그루브, 볼륨보다 여운',
    description: '올리비아 딘과 어반자카파의 느슨한 그루브에 어깨가 먼저 움직이는 리스너.',
  },
  omnivore: {
    id: 'omnivore_listener',
    category: 1,
    emoji: '🎨',
    label: '잡식성 옴니보어',
    caption: '경계 없는 음악 애호가 · 좋은 음악이면 무엇이든 OK!',
    description: '장르를 편식하지 않고 K-POP, 힙합, 팝, EDM을 고루 즐기는 열린 귀.',
  },
};

export const ENGAGEMENT_BADGES = {
  tap_machine: {
    id: 'tap_machine',
    category: 3 as const,
    emoji: '🔥',
    label: '연타 머신 (지문 실종)',
    caption: '화면이 깨질 때까지 응원하는 열정맨',
    description: '라운드당 폭풍 탭으로 팀의 승리를 위해 손가락에 불을 지폈습니다!',
  },
  anr_pro: {
    id: 'anr_pro',
    category: 3 as const,
    emoji: '🎧',
    label: '프로 굿 리스너 (A&R 꿈나무)',
    caption: '파티에 음악 비평하러 온 진정한 귀명창',
    description: '모든 트랙에 정성 어린 반응과 태그를 남겨 플로어의 퀄리티를 높였습니다.',
  },
};

export const FALLBACK_BADGE: Badge = {
  id: 'party_newbie',
  category: 2,
  emoji: '🐣',
  label: '뚝딱거리는 파티 뉴비',
  caption: '아직 낯가리는 중이지만 속으로는 재밌음',
  description: '조용히 눈으로 파티의 열기를 담아가고 있는 신비주의 관찰자입니다.',
};
