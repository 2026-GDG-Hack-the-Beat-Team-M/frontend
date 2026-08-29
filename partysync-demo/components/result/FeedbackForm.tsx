import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface FeedbackFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, comment.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 rounded-3xl bg-surface-1 border border-white/10 space-y-4">
      <div className="text-center">
        <h3 className="text-sm font-bold text-ink font-kr">
          파티 인터랙션은 어떠셨나요?
        </h3>
        <p className="text-xs text-ink-dim mt-0.5">
          소중한 피드백으로 더 뜨거운 파티를 만듭니다
        </p>
      </div>

      {/* Star Rating */}
      <div className="flex justify-center gap-2 text-2xl">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="p-1 hover:scale-110 active:scale-95 transition-transform"
          >
            {star <= rating ? '⭐' : '☆'}
          </button>
        ))}
      </div>

      {/* Comment Input */}
      <div className="space-y-1">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="좋았던 점이나 아쉬웠던 점을 300자 이내로 남겨주세요."
          maxLength={300}
          rows={3}
          className="w-full p-3 rounded-2xl bg-surface-2 border border-white/10 text-xs text-ink placeholder-ink-muted focus:outline-none focus:border-accent resize-none font-kr leading-relaxed"
        />
        <div className="text-right text-[10px] text-ink-dim font-en">
          {comment.length} / 300
        </div>
      </div>

      <Button type="submit" variant="secondary" size="md" isFullWidth>
        피드백 제출하기 ✨
      </Button>
    </form>
  );
}
