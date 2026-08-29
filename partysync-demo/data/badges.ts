import { Badge } from '@/types';

export const WIN_RATE_BADGES: Record<number, Badge> = {
  3: {
    id: 'dj_telepathy',
    category: 2,
    emoji: '🔮',
    label: 'DJ 텔레파시',
    caption: '3전 3승 · 플로어 지배자',
    description: 'DJ의 뇌와 완벽 동기화! 내가 탭하는 모든 곡이 승리했습니다.',
  },
  2: {
    id: 'good_listener',
    category: 2,
    emoji: '🎧',
    label: '굿 리스너',
    caption: '2전 1패 · 트렌드 리더',
    description: '대중성과 힙함을 두루 갖춘 균형 잡힌 안목의 소유자입니다.',
  },
  1: {
    id: 'casting_voter',
    category: 2,
    emoji: '⚖️',
    label: '승부의 신 (캐스팅보터)',
    caption: '1전 2패 · 결정적 한 방',
    description: '결정적인 순간마다 판을 뒤흔들며 드라마를 만들어냈습니다.',
  },
  0: {
    id: 'minor_taste',
    category: 2,
    emoji: '🥀',
    label: '고독한 마이너 취향',
    caption: '0전 3패 · 확고한 힙스터',
    description: '모두가 우회전할 때 좌회전하는 나만의 독보적인 음악 세계!',
  },
};

export const GENRE_BADGES: Record<string, Badge> = {
  테크노: {
    id: 'techno_express',
    category: 1,
    emoji: '⚡',
    label: '150 BPM 테크노 폭주기관차',
    caption: '묵직한 비트 중독',
    description: '빠르고 거친 기계음 속에서 진정한 도파민을 느낍니다.',
  },
  하우스: {
    id: 'house_groove',
    category: 1,
    emoji: '🏠',
    label: '하우스 그루브 마스터',
    caption: '물 흐르는 그루브',
    description: '세련된 하우스 리듬에 몸을 맡기는 플로어의 신사숙녀.',
  },
  '2000s': {
    id: 'retro_2000s',
    category: 1,
    emoji: '📼',
    label: '2000s 추억의 감성러',
    caption: '싸이월드 감성 소환',
    description: '도토리 굽던 그 시절의 멜로디를 가슴에 품고 살아갑니다.',
  },
  'K-POP': {
    id: 'kpop_master',
    category: 1,
    emoji: '🐰',
    label: 'K-POP 씹어먹은 덕후',
    caption: '모든 안무와 가사 숙지',
    description: '도입부 0.5초만 듣고도 킬링파트를 따라부르는 능력자.',
  },
  싱어롱: {
    id: 'singalong_vocal',
    category: 1,
    emoji: '🎙️',
    label: '떼창 전문 보컬리스트',
    caption: '목청 터지는 하모니',
    description: '음악은 함께 목청껏 부를 때 완성된다고 믿는 참여형 리스너.',
  },
  헤드뱅잉: {
    id: 'headbanger',
    category: 1,
    emoji: '🤯',
    label: '베이스 중독 헤드뱅어',
    caption: '고막 강타 베이스',
    description: '가슴을 때리는 서브우퍼 없이는 밤을 보낼 수 없습니다.',
  },
  omnivore: {
    id: 'omnivore_taster',
    category: 1,
    emoji: '🎨',
    label: '잡식성 옴니보어',
    caption: '경계 없는 음악 애호가',
    description: '장르를 가리지 않고 좋은 음악이면 무엇이든 흡수하는 열린 귀!',
  },
};

export const ENGAGEMENT_BADGES = {
  anr_pro: {
    id: 'anr_pro',
    category: 3 as const,
    emoji: '🎧',
    label: '프로 굿 리스너 (A&R 꿈나무)',
    caption: '완벽한 피드백 감별사',
    description: '모든 라운드에서 섬세한 평가와 태그를 남겨 플로어의 질을 높였습니다.',
  },
  tap_machine: {
    id: 'tap_machine',
    category: 3 as const,
    emoji: '🔥',
    label: '연타 머신 (지문 실종)',
    caption: '라운드당 60+ 탭 폭풍',
    description: '초당 3회 이상의 무자비한 연타로 게이지를 밀어붙인 열정맨!',
  },
};

export const FALLBACK_BADGE: Badge = {
  id: 'party_newbie',
  category: 2,
  emoji: '🐣',
  label: '뚝딱거리는 파티 뉴비',
  caption: '탐색 중인 조용한 관찰자',
  description: '아직은 파티 분위기를 조용히 눈으로 담고 있는 신비주의자입니다.',
};
