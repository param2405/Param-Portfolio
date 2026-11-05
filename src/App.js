import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  profile,
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

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const openUrl = (url) => window.open(url, '_blank', 'noopener,noreferrer');

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FOCUS = ['AI / ML', 'Generative AI', 'Data Science', 'Full-stack'];

/* ---------------------------------------------------------------- nav */

function Nav({ openPalette }) {
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
        <a className="btn small primary nav-resume" href={profile.resume} target="_blank" rel="noreferrer">
          Resume <Arrow />
        </a>
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

function Hero() {
  const [idx, setIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const verb = useScramble(profile.verbs[idx]);
  // The field alternates: neural network while ML phrases show, commit grid for the full-stack phrase.
  const field = profile.verbs[idx].includes('full-stack') ? 'grid' : 'net';

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = reduced ? null : setInterval(() => setIdx((i) => (i + 1) % profile.verbs.length), 3200);
    return () => {
      clearTimeout(t);
      if (id) clearInterval(id);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-field">
        <MorphField mode={field === 'net' ? 'ai' : 'sde'} />
        <div className="field-caption mono">
          {field === 'net' ? 'fig.1 — forward pass, live' : 'fig.1 — commits, live'}
        </div>
      </div>

      <div className="hero-copy">
        <div className="status mono reveal-1">
          <span className="pulse" />
          {profile.status}
        </div>

        <h1 className="hero-name reveal-2">
          <span className="line">Param</span>
          <span className="line italic">Parikh</span>
        </h1>

        <p className="hero-role reveal-3">
          <span className="mono role-tag">{profile.role}</span>
          I engineer <span className="verb">{verb}</span>
          <span className="caret" aria-hidden="true" />
        </p>

        <div className="focus reveal-4" aria-label="Focus areas">
          {FOCUS.map((f, i) => (
            <span key={f} className={`focus-chip mono ${i < 3 ? 'main' : ''}`}>
              {f}
            </span>
          ))}
        </div>

        <div className="hero-cta reveal-5">
          <button type="button" className="btn primary" onClick={() => scrollTo('work')}>
            See the work
          </button>
          <a className="btn ghost" href={profile.resume} target="_blank" rel="noreferrer">
            Download resume <Arrow />
          </a>
        </div>
      </div>

      <div className="hero-stats reveal-6">
        {stats.map((s) => (
          <Stat key={s.label} {...s} active={ready} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- marquee */

const MARQUEE = ['LangGraph', 'RAG', 'PyTorch', 'pgvector', 'XGBoost', 'Whisper', 'FastAPI', 'FAISS', 'Scikit-learn', 'React', 'Node.js', 'Docker', 'AWS'];

function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
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

function About() {
  return (
    <section className="section about" id="about">
      <SectionHead n="01" kicker="readme.md" title={<>AI that ships as a <em>real</em> product.</>} />
      <div className="about-grid">
        <div className="readme" data-reveal>
          <div className="readme-bar mono">
            <span>README.md</span>
            <span className="mute">ai/ml · genai · data science · full-stack</span>
          </div>
          <div className="readme-body">
            <p className="mono h"># hello, I&apos;m Param</p>
            {about.map((p) => (
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

function ProjectCard({ p, i }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <article ref={ref} className={`project ${i === 0 ? 'featured' : ''}`} onMouseMove={onMove} data-reveal>
      <div className="project-info">
        <div className="project-top mono">
          <span className="acc">{String(i + 1).padStart(2, '0')}</span>
          <span>{p.year}</span>
          <span className="kind">{p.kind.toUpperCase()}</span>
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
              GitHub <Arrow />
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

function Work() {
  return (
    <section className="section" id="work">
      <SectionHead n="02" kicker="selected work" title={<>Projects with <em>numbers</em> attached.</>}>
        Applied AI and machine learning first, followed by full-stack products built for real clients.
      </SectionHead>
      <div className="projects">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} />
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

function Experience() {
  return (
    <section className="section" id="experience">
      <SectionHead n="03" kicker="git log --graph" title={<>Three internships, <em>merged</em>.</>} />
      <div className="gitlog">
        {experience.map((e, i) => (
          <div key={e.hash} className={`commit lit branch-${e.branch}`} data-reveal>
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
              <ul>
                {e.bullets.map((b) => (
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
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- stack */

function Stack() {
  const [hover, setHover] = useState(null);
  const focusCount = skills.filter((s) => s.f).length;
  return (
    <section className="section" id="stack">
      <SectionHead n="04" kicker="periodic table" title={<>The elements I <em>build</em> with.</>}>
        {focusCount} glowing elements are my core AI/ML, GenAI and Data Science toolkit. Hover any tile.
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
          {skills.map((s, i) => (
            <div
              key={s.n}
              className={`el g-${s.g} ${s.f ? 'primary' : 'related'}`}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="el-n mono">{i + 1}</span>
              <span className="el-s">{s.s}</span>
              <span className="el-name">{s.n}</span>
            </div>
          ))}
        </div>
        <div className="ptable-readout mono" aria-live="polite">
          {hover ? (
            <>
              <span className="acc">{hover.s}</span> {hover.n} · {skillGroups.find((g) => g.key === hover.g).name}
              {hover.f ? ' · core focus' : ''}
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

function Contact({ toast }) {
  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(profile.email).then(() => toast('Email copied'));
  };

  return (
    <section className="section contact" id="contact">
      <SectionHead n="06" kicker="contact" title={<>Let&apos;s build something <em>real</em>.</>} />
      <div className="contact-grid">
        <div className="contact-left" data-reveal>
          <p className="contact-lead">
            Hiring for an AI/ML, GenAI, Data Science or software engineering role? I reply fast.
          </p>
          <a className="big-mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="contact-actions">
            <button type="button" className="btn small ghost" onClick={copy}>
              Copy email
            </button>
            <a className="btn small primary" href={profile.resume} target="_blank" rel="noreferrer">
              Download resume <Arrow />
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
          <Terminal />
        </div>
      </div>
    </section>
  );
}

function Footer({ toast }) {
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
            if (navigator.clipboard)
              navigator.clipboard.writeText(`${window.location.origin}/`).then(() => toast('Link copied'));
          }}
        >
          share this portfolio ↗
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
  const [palette, setPalette] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [progress, setProgress] = useState(0);

  useReveal();

  const toast = useCallback((m) => {
    setToastMsg(m);
    setTimeout(() => setToastMsg(''), 1800);
  }, []);

  useEffect(() => {
    // Old shared links used ?mode=… — tidy the URL now that there is one view.
    if (window.location.search.includes('mode=')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.hash);
    }
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
      { icon: '↓', label: 'Download resume', group: 'file', keywords: 'cv pdf', run: () => openUrl(profile.resume) },
      { icon: '#', label: 'Go to Work', group: 'nav', keywords: 'projects', run: () => scrollTo('work') },
      { icon: '#', label: 'Go to Experience', group: 'nav', keywords: 'internships jobs', run: () => scrollTo('experience') },
      { icon: '#', label: 'Go to Stack', group: 'nav', keywords: 'skills', run: () => scrollTo('stack') },
      { icon: '#', label: 'Go to Contact', group: 'nav', keywords: 'email hire', run: () => scrollTo('contact') },
      { icon: '@', label: 'Copy email address', group: 'contact', keywords: 'mail', run: () => navigator.clipboard && navigator.clipboard.writeText(profile.email).then(() => toast('Email copied')) },
      { icon: '↗', label: 'Open GitHub', group: 'link', run: () => openUrl(profile.github) },
      { icon: '↗', label: 'Open LinkedIn', group: 'link', run: () => openUrl(profile.linkedin) },
      { icon: '↗', label: 'Open LeetCode', group: 'link', run: () => openUrl(profile.leetcode) },
    ],
    [toast]
  );

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Nav openPalette={() => setPalette(true)} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Stack />
        <Wins />
        <Contact toast={toast} />
      </main>
      <Footer toast={toast} />
      <CommandPalette open={palette} onClose={() => setPalette(false)} actions={actions} />
      <div className={`toast mono ${toastMsg ? 'show' : ''}`} role="status">
        {toastMsg}
      </div>
    </>
  );
}
