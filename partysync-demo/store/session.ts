import { create } from 'zustand';
import { SessionPhase, RoundResult, RoundReaction, Feedback } from '@/types';
import { BATTLE_CONFIG } from '@/lib/battle/battleConfig';
import { saveSessionState, loadSessionState, clearSessionState } from '@/lib/shared/storage';

interface SessionPersistState {
  nickname: string;
  currentRound: number;
  phase: SessionPhase;
  battleLogs: RoundResult[];
  reactionLogs: RoundReaction[];
  feedback: Feedback | null;
}

interface SessionStore extends SessionPersistState {
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
  battleLogs: [],
  reactionLogs: [],
  feedback: null,
};

export const useSessionStore = create<SessionStore>((set, get) => ({
  ...initialState,

  setNickname: (nickname: string) => {
    set({ nickname: nickname.trim() });
    saveSessionState({ ...get(), nickname: nickname.trim() });
  },

  startSession: () => {
    const nextState = {
      phase: 'battle' as SessionPhase,
      currentRound: 1,
    };
    set(nextState);
    saveSessionState({ ...get(), ...nextState });
  },

  setPhase: (phase: SessionPhase) => {
    set({ phase });
    saveSessionState({ ...get(), phase });
  },

  recordRoundResult: (result: RoundResult) => {
    const battleLogs = [
      ...get().battleLogs.filter((b) => b.round !== result.round),
      result,
    ];
    set({ battleLogs, phase: 'nowplaying' });
    saveSessionState({ ...get(), battleLogs, phase: 'nowplaying' });
  },

  recordReaction: (reaction: RoundReaction) => {
    const reactionLogs = [
      ...get().reactionLogs.filter((r) => r.round !== reaction.round),
      reaction,
    ];
    set({ reactionLogs });
    saveSessionState({ ...get(), reactionLogs });
  },

  nextRound: () => {
    const current = get().currentRound;
    if (current < BATTLE_CONFIG.ROUND_TOTAL) {
      const nextRound = current + 1;
      set({ currentRound: nextRound, phase: 'battle' });
      saveSessionState({ ...get(), currentRound: nextRound, phase: 'battle' });
    } else {
      set({ phase: 'result' });
      saveSessionState({ ...get(), phase: 'result' });
    }
  },

  submitFeedback: (rating: number, comment: string) => {
    const feedback: Feedback = {
      rating,
      comment,
      submittedAt: new Date().toISOString(),
    };
    set({ feedback, phase: 'done' });
    saveSessionState({ ...get(), feedback, phase: 'done' });
  },

  resetSession: () => {
    clearSessionState();
    set(initialState);
  },

  restoreFromStorage: () => {
    const saved = loadSessionState<SessionPersistState>();
    if (saved && saved.nickname) {
      set(saved);
    }
  },
}));
