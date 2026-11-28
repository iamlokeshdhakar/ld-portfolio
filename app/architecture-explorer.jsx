'use client';

import { useState } from 'react';

export default function ArchitectureExplorer({ stages, variant, diagramLabel }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = stages[activeIndex];

  return <div className={`architecture architecture--${variant}`}>
    <div className="architecture-head"><div><span>THE SYSTEM / SIMPLIFIED</span><p>{diagramLabel}</p></div><span>SELECT A STEP TO EXPLORE</span></div>
    <div className="architecture-stages" role="group" aria-label="Explore the system stages">
      {stages.map((stage, index) => <button key={stage.short} type="button" className={`architecture-stage ${index === activeIndex ? 'is-active' : ''}`} aria-pressed={index === activeIndex} onClick={() => setActiveIndex(index)}>
        <span className="architecture-stage-number">{stage.short}</span>
        <span className="architecture-stage-title">{stage.title}</span>
        {stage.branches && <span className="architecture-branches" aria-hidden="true">{stage.branches.map((branch) => <span key={branch}>{branch}</span>)}</span>}
        <span className="architecture-stage-indicator" aria-hidden="true">↗</span>
      </button>)}
    </div>
    <div className="architecture-readout" aria-live="polite" aria-atomic="true">
      <div className="architecture-readout-index"><span>{active.short} / {String(stages.length).padStart(2, '0')}</span><span>{active.eyebrow}</span></div>
      <div className="architecture-readout-body" key={active.short}><h3>{active.title}<span>.</span></h3><p>{active.text}</p><div className="architecture-note"><span aria-hidden="true">✳</span><p>{active.note}</p></div></div>
    </div>
  </div>;
}
