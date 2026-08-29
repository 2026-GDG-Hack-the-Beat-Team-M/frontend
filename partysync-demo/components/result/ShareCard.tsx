import React, { useState } from 'react';
import { UserTasteSummary } from '@/types';
import { generateShareImage } from '@/lib/result/shareImage';
import { Button } from '@/components/ui/Button';

interface ShareCardProps {
  summary: UserTasteSummary;
}

export function ShareCard({ summary }: ShareCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async () => {
    setIsGenerating(true);
    try {
      const dataUrl = await generateShareImage(summary);
      if (!dataUrl) return;

      // Check if Web Share API with files is supported
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `PartySync_${summary.nickname}.png`, {
        type: 'image/png',
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'PartySync 취향 리캡',
          text: `내 파티 취향은 [${summary.primaryBadge.label}]! #PartySync`,
        });
      } else {
        // Fallback: direct download
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `PartySync_${summary.nickname}.png`;
        a.click();
      }
    } catch {
      // Fallback download if share fails
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        variant="primary"
        size="lg"
        isFullWidth
        onClick={handleShare}
        disabled={isGenerating}
      >
        {isGenerating ? '카드 생성 중... ⏳' : '📲 취향 결과 카드 공유 / 저장'}
      </Button>
    </div>
  );
}
