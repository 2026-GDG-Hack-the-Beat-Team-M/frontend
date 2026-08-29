import { UserTasteSummary } from '@/types';

export async function generateShareImage(
  summary: UserTasteSummary
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
  bgGrad.addColorStop(0, '#090712');
  bgGrad.addColorStop(0.35, '#171128');
  bgGrad.addColorStop(0.7, '#100C1C');
  bgGrad.addColorStop(1, '#06050A');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1920);

  // 2. Ambient Neon Glow Orbs
  const glowTop = ctx.createRadialGradient(240, 260, 20, 240, 260, 480);
  glowTop.addColorStop(0, 'rgba(255, 45, 149, 0.35)');
  glowTop.addColorStop(0.8, 'rgba(255, 45, 149, 0.05)');
  glowTop.addColorStop(1, 'rgba(255, 45, 149, 0)');
  ctx.fillStyle = glowTop;
  ctx.fillRect(0, 0, 1080, 800);

  const glowBottom = ctx.createRadialGradient(880, 1450, 20, 880, 1450, 450);
  glowBottom.addColorStop(0, 'rgba(0, 240, 255, 0.25)');
  glowBottom.addColorStop(0.8, 'rgba(0, 240, 255, 0.04)');
  glowBottom.addColorStop(1, 'rgba(0, 240, 255, 0)');
  ctx.fillStyle = glowBottom;
  ctx.fillRect(0, 900, 1080, 1020);

  // Helper function for rounded rects
  const drawCard = (
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    fill: string,
    stroke?: string,
    lineWidth: number = 1.5
  ) => {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  };

  // 3. Top Header Pill
  drawCard(70, 70, 360, 52, 26, 'rgba(255, 45, 149, 0.15)', 'rgba(255, 45, 149, 0.4)', 2);
  ctx.fillStyle = '#FF2D95';
  ctx.font = 'bold 22px "Space Grotesk", sans-serif';
  ctx.fillText('PARTYSYNC // TASTE RECAP', 95, 104);

  ctx.fillStyle = '#847E96';
  ctx.font = '22px "Pretendard", sans-serif';
  ctx.fillText(new Date().toLocaleDateString('ko-KR'), 860, 104);

  // 4. Nickname & Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 54px "Pretendard", sans-serif';
  ctx.fillText(`${summary.nickname} 님의 파티 취향`, 70, 185);

  ctx.fillStyle = '#847E96';
  ctx.font = '24px "Pretendard", sans-serif';
  ctx.fillText(
    `배틀에서 직접 고른 ${summary.profile.analyzedTracks.length}곡으로 만든 취향 결과`,
    70,
    225
  );

  // 5. Main Primary Badge Card
  drawCard(
    70,
    260,
    940,
    300,
    32,
    'rgba(26, 20, 38, 0.85)',
    'rgba(255, 45, 149, 0.5)',
    2.5
  );

  // Large Badge Emoji
  ctx.font = '84px sans-serif';
  ctx.fillText(summary.primaryBadge.emoji, 110, 390);

  // Badge Category Pill
  ctx.fillStyle = '#FF74B8';
  ctx.font = 'bold 20px "Space Grotesk", sans-serif';
  ctx.fillText('REPRESENTATIVE PERSONA', 230, 325);

  // Badge Name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 42px "Pretendard", sans-serif';
  ctx.fillText(summary.primaryBadge.label, 230, 375);

  // Caption
  ctx.fillStyle = '#FF74B8';
  ctx.font = 'bold 24px "Pretendard", sans-serif';
  ctx.fillText(`"${summary.primaryBadge.caption}"`, 230, 420);

  // Description
  ctx.fillStyle = '#CFC7DE';
  ctx.font = '22px "Pretendard", sans-serif';
  ctx.fillText(summary.primaryBadge.description, 110, 490);

  ctx.fillStyle = '#847E96';
  ctx.font = '20px "Space Grotesk", sans-serif';
  ctx.fillText(
    `전적: ${summary.totalWins}승 ${summary.totalLosses}패 · 총 ${summary.totalTaps}회 연타 탭`,
    110,
    528
  );

  // 6. My 3 Selected Tracks Section ("내가 선택한 3곡")
  ctx.fillStyle = '#F6F4FA';
  ctx.font = 'bold 30px "Pretendard", sans-serif';
  ctx.fillText(
    `내가 픽한 ${summary.profile.analyzedTracks.length}곡 & 배틀 결과`,
    70,
    610
  );

  const ellipsis = (text: string, max: number) =>
    text.length > max ? `${text.slice(0, max - 2)}...` : text;

  let trackY = 635;
  summary.selectedTracks.forEach((st) => {
    drawCard(
      70,
      trackY,
      940,
      105,
      20,
      'rgba(255, 255, 255, 0.04)',
      st.track && st.didIWin ? 'rgba(56, 239, 125, 0.3)' : 'rgba(255, 255, 255, 0.08)',
      1.5
    );

    // Round Pill
    drawCard(95, trackY + 25, 75, 55, 14, 'rgba(255, 255, 255, 0.08)');
    ctx.fillStyle = '#00F0FF';
    ctx.font = 'bold 24px "Space Grotesk", sans-serif';
    ctx.fillText(`R${st.round}`, 115, trackY + 60);

    if (!st.track) {
      ctx.fillStyle = '#847E96';
      ctx.font = 'bold 26px "Pretendard", sans-serif';
      ctx.fillText('선택 없음 · 분석 제외', 190, trackY + 62);
      trackY += 120;
      return;
    }

    // Track Title & Artist
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px "Pretendard", sans-serif';
    ctx.fillText(ellipsis(st.track.title, 22), 190, trackY + 48);

    ctx.fillStyle = '#847E96';
    ctx.font = '20px "Pretendard", sans-serif';
    ctx.fillText(
      ellipsis(`${st.track.artist} · #${st.track.genre_tags.join(' #')}`, 46),
      190,
      trackY + 80
    );

    // Win/Loss Badge
    if (st.didIWin) {
      drawCard(860, trackY + 30, 125, 45, 12, 'rgba(56, 239, 125, 0.2)', '#38EF7D', 1.5);
      ctx.fillStyle = '#38EF7D';
      ctx.font = 'bold 20px "Pretendard", sans-serif';
      ctx.fillText('WINNER ✅', 875, trackY + 60);
    } else {
      drawCard(860, trackY + 30, 125, 45, 12, 'rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.2)', 1.5);
      ctx.fillStyle = '#847E96';
      ctx.font = 'bold 20px "Pretendard", sans-serif';
      ctx.fillText('LOSE ❌', 890, trackY + 60);
    }

    trackY += 120;
  });

  // 7. Taste Headline (선택 3곡 조합 결과)
  drawCard(70, 1000, 940, 92, 22, 'rgba(0, 240, 255, 0.08)', 'rgba(0, 240, 255, 0.3)', 2);
  ctx.fillStyle = '#00F0FF';
  ctx.font = 'bold 20px "Space Grotesk", sans-serif';
  ctx.fillText('TASTE PROFILE', 105, 1035);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 32px "Pretendard", sans-serif';
  ctx.fillText(summary.profile.headline, 105, 1075);

  // 8. Secondary Badges (Genre DNA + Tension)
  ctx.fillStyle = '#F6F4FA';
  ctx.font = 'bold 30px "Pretendard", sans-serif';
  ctx.fillText('보조 취향 성향 & 텐션 뱃지', 70, 1140);

  let secY = 1165;
  summary.secondaryBadges.forEach((badge) => {
    drawCard(
      70,
      secY,
      940,
      95,
      20,
      'rgba(255, 255, 255, 0.04)',
      'rgba(255, 255, 255, 0.1)',
      1.5
    );

    ctx.font = '42px sans-serif';
    ctx.fillText(badge.emoji, 105, secY + 62);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px "Pretendard", sans-serif';
    ctx.fillText(badge.label, 175, secY + 45);

    ctx.fillStyle = '#847E96';
    ctx.font = '20px "Pretendard", sans-serif';
    ctx.fillText(badge.caption, 175, secY + 75);

    secY += 115;
  });

  // 9. Genre Distribution Section with Donut (내가 고른 곡 기준)
  const genreY = 1400;
  drawCard(70, genreY, 940, 215, 28, 'rgba(255, 255, 255, 0.03)', 'rgba(255, 255, 255, 0.08)', 1.5);

  ctx.fillStyle = '#00F0FF';
  ctx.font = 'bold 22px "Space Grotesk", sans-serif';
  ctx.fillText('GENRE DISTRIBUTION · MY PICKS ONLY', 105, genreY + 42);

  // Draw 2D Donut Chart
  const donutCenterX = 210;
  const donutCenterY = genreY + 128;
  const outerR = 60;
  const innerR = 40;
  const genreColors = ['#FF2D95', '#00F0FF', '#9D4EDD', '#FFD600', '#38EF7D'];
  let currentAngle = -0.5 * Math.PI;

  summary.genreDistribution.forEach((item, idx) => {
    const sliceAngle = (item.percentage / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(donutCenterX, donutCenterY, outerR, currentAngle, currentAngle + sliceAngle);
    ctx.arc(donutCenterX, donutCenterY, innerR, currentAngle + sliceAngle, currentAngle, true);
    ctx.closePath();
    ctx.fillStyle = genreColors[idx % genreColors.length];
    ctx.fill();
    currentAngle += sliceAngle;
  });

  // Donut Center Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 20px "Pretendard", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(summary.genreDistribution[0]?.genre || '음악', donutCenterX, donutCenterY + 7);
  ctx.textAlign = 'left';

  // Genre Legend
  let legendX = 350;
  let legendY = genreY + 90;
  summary.genreDistribution.slice(0, 4).forEach((item, idx) => {
    drawCard(legendX, legendY - 14, 16, 16, 4, genreColors[idx % genreColors.length]);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px "Pretendard", sans-serif';
    ctx.fillText(`${item.genre}`, legendX + 28, legendY);

    ctx.fillStyle = '#847E96';
    ctx.font = 'bold 20px "Space Grotesk", sans-serif';
    ctx.fillText(`${item.percentage}%`, legendX + 160, legendY);

    legendY += 36;
  });

  // 10. Stats Summary Row
  const statBoxY = 1640;
  drawCard(70, statBoxY, 455, 140, 24, 'rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.08)');
  ctx.fillStyle = '#847E96';
  ctx.font = '20px "Pretendard", sans-serif';
  ctx.fillText('총 연타 횟수', 105, statBoxY + 45);
  ctx.fillStyle = '#FF2D95';
  ctx.font = 'bold 44px "Space Grotesk", sans-serif';
  ctx.fillText(`${summary.totalTaps} TAPS`, 105, statBoxY + 105);

  drawCard(555, statBoxY, 455, 140, 24, 'rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.08)');
  ctx.fillStyle = '#847E96';
  ctx.font = '20px "Pretendard", sans-serif';
  ctx.fillText('나의 최애 드랍곡', 590, statBoxY + 45);
  ctx.fillStyle = '#00F0FF';
  ctx.font = 'bold 24px "Pretendard", sans-serif';
  const favTitle = summary.favoriteDrop
    ? summary.favoriteDrop.title.length > 14
      ? summary.favoriteDrop.title.slice(0, 13) + '...'
      : summary.favoriteDrop.title
    : '선곡 없음';
  ctx.fillText(`🔥 ${favTitle}`, 590, statBoxY + 100);

  // 11. Footer Branding
  ctx.fillStyle = '#847E96';
  ctx.font = 'bold 22px "Space Grotesk", sans-serif';
  ctx.fillText('PARTY LIKE NEVER BEFORE • PARTYSYNC 2026', 70, 1800);

  ctx.fillStyle = '#555067';
  ctx.font = '18px "Pretendard", sans-serif';
  ctx.fillText('GDG Hack the Beat Team M // Phase 0 Demo', 70, 1835);

  return canvas.toDataURL('image/png');
}
