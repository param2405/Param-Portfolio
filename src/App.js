import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  profile,
  modes,
  stats,
  about,
  experience,
  projects,
  archive,
  skills,
  skillGroups,
  core,
  achievements,
  education,
} from './data';
import { useScramble, useReveal, useCountUp, useInView } from './hooks';
import MorphField from './components/MorphField';
import ProjectVisual from './components/ProjectVisual';
import CommandPalette from './components/CommandPalette';
import Terminal from './components/Terminal';

function initialMode() {
  try {
    const q = new URLSearchParams(window.location.search).get('mode');
    if (q === 'ai' || q === 'sde') return q;
    const saved = window.localStorage.getItem('pp-mode');
    if (saved === 'ai' || saved === 'sde') return saved;
  } catch (e) {
    /* storage unavailable */
  }
  return 'sde';
}

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ---------------------------------------------------------------- mode switch */

function ModeSwitch({ mode, setMode, compact }) {
  return (
    <div className={`mode-switch ${compact ? 'compact' : ''}`} role="radiogroup" aria-label="Portfolio mode">
      <span className="mode-thumb" data-pos={mode} aria-hidden="true" />
      {['sde', 'ai'].map((m) => (
        <button
          key={m}
          type="button"
          role="radio"
          aria-checked={mode === m}
          className={mode === m ? 'on' : ''}
          onClick={() => setMode(m)}
        >
          <span className="mono">{m === 'sde' ? '</>' : '◉'}</span> {modes[m].label}
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- nav */

function Nav({ mode, setMode, openPalette }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <button type="button" className="logo" onClick={() => scrollTo('top')} aria-label="Back to top">
        <span className="logo-mark">P</span>
        <span className="logo-text mono">param.parikh</span>
      </button>
      <nav className="nav-links" aria-label="Sections">
        {[
          ['work', 'Work'],
          ['experience', 'Experience'],
          ['stack', 'Stack'],
          ['contact', 'Contact'],
        ].map(([id, label]) => (
          <button key={id} type="button" onClick={() => scrollTo(id)}>
            {label}
          </button>
        ))}
      </nav>
      <div className="nav-right">
        <ModeSwitch mode={mode} setMode={setMode} compact />
        <button type="button" className="kbd-btn mono" onClick={openPalette} aria-label="Open command palette">
          ⌘K
        </button>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- hero */

function Stat({ value, label, active }) {
  const shown = useCountUp(value, active);
  return (
    <div className="stat">
      <div className="stat-v">{shown}</div>
      <div className="stat-l mono">{label}</div>
    </div>
  );
}

function Hero({ mode, setMode }) {
  const verb = useScramble(modes[mode].verb);
  const role = useScramble(modes[mode].role);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-field">
        <MorphField mode={mode} />
        <div className="field-caption mono">
          {mode === 'sde' ? 'fig.1 — commits, live' : 'fig.1 — forward pass, live'}
        </div>
      </div>

      <div className="hero-copy">
        <div className="status mono reveal-1">
          <span className="pulse" />
          {modes[mode].status}
        </div>

        <h1 className="hero-name reveal-2">
          <span className="line">Param</span>
          <span className="line italic">Parikh</span>
        </h1>

        <p className="hero-role reveal-3">
          <span className="mono role-tag">{role}</span>
          I engineer <span className="verb">{verb}</span>
          <span className="caret" aria-hidden="true" />
        </p>

        <div className="hero-switch reveal-4">
          <span className="mono switch-hint">view this portfolio as →</span>
          <ModeSwitch mode={mode} setMode={setMode} />
        </div>

        <div className="hero-cta reveal-5">
          <button type="button" className="btn primary" onClick={() => scrollTo('work')}>
            See the work
          </button>
          <a className="btn ghost" href={profile.resume[mode]} target="_blank" rel="noreferrer">
            {modes[mode].label} resume <Arrow />
          </a>
        </div>
      </div>

      <div className="hero-stats reveal-6" key={mode}>
        {stats[mode].map((s) => (
          <Stat key={s.label} {...s} active={ready} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- marquee */

function Marquee({ mode }) {
  const words =
    mode === 'ai'
      ? ['LangGraph', 'RAG', 'PyTorch', 'pgvector', 'XGBoost', 'Whisper', 'FastAPI', 'FAISS', 'Terraform', 'Embeddings']
      : ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'REST APIs', 'PostgreSQL', 'Docker', 'AWS', 'Git'];
  const row = [...words, ...words];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i}>
            {w}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- section head */

function SectionHead({ n, kicker, title, children }) {
  return (
    <div className="section-head" data-reveal>
      <div className="mono sh-kicker">
        <span className="acc">{n}</span> / {kicker}
      </div>
      <h2 className="sh-title">{title}</h2>
      {children && <p className="sh-sub">{children}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------- about */

function About({ mode }) {
  return (
    <section className="section about" id="about">
      <SectionHead n="01" kicker="readme.md" title={<>A builder who ships <em>both</em> sides of the stack.</>} />
      <div className="about-grid">
        <div className="readme" data-reveal>
          <div className="readme-bar mono">
            <span>README.md</span>
            <span className="mute">{modes[mode].label.toLowerCase()} build</span>
          </div>
          <div className="readme-body" key={mode}>
            <p className="mono h"># hello, I&apos;m Param</p>
            {about[mode].map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="edu" data-reveal>
          <div className="mono mute">education</div>
          <div className="edu-school">{education.school}</div>
          <div className="edu-degree">{education.degree}</div>
          <div className="edu-row mono">
            <span>{education.period}</span>
            <span className="acc">CGPA {education.grade}</span>
          </div>
          <div className="mono mute edu-core-l">core</div>
          <div className="edu-core">
            {core.map((c) => (
              <span key={c} className="tag">
                {c}
              </span>
            ))}
          </div>
          <div className="mono mute edu-core-l">based in</div>
          <div className="edu-degree">{profile.location}</div>
        </aside>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- work */

function Metric({ value, label }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const shown = useCountUp(value, inView);
  return (
    <div className="metric" ref={ref}>
      <div className="metric-v">{shown}</div>
      <div className="metric-l">{label}</div>
    </div>
  );
}

function ProjectCard({ p, i, mode }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const match = p.kind.includes(mode);
  return (
    <article
      ref={ref}
      className={`project ${i === 0 ? 'featured' : ''} ${match ? '' : 'off-mode'}`}
      onMouseMove={onMove}
      data-reveal
    >
      <div className="project-info">
        <div className="project-top mono">
          <span className="acc">{String(i + 1).padStart(2, '0')}</span>
          <span>{p.year}</span>
          <span className="kind">{p.kind.map((k) => (k === 'ai' ? 'AI/ML' : 'SOFTWARE')).join(' + ')}</span>
        </div>
        <h3 className="project-name">{p.name}</h3>
        <p className="project-kicker">{p.kicker}</p>
        <div className="metrics">
          {p.metrics.map((m) => (
            <Metric key={m.label} {...m} />
          ))}
        </div>
        <ul className="project-bullets">
          {p.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <div className="tags">
          {p.tech.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div className="project-links">
          {p.live && (
            <a className="btn small primary" href={p.live} target="_blank" rel="noreferrer">
              Live site <Arrow />
            </a>
          )}
          {p.github && (
            <a className="btn small ghost" href={p.github} target="_blank" rel="noreferrer">
              Source <Arrow />
            </a>
          )}
        </div>
      </div>
      <div className="project-visual">
        <ProjectVisual project={p} />
      </div>
    </article>
  );
}

function Work({ mode }) {
  const ordered = useMemo(() => {
    const score = (p) => (p.kind[0] === mode ? 0 : p.kind.includes(mode) ? 1 : 2);
    return [...projects].sort((a, b) => score(a) - score(b));
  }, [mode]);

  return (
    <section className="section" id="work">
      <SectionHead n="02" kicker="selected work" title={<>Projects with <em>numbers</em> attached.</>}>
        Ordered for the {modes[mode].label} view — flip the switch and the most relevant work rises to the top.
      </SectionHead>
      <div className="projects">
        {ordered.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} mode={mode} />
        ))}
      </div>
      <div className="archive" data-reveal>
        <div className="mono mute archive-l">more on github</div>
        {archive.map((a) => (
          <a key={a.name} className="archive-row" href={a.href} target="_blank" rel="noreferrer">
            <span className="ar-name">{a.name}</span>
            <span className="ar-note">{a.note}</span>
            <span className="ar-tech mono">{a.tech}</span>
            <span className="ar-go">
              <Arrow />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- experience */

function Experience({ mode }) {
  return (
    <section className="section" id="experience">
      <SectionHead n="03" kicker="git log --graph" title={<>Three internships, <em>merged</em>.</>} />
      <div className="gitlog">
        {experience.map((e, i) => {
          const lit = e.focus.includes(mode);
          return (
            <div key={e.hash} className={`commit ${lit ? 'lit' : ''} branch-${e.branch}`} data-reveal>
              <div className="rail" aria-hidden="true">
                <span className="node" />
                {i < experience.length - 1 && <span className="line" />}
              </div>
              <div className="commit-body">
                <div className="commit-meta mono">
                  <span className="hash">{e.hash}</span>
                  {i === 0 && <span className="head">HEAD → main</span>}
                  <span className="br">{e.branch === 'ml' ? 'feat/ml' : 'feat/web'}</span>
                  <span className="date">{e.period}</span>
                </div>
                <h3 className="commit-title">
                  {e.role} <span className="at">@</span> {e.company}
                </h3>
                <ul key={mode}>
                  {e.bullets[mode].map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="tags">
                  {e.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- stack */

function Stack({ mode }) {
  const [hover, setHover] = useState(null);
  const lit = skills.filter((s) => s.m[0] === mode).length;
  return (
    <section className="section" id="stack">
      <SectionHead n="04" kicker="periodic table" title={<>The elements I <em>build</em> with.</>}>
        {lit} elements glow for the {modes[mode].label} view. Hover any tile.
      </SectionHead>
      <div className="ptable-wrap" data-reveal>
        <div className="ptable-legend">
          {skillGroups.map((g) => (
            <span key={g.key} className={`lg g-${g.key}`}>
              <i />
              {g.name}
            </span>
          ))}
        </div>
        <div className="ptable">
          {skills.map((s, i) => {
            const primary = s.m[0] === mode;
            const related = s.m.includes(mode);
            return (
              <div
                key={s.n}
                className={`el g-${s.g} ${primary ? 'primary' : related ? 'related' : 'dim'}`}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(null)}
                style={{ '--i': i }}
              >
                <span className="el-n mono">{i + 1}</span>
                <span className="el-s">{s.s}</span>
                <span className="el-name">{s.n}</span>
              </div>
            );
          })}
        </div>
        <div className="ptable-readout mono" aria-live="polite">
          {hover ? (
            <>
              <span className="acc">{hover.s}</span> {hover.n} ·{' '}
              {skillGroups.find((g) => g.key === hover.g).name} ·{' '}
              {hover.m.map((m) => modes[m].label).join(' + ')}
            </>
          ) : (
            <span className="mute">hover an element to inspect it</span>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- achievements */

function Wins() {
  return (
    <section className="section" id="wins">
      <SectionHead n="05" kicker="leaderboard" title={<>Outside the <em>job</em>.</>} />
      <div className="wins">
        {achievements.map((a, i) => (
          <div key={a.title} className="win" data-reveal style={{ '--d': `${i * 0.1}s` }}>
            <div className="win-rank mono">#{i + 1}</div>
            <div className="win-big">{a.big}</div>
            <div className="win-of mono">{a.of}</div>
            <div className="win-title">{a.title}</div>
            <div className="win-note">{a.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- contact */

function Contact({ mode, setMode }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profile.email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      });
    }
  };

  return (
    <section className="section contact" id="contact">
      <SectionHead n="06" kicker="contact" title={<>Let&apos;s build something <em>real</em>.</>} />
      <div className="contact-grid">
        <div className="contact-left" data-reveal>
          <p className="contact-lead">
            Hiring for a {mode === 'ai' ? 'ML, GenAI or AI engineering' : 'software, full-stack or backend'} role?
            I reply fast.
          </p>
          <a className="big-mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="contact-actions">
            <button type="button" className="btn small ghost" onClick={copy}>
              {copied ? 'Copied ✓' : 'Copy email'}
            </button>
            <a className="btn small ghost" href={profile.resume[mode]} target="_blank" rel="noreferrer">
              {modes[mode].label} resume <Arrow />
            </a>
          </div>
          <div className="socials">
            {[
              ['GitHub', profile.github],
              ['LinkedIn', profile.linkedin],
              ['LeetCode', profile.leetcode],
            ].map(([l, h]) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" className="social">
                <span>{l}</span>
                <Arrow />
              </a>
            ))}
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="social">
              <span>{profile.phone}</span>
              <Arrow />
            </a>
          </div>
        </div>
        <div data-reveal>
          <Terminal mode={mode} setMode={setMode} />
        </div>
      </div>
    </section>
  );
}

function Footer({ mode, toast }) {
  const shareUrl = `${window.location.origin}${window.location.pathname}?mode=${mode}`;
  return (
    <footer className="footer">
      <div className="giant" aria-hidden="true">
        Param<em>Parikh</em>
      </div>
      <div className="footer-row mono">
        <span>© {new Date().getFullYear()} Param Parikh · designed &amp; built from scratch</span>
        <button
          type="button"
          className="linkish"
          onClick={() => {
            if (navigator.clipboard) navigator.clipboard.writeText(shareUrl).then(() => toast('Link copied'));
          }}
        >
          share the {modes[mode].label} view ↗
        </button>
        <span>
          press <kbd>⌘K</kbd> anywhere
        </span>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------- app */

export default function App() {
  const [mode, setModeState] = useState(initialMode);
  const [palette, setPalette] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [progress, setProgress] = useState(0);

  useReveal();

  const toast = useCallback((m) => {
    setToastMsg(m);
    setTimeout(() => setToastMsg(''), 1800);
  }, []);

  const setMode = useCallback((m) => {
    setModeState(m);
    try {
      window.localStorage.setItem('pp-mode', m);
      const url = new URL(window.location.href);
      url.searchParams.set('mode', m);
      window.history.replaceState(null, '', url);
    } catch (e) {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    document.title = `Param Parikh — ${modes[mode].role}`;
  }, [mode]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette((p) => !p);
      }
      if (e.key === 'Escape') setPalette(false);
    };
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const actions = useMemo(
    () => [
      { icon: '⇄', label: `Switch to ${mode === 'ai' ? 'Software' : 'AI / ML'} mode`, group: 'mode', keywords: 'ai ml sde software toggle', run: () => setMode(mode === 'ai' ? 'sde' : 'ai') },
      { icon: '↓', label: `Open ${modes[mode].label} resume`, group: 'file', keywords: 'cv pdf download', run: () => window.open(profile.resume[mode], '_blank', 'noopener') },
      { icon: '↓', label: `Open ${mode === 'ai' ? 'Software' : 'AI / ML'} resume`, group: 'file', keywords: 'cv pdf download', run: () => window.open(profile.resume[mode === 'ai' ? 'sde' : 'ai'], '_blank', 'noopener') },
      { icon: '#', label: 'Go to Work', group: 'nav', keywords: 'projects', run: () => scrollTo('work') },
      { icon: '#', label: 'Go to Experience', group: 'nav', keywords: 'internships jobs', run: () => scrollTo('experience') },
      { icon: '#', label: 'Go to Stack', group: 'nav', keywords: 'skills', run: () => scrollTo('stack') },
      { icon: '#', label: 'Go to Contact', group: 'nav', keywords: 'email hire', run: () => scrollTo('contact') },
      { icon: '@', label: 'Copy email address', group: 'contact', keywords: 'mail', run: () => navigator.clipboard && navigator.clipboard.writeText(profile.email).then(() => toast('Email copied')) },
      { icon: '↗', label: 'Open GitHub', group: 'link', run: () => window.open(profile.github, '_blank', 'noopener') },
      { icon: '↗', label: 'Open LinkedIn', group: 'link', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
      { icon: '↗', label: 'Open LeetCode', group: 'link', run: () => window.open(profile.leetcode, '_blank', 'noopener') },
      { icon: '⧉', label: 'Copy link to this view', group: 'share', keywords: 'url share', run: () => navigator.clipboard && navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?mode=${mode}`).then(() => toast('Link copied')) },
    ],
    [mode, setMode, toast]
  );

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Nav mode={mode} setMode={setMode} openPalette={() => setPalette(true)} />
      <main>
        <Hero mode={mode} setMode={setMode} />
        <Marquee mode={mode} />
        <About mode={mode} />
        <Work mode={mode} />
        <Experience mode={mode} />
        <Stack mode={mode} />
        <Wins />
        <Contact mode={mode} setMode={setMode} />
      </main>
      <Footer mode={mode} toast={toast} />
      <CommandPalette open={palette} onClose={() => setPalette(false)} actions={actions} />
      <div className={`toast mono ${toastMsg ? 'show' : ''}`} role="status">
        {toastMsg}
      </div>
    </>
  );
}
