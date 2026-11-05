import React, { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks';

// Small, live illustrations — one per kind of project.

const STAGES = [
  'Ingest logs',
  'Anomaly detection',
  'Severity · XGBoost',
  'Root-cause analysis',
  'RAG · pgvector',
  'Human approval',
  'Remediate',
];

function Pipeline() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!inView) return undefined;
    let i = -1;
    const id = setInterval(() => {
      i = i >= STAGES.length + 2 ? -1 : i + 1;
      setStep(i);
    }, 650);
    return () => clearInterval(id);
  }, [inView]);

  const done = step >= STAGES.length;
  return (
    <div className="viz viz-pipeline" ref={ref}>
      <div className="viz-head">
        <span className="dot red" />
        <span className="mono">incident #4721 · api-gateway 5xx spike</span>
        <span className={`badge ${done ? 'ok' : ''}`}>{done ? 'resolved' : 'running'}</span>
      </div>
      <ol className="stages">
        {STAGES.map((s, i) => (
          <li key={s} className={i < step ? 'done' : i === step ? 'active' : ''}>
            <span className="stage-n mono">{String(i + 1).padStart(2, '0')}</span>
            <span>{s}</span>
            <span className="stage-tick mono">{i < step ? 'ok' : i === step ? '…' : ''}</span>
          </li>
        ))}
      </ol>
      <div className="viz-foot mono">
        <span>MTTR</span>
        <span className="strike">~45 min</span>
        <span className="arrow">→</span>
        <span className="acc">&lt; 3 min</span>
      </div>
    </div>
  );
}

function Browser({ url, title, shot }) {
  const bar = (
    <div className="browser-bar">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
      <span className="browser-url mono">{url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
    </div>
  );

  // Real screenshot of the live site, clickable through to it.
  if (shot) {
    return (
      <a className="viz viz-browser has-shot" href={url} target="_blank" rel="noreferrer" aria-label={`Open ${title} live site`}>
        {bar}
        <div className="browser-shot">
          <img src={shot} alt={`${title} website homepage`} loading="lazy" width="1200" height="750" />
          <span className="shot-cta mono">visit live site ↗</span>
        </div>
      </a>
    );
  }

  return (
    <div className="viz viz-browser">
      {bar}
      <div className="browser-body">
        <div className="wf-nav">
          <span className="wf-logo">{title}</span>
          <span className="wf-links">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="wf-hero">
          <i className="l1" />
          <i className="l2" />
          <i className="btn" />
        </div>
        <div className="wf-cards">
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

function Rag() {
  const chunks = ['Hb 10.2 g/dL ↓', 'WBC 7,400 /µL', 'Vit-D 14 ng/mL ↓', 'TSH 2.1 mIU/L', 'LDL 168 mg/dL ↑'];
  return (
    <div className="viz viz-rag">
      <div className="rag-q mono">
        <span className="acc">query</span> what is abnormal in this report?
      </div>
      <div className="rag-chunks">
        {chunks.map((c, i) => (
          <div key={c} className={`chunk ${[0, 2, 4].includes(i) ? 'hit' : ''}`} style={{ '--i': i }}>
            <span className="mono">{c}</span>
            <span className="score mono">{(0.91 - i * 0.07).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="rag-a">
        <span className="mono acc">summary</span> Low haemoglobin and vitamin D, high LDL. Other values are in range.
      </div>
    </div>
  );
}

function Wave() {
  const bars = Array.from({ length: 48 }, (_, i) => {
    const v = Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 0.85 + 0.15;
    return { v, spk: i < 18 ? 'a' : i < 33 ? 'b' : 'a' };
  });
  return (
    <div className="viz viz-wave">
      <div className="wave">
        {bars.map((b, i) => (
          <i key={i} className={`spk-${b.spk}`} style={{ '--v': b.v, '--d': `${(i % 12) * 0.08}s` }} />
        ))}
      </div>
      <div className="transcript mono">
        <p>
          <b className="spk-a">SPEAKER_00</b> Let&apos;s lock the release for Friday.
        </p>
        <p>
          <b className="spk-b">SPEAKER_01</b> I&apos;ll finish the API tests by Thursday.
        </p>
        <p className="sum">
          <span className="acc">→ action item</span> API tests · Thu · SPEAKER_01
        </p>
      </div>
    </div>
  );
}

export default function ProjectVisual({ project }) {
  switch (project.visual) {
    case 'pipeline':
      return <Pipeline />;
    case 'rag':
      return <Rag />;
    case 'wave':
      return <Wave />;
    case 'browser':
      return <Browser url={project.live || project.github} title={project.name} shot={project.shot} />;
    default:
      return null;
  }
}
