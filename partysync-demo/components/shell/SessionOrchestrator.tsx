'use client';

import React, { useEffect } from 'react';
import { useSessionStore } from '@/store/session';
import { OnboardingScreen } from './OnboardingScreen';
import { BattleScreen } from '@/components/battle/BattleScreen';
import { NowPlayingScreen } from '@/components/nowplaying/NowPlayingScreen';
import { TasteResultScreen } from '@/components/result/TasteResultScreen';
import { DoneScreen } from '@/components/result/DoneScreen';
import { PhaseTransition } from './PhaseTransition';

export function SessionOrchestrator() {
  const {
    nickname,
    currentRound,
    phase,
    matchups,
    battleLogs,
    reactionLogs,
    isHydrated,
    setNickname,
    startSession,
    recordRoundResult,
    recordReaction,
    nextRound,
    submitFeedback,
    resetSession,
    restoreFromStorage,
  } = useSessionStore();

  useEffect(() => {
    restoreFromStorage();
  }, [restoreFromStorage]);

  const currentPreset = matchups.find((p) => p.round === currentRound);
  const currentBattleResult = battleLogs.find((b) => b.round === currentRound);

  const handleJoin = (name: string) => {
    setNickname(name);
    startSession();
  };

  // 세션 상태가 깨진 경우(매치업/배틀 로그 유실)에는 온보딩으로 되돌린다.
  const isPlayable =
    phase === 'battle'
      ? !!currentPreset
      : phase === 'nowplaying'
      ? !!currentBattleResult
      : true;
  const resolvedPhase = isPlayable ? phase : 'onboarding';

  return (
    <div className="w-full min-h-screen bg-bg flex flex-col justify-center items-center font-kr selection:bg-accent selection:text-white">
      {!isHydrated ? null : (
        <PhaseTransition phaseKey={`${resolvedPhase}_${currentRound}`}>
          {resolvedPhase === 'onboarding' && (
            <OnboardingScreen onJoin={handleJoin} />
          )}

          {resolvedPhase === 'battle' && currentPreset && (
            <BattleScreen
              // 라운드마다 배틀 상태를 완전히 새로 시작한다
              key={`battle_${currentRound}`}
              preset={currentPreset}
              currentRound={currentRound}
              onBattleEnd={recordRoundResult}
            />
          )}

          {resolvedPhase === 'nowplaying' && currentBattleResult && (
            <NowPlayingScreen
              key={`nowplaying_${currentRound}`}
              currentRound={currentRound}
              lastRoundResult={currentBattleResult}
              onSaveReaction={(reaction, tags, isLiked) => {
                recordReaction({
                  round: currentRound,
                  // 반응 대상은 이 라운드에서 재생 중인 승리곡
                  trackId: currentBattleResult.winner.id,
                  reaction,
                  tags,
                  isLiked,
                });
              }}
              onNextRound={nextRound}
            />
          )}

          {resolvedPhase === 'result' && (
            <TasteResultScreen
              nickname={nickname}
              battleLogs={battleLogs}
              reactionLogs={reactionLogs}
              onSubmitFeedback={submitFeedback}
            />
          )}

          {resolvedPhase === 'done' && <DoneScreen onRestart={resetSession} />}
        </PhaseTransition>
      )}
    </div>
  );
}
