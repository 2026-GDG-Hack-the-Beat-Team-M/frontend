import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { randomChoice } from '@/lib/shared/random';
import { VIRTUAL_NICKNAMES } from '@/data/nicknames';

interface NicknameFormProps {
  initialNickname?: string;
  onSubmit: (nickname: string) => void;
}

const PROFANITY_LIST = ['바보', '멍청이', 'fuck', 'shit', 'admin', '관리자'];

export function NicknameForm({ initialNickname = '', onSubmit }: NicknameFormProps) {
  const [nickname, setNicknameState] = useState(initialNickname);
  const [error, setError] = useState<string | null>(null);

  const handleRandomize = () => {
    const picked = randomChoice(VIRTUAL_NICKNAMES);
    setNicknameState(picked);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nickname.trim();

    if (!trimmed) {
      setError('닉네임을 입력해 주세요.');
      return;
    }

    if (trimmed.length < 2 || trimmed.length > 12) {
      setError('닉네임은 2~12글자로 입력해 주세요.');
      return;
    }

    const hasProfanity = PROFANITY_LIST.some((bad) =>
      trimmed.toLowerCase().includes(bad.toLowerCase())
    );

    if (hasProfanity) {
      setError('사용할 수 없는 단어가 포함되어 있습니다.');
      return;
    }

    setError(null);
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-ink-dim tracking-wider uppercase">
          닉네임 설정
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              setNicknameState(e.target.value);
              setError(null);
            }}
            placeholder="파티에서 불릴 이름"
            maxLength={12}
            className="flex-1 px-4 py-3.5 rounded-2xl bg-surface-1 border border-white/15 text-ink placeholder-ink-muted focus:outline-none focus:border-accent text-base tracking-wide"
          />
          <button
            type="button"
            onClick={handleRandomize}
            className="px-3.5 py-3.5 rounded-2xl bg-surface-2 border border-white/10 text-ink-dim hover:text-ink active:scale-95 transition-all text-sm font-semibold"
            title="랜덤 닉네임 생성"
          >
            🎲
          </button>
        </div>
        {error && <p className="text-xs text-critical font-medium">{error}</p>}
      </div>

      <Button type="submit" variant="primary" size="lg" isFullWidth>
        파티 즉시 합류하기 🔥
      </Button>
    </form>
  );
}
