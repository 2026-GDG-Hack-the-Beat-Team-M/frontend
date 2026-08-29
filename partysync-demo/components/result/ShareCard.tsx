import React, { useState } from 'react';
import Image from 'next/image';
import { UserTasteSummary } from '@/types';
import { generateShareImage } from '@/lib/result/shareImage';
import { Button } from '@/components/ui/Button';
import { Sheet } from '@/components/ui/Sheet';

interface ShareCardProps {
  summary: UserTasteSummary;
}

export function ShareCard({ summary }: ShareCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPreview = async () => {
    setIsGenerating(true);
    try {
      const dataUrl = await generateShareImage(summary);
      if (dataUrl) {
        setPreviewUrl(dataUrl);
        setIsModalOpen(true);
      }
    } catch {
      // Ignore generation error
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!previewUrl) return;

    try {
      const blob = await (await fetch(previewUrl)).blob();
      const file = new File([blob], `PartySync_${summary.nickname}.png`, {
        type: 'image/png',
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'PartySync 취향 리캡',
          text: `내 파티 취향은 [${summary.primaryBadge.label}]! #PartySync #GDG`,
        });
      } else {
        handleDownload();
      }
    } catch {
      handleDownload();
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = `PartySync_${summary.nickname}_Recap.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full space-y-2">
      <Button
        variant="primary"
        size="lg"
        isFullWidth
        onClick={handleOpenPreview}
        disabled={isGenerating}
      >
        {isGenerating ? '카드 생성 중... ⏳' : '📲 취향 결과 카드 생성 & 공유'}
      </Button>

      {/* 9:16 Preview Modal Sheet */}
      <Sheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="✨ 9:16 인스타그램 스토리 카드"
      >
        <div className="flex flex-col items-center space-y-4 py-2">
          {previewUrl && (
            <div className="relative w-[240px] h-[426px] rounded-2xl overflow-hidden border-2 border-accent/40 shadow-glow-accent">
              <Image
                src={previewUrl}
                alt="PartySync Recap Preview"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          )}

          <div className="w-full space-y-2 pt-2">
            <Button
              variant="primary"
              size="md"
              isFullWidth
              onClick={handleShare}
            >
              📲 SNS 공유하기 / 저장하기
            </Button>
            <Button
              variant="secondary"
              size="md"
              isFullWidth
              onClick={handleDownload}
            >
              💾 이미지 파일 바로 다운로드
            </Button>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
