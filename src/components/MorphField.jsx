import React, { useEffect, useRef } from 'react';

// One set of 140 particles, two personalities:
//  - "sde": a 20x7 contribution heatmap (squares, commits light up)
//  - "ai":  a 6-layer neural network (circles, signals propagate)
// Changing the `mode` prop morphs every particle's position, shape and colour.

const COLS = 20;
const ROWS = 7;
const N = COLS * ROWS;
const LAYERS = [5, 9, 12, 12, 9, 5];

const PALETTE = {
  sde: [61, 255, 197],
  ai: [160, 139, 255],
  sde2: [160, 139, 255],
  ai2: [255, 122, 217],
};

const lerp = (a, b, t) => a + (b - a) * t;
const mix = (c1, c2, t) => c1.map((v, i) => Math.round(lerp(v, c2[i], t)));
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

function seeded(i) {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export default function MorphField({ mode }) {
  const canvasRef = useRef(null);
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let cell = 10;
    let raf = 0;
    let visible = true;
    let morph = modeRef.current === 'ai' ? 1 : 0;
    const mouse = { x: -9999, y: -9999 };

    // Network layer index for each particle (-1 = ambient dust in AI mode)
    const layerOf = [];
    const layerNodes = LAYERS.map(() => []);
    let k = 0;
    LAYERS.forEach((size, li) => {
      for (let j = 0; j < size; j++) {
        // spread network membership across the grid so the morph looks organic
        layerOf[k] = li;
        layerNodes[li].push(k);
        k++;
      }
    });
    for (; k < N; k++) layerOf[k] = -1;

    // shuffle which grid cell each particle owns
    const gridSlot = Array.from({ length: N }, (_, i) => i).sort((a, b) => seeded(a) - seeded(b));

    const P = Array.from({ length: N }, (_, i) => ({
      x: 0,
      y: 0,
      gx: 0,
      gy: 0,
      nx: 0,
      ny: 0,
      heat: Math.floor(seeded(i + 7) * 5) / 4,
      glow: 0,
      lag: 0.04 + seeded(i + 3) * 0.05,
      phase: seeded(i + 11) * Math.PI * 2,
    }));

    const pulses = [];

    function layout() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cell = Math.min((w * 0.86) / COLS, (h * 0.62) / ROWS);
      const gx0 = (w - cell * COLS) / 2 + cell / 2;
      const gy0 = (h - cell * ROWS) / 2 + cell / 2;

      const netW = Math.min(w * 0.82, 620);
      const netH = Math.min(h * 0.72, 460);
      const nx0 = (w - netW) / 2;
      const ny0 = (h - netH) / 2;

      P.forEach((p, i) => {
        const slot = gridSlot[i];
        p.gx = gx0 + (slot % COLS) * cell;
        p.gy = gy0 + Math.floor(slot / COLS) * cell;
        const li = layerOf[i];
        if (li >= 0) {
          const idx = layerNodes[li].indexOf(i);
          const size = LAYERS[li];
          p.nx = nx0 + (li / (LAYERS.length - 1)) * netW;
          p.ny = ny0 + ((idx + 0.5) / size) * netH;
        } else {
          p.nx = seeded(i + 101) * w;
          p.ny = seeded(i + 202) * h;
        }
        if (!p.x && !p.y) {
          p.x = morph ? p.nx : p.gx;
          p.y = morph ? p.ny : p.gy;
        }
      });
    }

    function spawnPulse() {
      const from = layerNodes[0][Math.floor(Math.random() * layerNodes[0].length)];
      const next = layerNodes[1][Math.floor(Math.random() * layerNodes[1].length)];
      pulses.push({ a: from, b: next, layer: 0, t: 0, speed: 0.025 + Math.random() * 0.02 });
    }

    let frame = 0;
    function tick() {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      frame++;

      const target = modeRef.current === 'ai' ? 1 : 0;
      morph = reduced ? target : lerp(morph, target, 0.045);
      if (Math.abs(morph - target) < 0.001) morph = target;

      const col = mix(PALETTE.sde, PALETTE.ai, morph);
      const col2 = mix(PALETTE.sde2, PALETTE.ai2, morph);

      ctx.clearRect(0, 0, w, h);

      // move particles
      P.forEach((p, i) => {
        const tx = lerp(p.gx, p.nx, morph);
        let ty = lerp(p.gy, p.ny, morph);
        if (layerOf[i] < 0 && morph > 0.5 && !reduced) {
          ty += Math.sin(frame * 0.01 + p.phase) * 8;
        }
        p.x = reduced ? tx : lerp(p.x, tx, p.lag * 2);
        p.y = reduced ? ty : lerp(p.y, ty, p.lag * 2);
        p.glow *= 0.94;
      });

      // network edges
      if (morph > 0.02) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(col, 0.07 * morph);
        ctx.beginPath();
        for (let li = 0; li < LAYERS.length - 1; li++) {
          layerNodes[li].forEach((a) => {
            layerNodes[li + 1].forEach((b) => {
              ctx.moveTo(P[a].x, P[a].y);
              ctx.lineTo(P[b].x, P[b].y);
            });
          });
        }
        ctx.stroke();
      }

      // signals travelling through the network
      if (!reduced && morph > 0.6) {
        if (frame % 7 === 0 && pulses.length < 28) spawnPulse();
        for (let i = pulses.length - 1; i >= 0; i--) {
          const q = pulses[i];
          q.t += q.speed;
          const a = P[q.a];
          const b = P[q.b];
          const x = lerp(a.x, b.x, q.t);
          const y = lerp(a.y, b.y, q.t);
          ctx.strokeStyle = rgba(col2, 0.5 * morph);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(lerp(a.x, b.x, Math.max(0, q.t - 0.18)), lerp(a.y, b.y, Math.max(0, q.t - 0.18)));
          ctx.lineTo(x, y);
          ctx.stroke();
          if (q.t >= 1) {
            P[q.b].glow = 1;
            pulses.splice(i, 1);
            const nl = q.layer + 1;
            if (nl < LAYERS.length - 1) {
              const nodes = layerNodes[nl + 1];
              pulses.push({
                a: q.b,
                b: nodes[Math.floor(Math.random() * nodes.length)],
                layer: nl,
                t: 0,
                speed: q.speed,
              });
            }
          }
        }
      } else if (morph < 0.4) {
        pulses.length = 0;
      }

      // "commits" landing on the heatmap
      if (!reduced && morph < 0.4 && frame % 9 === 0) {
        const p = P[Math.floor(Math.random() * N)];
        p.glow = 1;
        p.heat = Math.min(1, p.heat + 0.25);
      }

      // particles
      const sq = cell * 0.74;
      P.forEach((p, i) => {
        const inNet = layerOf[i] >= 0;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 140);

        const nodeR = inNet ? 4.2 : 1.3;
        const size = lerp(sq, nodeR * 2, morph) * (1 + near * 0.25);
        const radius = lerp(Math.min(3, sq * 0.2), size / 2, morph);

        const gridAlpha = 0.07 + p.heat * 0.55;
        const netAlpha = inNet ? 0.35 : 0.18;
        const alpha = Math.min(1, lerp(gridAlpha, netAlpha, morph) + p.glow * 0.6 + near * 0.5);

        const c = p.glow > 0.3 ? mix(col, col2, p.glow * 0.7) : col;
        ctx.fillStyle = rgba(c, alpha);
        if (p.glow > 0.2) {
          ctx.shadowColor = rgba(c, 0.9);
          ctx.shadowBlur = 16 * p.glow;
        }
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(p.x - size / 2, p.y - size / 2, size, size, radius);
        else ctx.rect(p.x - size / 2, p.y - size / 2, size, size);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // slowly cool down commits
      if (frame % 60 === 0) {
        P.forEach((p) => {
          p.heat = Math.max(0, p.heat - 0.02);
        });
      }
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    const ro = new ResizeObserver(layout);
    ro.observe(canvas.parentElement);
    layout();
    tick();

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="morph-canvas" aria-hidden="true" />;
}
