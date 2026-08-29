import { UserTasteSummary } from '@/types';

export async function generateShareImage(
  summary: UserTasteSummary
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
  bgGrad.addColorStop(0, '#0E0C17');
  bgGrad.addColorStop(0.5, '#1A1429');
  bgGrad.addColorStop(1, '#07060B');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1920);

  // 2. Neon Ambient Glows
  const glow1 = ctx.createRadialGradient(250, 300, 10, 250, 300, 450);
  glow1.addColorStop(0, 'rgba(255, 45, 149, 0.28)');
  glow1.addColorStop(1, 'rgba(255, 45, 149, 0)');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, 1080, 1000);

  const glow2 = ctx.createRadialGradient(850, 1400, 10, 850, 1400, 450);
  glow2.addColorStop(0, 'rgba(0, 240, 255, 0.18)');
  glow2.addColorStop(1, 'rgba(0, 240, 255, 0)');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 800, 1080, 1120);

  // 3. Header & Branding
  ctx.fillStyle = '#FF2D95';
  ctx.font = 'bold 38px Space Grotesk, sans-serif';
  ctx.fillText('PARTYSYNC // RECAP', 90, 140);

  ctx.fillStyle = '#847E96';
  ctx.font = '28px Pretendard, sans-serif';
  ctx.fillText(new Date().toLocaleDateString(), 90, 185);

  // 4. Nickname & Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 64px Pretendard, sans-serif';
  ctx.fillText(`${summary.nickname} 님의 파티 취향`, 90, 290);

  // 5. Main Primary Badge Card
  ctx.fillStyle = 'rgba(26, 23, 36, 0.85)';
  ctx.strokeStyle = 'rgba(255, 45, 149, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(90, 340, 900, 380, 32);
  ctx.fill();
  ctx.stroke();

  // Emoji
  ctx.font = '96px sans-serif';
  ctx.fillText(summary.primaryBadge.emoji, 150, 480);

  // Badge Name
  ctx.fillStyle = '#FF74B8';
  ctx.font = 'bold 44px Pretendard, sans-serif';
  ctx.fillText(summary.primaryBadge.label, 280, 440);

  // Caption
  ctx.fillStyle = '#F6F4FA';
  ctx.font = '32px Pretendard, sans-serif';
  ctx.fillText(summary.primaryBadge.caption, 280, 490);

  // Description
  ctx.fillStyle = '#847E96';
  ctx.font = '26px Pretendard, sans-serif';
  ctx.fillText(summary.primaryBadge.description, 150, 580);
  ctx.fillText(`3라운드 승률: ${summary.totalWins}승 ${summary.totalLosses}패`, 150, 630);

  // 6. Secondary Badges
  ctx.fillStyle = '#F6F4FA';
  ctx.font = 'bold 36px Pretendard, sans-serif';
  ctx.fillText('보조 뱃지 & 성향', 90, 800);

  let badgeY = 850;
  summary.secondaryBadges.forEach((badge) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(90, badgeY, 900, 130, 20);
    ctx.fill();
    ctx.stroke();

    ctx.font = '52px sans-serif';
    ctx.fillText(badge.emoji, 130, badgeY + 85);

    ctx.fillStyle = '#F6F4FA';
    ctx.font = 'bold 32px Pretendard, sans-serif';
    ctx.fillText(badge.label, 210, badgeY + 60);

    ctx.fillStyle = '#847E96';
    ctx.font = '24px Pretendard, sans-serif';
    ctx.fillText(badge.caption, 210, badgeY + 98);

    badgeY += 160;
  });

  // 7. Stats Grid
  const statY = 1200;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.beginPath();
  ctx.roundRect(90, statY, 430, 160, 20);
  ctx.roundRect(560, statY, 430, 160, 20);
  ctx.fill();

  ctx.fillStyle = '#847E96';
  ctx.font = '26px Pretendard, sans-serif';
  ctx.fillText('총 탭 횟수', 130, statY + 60);
  ctx.fillText('승패 전적', 600, statY + 60);

  ctx.fillStyle = '#FF2D95';
  ctx.font = 'bold 48px Space Grotesk, sans-serif';
  ctx.fillText(`${summary.totalTaps} TAPS`, 130, statY + 125);

  ctx.fillStyle = '#00F0FF';
  ctx.font = 'bold 48px Space Grotesk, sans-serif';
  ctx.fillText(`${summary.totalWins}W ${summary.totalLosses}L`, 600, statY + 125);

  // 8. Footer QR & Promo
  ctx.fillStyle = '#847E96';
  ctx.font = '26px Space Grotesk, sans-serif';
  ctx.fillText('CREATED WITH PARTYSYNC // GDG HACK THE BEAT', 90, 1800);

  return canvas.toDataURL('image/png');
}
