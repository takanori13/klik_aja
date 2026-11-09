/* Mesin partikel dan confetti ringan berbasis Canvas. */
(() => {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  let pieces = [], raf = 0, active = true, width = 0, height = 0;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const colors = ["#ffd166", "#ff79ad", "#9d8cff", "#7de2d1", "#fff0c2", "#f5a7d0"];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = width * dpr; canvas.height = height * dpr;
    canvas.style.width = width + "px"; canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function frame() {
    raf = 0;
    if (!active || document.hidden) return;
    ctx.clearRect(0, 0, width, height);
    pieces = pieces.filter(p => p.y < height + 30 && p.life > 0);
    for (const p of pieces) {
      p.x += p.vx; p.y += p.vy; p.vy += .045; p.rotation += p.spin; p.life--;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
      ctx.globalAlpha = Math.min(1, p.life / 35);
      ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
    }
    if (pieces.length) raf = requestAnimationFrame(frame);
  }
  function burst(x = width / 2, y = height / 2, amount = 120) {
    if (reduced) amount = Math.min(amount, 24);
    for (let i = 0; i < amount; i++) {
      const angle = Math.random() * Math.PI * 2, speed = 2 + Math.random() * 7;
      pieces.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 3,
        w: 4 + Math.random() * 6, h: 5 + Math.random() * 8, rotation: Math.random() * 6,
        spin: (Math.random() - .5) * .2, color: colors[Math.floor(Math.random() * colors.length)], life: 90 + Math.random() * 70 });
    }
    if (!raf && active && !document.hidden) raf = requestAnimationFrame(frame);
  }
  function rain() {
    for (let i = 0; i < 3; i++) setTimeout(() => burst(Math.random() * width, -10, 45), i * 180);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && raf) { cancelAnimationFrame(raf); raf = 0; }
    else if (!document.hidden && pieces.length && !raf) raf = requestAnimationFrame(frame);
  });
  window.addEventListener("resize", resize, { passive: true });
  resize();
  window.BirthdayConfetti = { burst, rain, clear() { pieces = []; ctx.clearRect(0, 0, width, height); } };
})();
