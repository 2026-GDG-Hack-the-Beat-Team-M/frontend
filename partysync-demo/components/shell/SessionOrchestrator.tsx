'use client';

import React, { useEffect } from 'react';
import { useSessionStore } from '@/store/session';
import presets from '@/data/presets.json';
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
    battleLogs,
    reactionLogs,
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

  const currentPreset =
    presets.find((p) => p.round === currentRound) || presets[0];
  const lastBattleResult = battleLogs[battleLogs.length - 1];

  return (
    <div className="w-full min-h-screen bg-bg flex flex-col justify-center items-center font-kr selection:bg-accent selection:text-white">
      <PhaseTransition phaseKey={`${phase}_${currentRound}`}>
        {phase === 'onboarding' && (
          <OnboardingScreen
            onJoin={(name) => {
              setNickname(name);
              startSession();
            }}
          />
        )}

        {phase === 'battle' && (
          <BattleScreen
            preset={currentPreset}
            currentRound={currentRound}
            onBattleEnd={(result) => {
              recordRoundResult(result);
            }}
          />
        )}

        {phase === 'nowplaying' && lastBattleResult && (
          <NowPlayingScreen
            currentRound={currentRound}
            lastRoundResult={lastBattleResult}
            onSaveReaction={(reaction, tags, isLiked) => {
              recordReaction({
                round: currentRound,
                trackId: lastBattleResult.winner.id,
                reaction,
                tags,
                isLiked,
              });
            }}
            onNextRound={nextRound}
          />
        )}

        {phase === 'result' && (
          <TasteResultScreen
            nickname={nickname}
            battleLogs={battleLogs}
            reactionLogs={reactionLogs}
            onSubmitFeedback={submitFeedback}
          />
        )}

        {phase === 'done' && <DoneScreen onRestart={resetSession} />}
      </PhaseTransition>
    </div>
  );
}
