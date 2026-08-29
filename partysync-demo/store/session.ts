import { create } from 'zustand';
import {
  BattlePreset,
  Feedback,
  RoundReaction,
  RoundResult,
  SessionPhase,
} from '@/types';
import { BATTLE_CONFIG } from '@/lib/battle/battleConfig';
import { buildMatchups } from '@/data/matchups';
import {
  saveSessionState,
  loadSessionState,
  clearSessionState,
} from '@/lib/shared/storage';

interface SessionPersistState {
  nickname: string;
  currentRound: number;
  phase: SessionPhase;
  /** 이번 세션의 라운드별 매치업. 10곡 풀에서 세션 시작 시 1회만 뽑는다. */
  matchups: BattlePreset[];
  battleLogs: RoundResult[];
  reactionLogs: RoundReaction[];
  feedback: Feedback | null;
}

interface SessionStore extends SessionPersistState {
  /** localStorage 복원이 끝났는지. 복원 전 렌더를 막아 상태 깜빡임을 방지한다. */
  isHydrated: boolean;
  setNickname: (nickname: string) => void;
  startSession: () => void;
  setPhase: (phase: SessionPhase) => void;
  recordRoundResult: (result: RoundResult) => void;
  recordReaction: (reaction: RoundReaction) => void;
  nextRound: () => void;
  submitFeedback: (rating: number, comment: string) => void;
  resetSession: () => void;
  restoreFromStorage: () => void;
}

const initialState: SessionPersistState = {
  nickname: '',
  currentRound: 1,
  phase: 'onboarding',
  matchups: [],
  battleLogs: [],
  reactionLogs: [],
  feedback: null,
};

function persist(state: SessionStore): void {
  const {
    nickname,
    currentRound,
    phase,
    matchups,
    battleLogs,
    reactionLogs,
    feedback,
  } = state;
  saveSessionState<SessionPersistState>({
    nickname,
    currentRound,
    phase,
    matchups,
    battleLogs,
    reactionLogs,
    feedback,
  });
}

export const useSessionStore = create<SessionStore>((set, get) => {
  /** 상태를 갱신하고 곧바로 localStorage에 반영한다. */
  const commit = (patch: Partial<SessionPersistState>) => {
    set(patch);
    persist(get());
  };

  return {
    ...initialState,
    isHydrated: false,

    setNickname: (nickname: string) => commit({ nickname: nickname.trim() }),

    startSession: () =>
      commit({
        phase: 'battle',
        currentRound: 1,
        matchups: buildMatchups(BATTLE_CONFIG.ROUND_TOTAL),
        battleLogs: [],
        reactionLogs: [],
        feedback: null,
      }),

    setPhase: (phase: SessionPhase) => commit({ phase }),

    recordRoundResult: (result: RoundResult) =>
      commit({
        battleLogs: [
          ...get().battleLogs.filter((b) => b.round !== result.round),
          result,
        ].sort((a, b) => a.round - b.round),
        phase: 'nowplaying',
      }),

    recordReaction: (reaction: RoundReaction) =>
      commit({
        reactionLogs: [
          ...get().reactionLogs.filter((r) => r.round !== reaction.round),
          reaction,
        ].sort((a, b) => a.round - b.round),
      }),

    nextRound: () => {
      const current = get().currentRound;
      if (current < BATTLE_CONFIG.ROUND_TOTAL) {
        commit({ currentRound: current + 1, phase: 'battle' });
      } else {
        commit({ phase: 'result' });
      }
    },

    submitFeedback: (rating: number, comment: string) =>
      commit({
        feedback: { rating, comment, submittedAt: new Date().toISOString() },
        phase: 'done',
      }),

    resetSession: () => {
      clearSessionState();
      set({ ...initialState, isHydrated: true });
    },

    restoreFromStorage: () => {
      const saved = loadSessionState<SessionPersistState>();
      // 매치업 없이 저장된 구버전 세션은 버리고 온보딩부터 다시 시작한다.
      if (saved && saved.nickname && saved.matchups?.length) {
        set({ ...saved, isHydrated: true });
      } else {
        set({ isHydrated: true });
      }
    },
  };
});
