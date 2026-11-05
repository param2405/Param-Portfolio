import { useEffect, useRef, useState } from 'react';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01';

// Text that "decodes" into its new value whenever it changes.
export function useScramble(text, duration = 700) {
  const [out, setOut] = useState(text);
  const prev = useRef(text);

  useEffect(() => {
    if (prev.current === text) return undefined;
    const from = prev.current;
    prev.current = text;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text);
      return undefined;
    }
    const len = Math.max(from.length, text.length);
    const start = performance.now();
    let raf;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      let s = '';
      for (let i = 0; i < len; i++) {
        const settle = i / len;
        if (t > settle * 0.7 + 0.3) s += text[i] || '';
        else if (t > settle * 0.7) s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        else s += from[i] || '';
      }
      setOut(s);
      if (t < 1) raf = requestAnimationFrame(step);
      else setOut(text);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, duration]);

  return out;
}

// Adds `is-in` to elements with [data-reveal] as they scroll into view.
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Count up to a number-ish string like "99.44%" or "Top 20" when visible.
export function useCountUp(value, active) {
  const match = /^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/.exec(value);
  const [shown, setShown] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!match || !active) return undefined;
    const [, pre, num, post] = match;
    const target = parseFloat(num);
    const decimals = (num.split('.')[1] || '').length;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(value);
      return undefined;
    }
    const start = performance.now();
    let raf;
    const step = (now) => {
      const t = Math.min(1, (now - start) / 1200);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(`${pre}${(target * eased).toFixed(decimals)}${post}`);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, active]);

  return match ? shown : value;
}

export function useInView(ref, margin = '0px') {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return inView;
}
