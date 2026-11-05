import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function CommandPalette({ open, onClose, actions }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return actions;
    return actions.filter((a) => `${a.label} ${a.group} ${a.keywords || ''}`.toLowerCase().includes(s));
  }, [q, actions]);

  useEffect(() => {
    if (open) {
      setQ('');
      setSel(0);
      if (inputRef.current) inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => setSel(0), [q]);

  if (!open) return null;

  const run = (a) => {
    onClose();
    setTimeout(a.run, 10);
  };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel((s) => Math.min(list.length - 1, s + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel((s) => Math.max(0, s - 1));
    } else if (e.key === 'Enter' && list[sel]) {
      run(list[sel]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="palette-backdrop" onMouseDown={onClose} role="presentation">
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="palette-input">
          <span className="mono acc">›</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Type a command or search…"
            aria-label="Search commands"
          />
          <kbd>esc</kbd>
        </div>
        <ul className="palette-list" role="listbox">
          {list.length === 0 && <li className="palette-empty mono">no matches — try “ai”, “resume” or “github”</li>}
          {list.map((a, i) => (
            <li
              key={a.label}
              role="option"
              aria-selected={i === sel}
              className={i === sel ? 'sel' : ''}
              onMouseEnter={() => setSel(i)}
              onClick={() => run(a)}
            >
              <span className="pi-icon mono">{a.icon}</span>
              <span className="pi-label">{a.label}</span>
              <span className="pi-group mono">{a.group}</span>
            </li>
          ))}
        </ul>
        <div className="palette-foot mono">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> run
          </span>
        </div>
      </div>
    </div>
  );
}
