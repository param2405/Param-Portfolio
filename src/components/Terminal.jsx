import React, { useEffect, useRef, useState } from 'react';
import { profile, modes, projects } from '../data';

const HELP = [
  ['help', 'list commands'],
  ['whoami', 'short intro'],
  ['projects', 'list projects'],
  ['email', 'open a new email to Param'],
  ['github · linkedin · leetcode', 'open profile'],
  ['resume', 'download the resume for this mode'],
  ['mode ai | mode sde', 'switch the whole site'],
  ['clear', 'clear the screen'],
];

export default function Terminal({ mode, setMode }) {
  const [lines, setLines] = useState([
    { k: 'sys', t: `param.sh v2 — type "help" to get started` },
  ]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const print = (...out) => setLines((l) => [...l, ...out]);
  const open = (url) => window.open(url, '_blank', 'noopener,noreferrer');

  const exec = (raw) => {
    const cmd = raw.trim();
    const echo = { k: 'in', t: cmd };
    if (!cmd) return print(echo);
    const [c, arg] = cmd.toLowerCase().split(/\s+/);

    switch (c) {
      case 'help':
        return print(echo, ...HELP.map(([a, b]) => ({ k: 'help', t: a, d: b })));
      case 'whoami':
        return print(echo, { k: 'out', t: `${profile.name} — ${modes[mode].role}. ${modes[mode].blurb}` });
      case 'projects':
      case 'ls':
        return print(echo, ...projects.map((p) => ({ k: 'out', t: `▸ ${p.name.padEnd(28, ' ')} ${p.year}` })));
      case 'email':
      case 'contact':
        window.location.href = `mailto:${profile.email}`;
        return print(echo, { k: 'ok', t: `opening mail client → ${profile.email}` });
      case 'github':
      case 'linkedin':
      case 'leetcode':
        open(profile[c]);
        return print(echo, { k: 'ok', t: `opening ${c}…` });
      case 'resume':
      case 'cv':
        open(profile.resume[mode]);
        return print(echo, { k: 'ok', t: `opening ${modes[mode].label} resume…` });
      case 'mode':
        if (arg === 'ai' || arg === 'sde') {
          setMode(arg);
          return print(echo, { k: 'ok', t: `switched to ${modes[arg].label} mode` });
        }
        return print(echo, { k: 'err', t: 'usage: mode ai | mode sde' });
      case 'clear':
        return setLines([]);
      case 'sudo':
        return print(echo, { k: 'ok', t: 'permission granted. sending offer letter… (just email me 🙂)' });
      default:
        return print(echo, { k: 'err', t: `command not found: ${c} — try "help"` });
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter') {
      exec(value);
      if (value.trim()) setHistory((h) => [value, ...h]);
      setValue('');
      setHIdx(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const n = Math.min(history.length - 1, hIdx + 1);
      if (history[n] !== undefined) {
        setHIdx(n);
        setValue(history[n]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const n = hIdx - 1;
      setHIdx(Math.max(-1, n));
      setValue(n >= 0 ? history[n] : '');
    }
  };

  const chips = ['help', 'whoami', 'projects', 'resume', mode === 'ai' ? 'mode sde' : 'mode ai'];

  return (
    <div className="terminal" onClick={() => inputRef.current && inputRef.current.focus()} role="presentation">
      <div className="term-bar">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="mono term-title">guest@param — zsh</span>
      </div>
      <div className="term-body mono" ref={bodyRef}>
        {lines.map((l, i) => (
          <div key={i} className={`tl tl-${l.k}`}>
            {l.k === 'in' && <span className="prompt">guest@param:~$ </span>}
            {l.k === 'help' ? (
              <>
                <span className="acc">{l.t.padEnd(30, ' ')}</span>
                <span className="mute">{l.d}</span>
              </>
            ) : (
              l.t
            )}
          </div>
        ))}
        <div className="tl tl-input">
          <span className="prompt">guest@param:~$ </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            spellCheck="false"
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
      <div className="term-chips">
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            className="chip mono"
            onClick={(e) => {
              e.stopPropagation();
              exec(c);
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
