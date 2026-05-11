// case.jsx — single-project case study renderer.
// Reads `window.PROJECT_ID` (set by each project HTML) and looks up the
// project from VICO_DATA.projects.

import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { gsap } from 'gsap';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { VICO_DATA } from './data.js';
import { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio } from './tweaks-panel.jsx';
import { Contact } from './contact.jsx';

gsap.registerPlugin(GSAPSplitText, useGSAP);

function CaseTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("vico.theme");
    if (saved) return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("vico.theme", theme);
  }, [theme]);
  return [theme, setTheme];
}

// ── Reveal on scroll (mirrors app.jsx) ─────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-stagger");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── Elastic hover wrapper (mirrors app.jsx) ─────────
function ElasticItem({ as: As = "a", className = "", children, onClick, href, ...rest }) {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const stateRef = useRef({ sx: 1, sy: 1, tsx: 1, tsy: 1, hovering: false });

  const tick = useCallback(() => {
    const s = stateRef.current;
    const el = ref.current;
    if (!el) return;
    const k = 0.18;
    s.sx += (s.tsx - s.sx) * k;
    s.sy += (s.tsy - s.sy) * k;
    el.style.transform = `scale(${s.sx.toFixed(3)}, ${s.sy.toFixed(3)})`;
    const settled = Math.abs(s.tsx - s.sx) < 0.001 && Math.abs(s.tsy - s.sy) < 0.001;
    if (!settled || s.hovering) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = 0;
      el.style.transform = "";
    }
  }, []);

  const ensureTick = () => { if (!rafRef.current) rafRef.current = requestAnimationFrame(tick); };
  const onPointerEnter = () => { const s = stateRef.current; s.hovering = true; s.tsx = 1.18; s.tsy = 1.18; ensureTick(); };
  const onPointerLeave = () => { const s = stateRef.current; s.hovering = false; s.tsx = 1; s.tsy = 1; ensureTick(); };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const props = { ref, className: `elastic-item ${className}`, onPointerEnter, onPointerLeave, onClick, ...rest };
  if (As === "a" || typeof href === "string") props.href = href;

  return (
    <As {...props}>
      <span className="elastic-inner">{children}</span>
    </As>
  );
}

// ── Case study nav ───────────────────────────────────
function CaseNav({ theme, setTheme }) {
  return (
    <nav className="nav case-nav">
      <ElasticItem href="../index.html" className="back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back
      </ElasticItem>
      <ElasticItem as="button" className="theme-toggle" aria-label="Toggle theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark"
          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>}
      </ElasticItem>
    </nav>
  );
}

function CaseStudy() {
  const [theme, setTheme] = CaseTheme();
  useReveal();
  const projects = VICO_DATA.projects;
  const idx = projects.findIndex((p) => p.id === window.PROJECT_ID);
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { accent: "#FF3B17" });
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  const heroRef = useRef(null);
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    document.fonts.ready.then(() => {
      const h1 = hero.querySelector('h1');
      const intro = hero.querySelector('.intro');
      const h1Split = new GSAPSplitText(h1, { type: 'chars,words', charsClass: 'split-char' });
      gsap.fromTo(h1Split.chars,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.25, ease: 'power3.out', stagger: 0.025, force3D: true }
      );
      const introSplit = new GSAPSplitText(intro, { type: 'words', wordsClass: 'split-word' });
      gsap.fromTo(introSplit.words,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.02, delay: 0.3, force3D: true }
      );
    });
  }, []);

  if (!p) return <div style={{ padding: 120, textAlign: "center" }}>Project not found.</div>;

  const services = p.services || [p.tag];

  return (
    <>
      <CaseNav theme={theme} setTheme={setTheme} />

      <header className="case-hero" ref={heroRef}>
        <div className="index">Project {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} - {p.year}</div>
        <h1>{p.title.split(" ").map((w, i, arr) =>
          i === arr.length - 1
            ? <React.Fragment key={i}><span className="accent">{w}</span></React.Fragment>
            : <React.Fragment key={i}>{w} </React.Fragment>
        )}</h1>
        <p className="intro">{p.intro || p.blurb}</p>
      </header>

      <div className="case-meta">
        <div className="cell">Client<b>{p.client}</b></div>
        <div className="cell">Year<b>{p.year}</b></div>
        <div className="cell">Role<b>{p.role || "Designer"}</b></div>
        <div className="cell">
          Services
          <div className="services">
            {services.map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>
      </div>

      <section className="case-embed">
        <div className="case-embed-inner">
          <img className="case-embed-board"
               src={`../assets/projects/${p.id}.${p.imageExt || "png"}`}
               alt={`${p.title} - full case study`} />
          <div className="case-embed-caption">
            <span>{p.title} · Case Study Board</span>
            <span>Scroll ↓</span>
          </div>
        </div>
      </section>

      <section className="case-next">
        <div className="case-next-label">(Next) - Project {String(((idx + 1) % projects.length) + 1).padStart(2, "0")}</div>
        <a href={`${next.id}.html`} className="case-next-link">
          <h2>{next.title.split(" ").map((w, i, arr) =>
            i === arr.length - 1
              ? <React.Fragment key={i}><span className="accent">{w}</span></React.Fragment>
              : <React.Fragment key={i}>{w} </React.Fragment>
          )}</h2>
          <span className="arrow">↗</span>
          <div className="meta">
            <span>{next.tag}</span>
            <span>{next.year}</span>
          </div>
        </a>
      </section>

      <Contact data={VICO_DATA} />

      <footer className="footer">
        <span>© 2026 Victoria Dimitrova</span>
        <span>Designed in Sofia</span>
      </footer>

      <TweaksPanel title="Site tweaks">
        <TweakSection label="Theme" />
        <TweakColor label="Accent" value={t.accent} onChange={(v) => setTweak("accent", v)} />
        <TweakRadio label="Mode" value={theme}
          options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]}
          onChange={setTheme} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CaseStudy />);
