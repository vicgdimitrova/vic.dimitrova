// app.jsx — Victoria Dimitrova portfolio
// Hero, Nav, Marquee, Work grid, About (interactive), Contact, Footer

import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { gsap } from 'gsap';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { VICO_DATA } from './data.js';
import { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakSelect } from './tweaks-panel.jsx';
import { Contact } from './contact.jsx';

gsap.registerPlugin(GSAPSplitText, useGSAP);

// ── Theme hook ──────────────────────────────────────
function useTheme() {
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

// ── reveal on scroll ────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-stagger");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add("in");});
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── Elastic hover wrapper ───────────────────────────
function ElasticItem({ as: As = "a", className = "", children, onClick, href, ...rest }) {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const stateRef = useRef({
    sx: 1, sy: 1,
    tsx: 1, tsy: 1,
    hovering: false
  });

  const tick = useCallback(() => {
    const s = stateRef.current;
    const el = ref.current;
    if (!el) return;
    const k = 0.18;
    s.sx += (s.tsx - s.sx) * k;
    s.sy += (s.tsy - s.sy) * k;
    el.style.transform = `scale(${s.sx.toFixed(3)}, ${s.sy.toFixed(3)})`;

    const settled =
      Math.abs(s.tsx - s.sx) < 0.001 &&
      Math.abs(s.tsy - s.sy) < 0.001;
    if (!settled || s.hovering) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = 0;
      el.style.transform = "";
    }
  }, []);

  const ensureTick = () => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  };

  const onPointerEnter = () => {
    const s = stateRef.current;
    s.hovering = true;
    s.tsx = 1.18;
    s.tsy = 1.18;
    ensureTick();
  };

  const onPointerLeave = () => {
    const s = stateRef.current;
    s.hovering = false;
    s.tsx = 1;
    s.tsy = 1;
    ensureTick();
  };

  // smooth-scroll for hash links
  const handleClick = (e) => {
    if (typeof href === "string" && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", href);
      }
    }
    if (onClick) onClick(e);
  };

  useEffect(() => () => {if (rafRef.current) cancelAnimationFrame(rafRef.current);}, []);

  const props = {
    ref,
    className: `elastic-item ${className}`,
    onPointerEnter,
    onPointerLeave,
    onClick: handleClick,
    ...rest
  };
  if (As === "a" || typeof href === "string") props.href = href;

  return (
    <As {...props}>
      <span className="elastic-inner">{children}</span>
    </As>);
}

// ── Nav ─────────────────────────────────────────────
function Nav({ theme, setTheme }) {
  return (
    <nav className="nav">
      <ElasticItem href="#top" className="mark">HOME</ElasticItem>
      <div className="nav-links">
        <ElasticItem href="#work">Work</ElasticItem>
        <ElasticItem href="#about">About</ElasticItem>
        <ElasticItem href="#contact">Contact</ElasticItem>
        <ElasticItem as="button" className="theme-toggle" aria-label="Toggle theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ?
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg> :
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>}
        </ElasticItem>
      </div>
    </nav>);
}

// ── Hero ────────────────────────────────────────────
function Hero() {
  const heroRef = useRef(null);
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Sofia"
  }).format(new Date());

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const run = () => {
      const rows = hero.querySelectorAll('.hero-name .row');
      const amp = hero.querySelector('.hero-amp');
      const metaItems = hero.querySelectorAll('.hero-meta > div');
      const foot = hero.querySelector('.hero-foot');

      rows.forEach((row, i) => {
        const split = new GSAPSplitText(row, { type: 'chars', charsClass: 'split-char' });
        gsap.fromTo(split.chars,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.25, ease: 'power3.out', stagger: 0.03, delay: i * 0.08, force3D: true }
        );
      });

      gsap.fromTo(amp,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.15, force3D: true }
      );
      gsap.fromTo(metaItems,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1, delay: 0.2, force3D: true }
      );
      gsap.fromTo(foot,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.6, force3D: true }
      );
    };

    if (document.fonts.status === 'loaded') {
      run();
    } else {
      document.fonts.ready.then(run);
    }
  }, []);

  return (
    <header id="top" className="hero" ref={heroRef}>
      <div className="hero-meta">
        <div>(01) Designer<b>Victoria Dimitrova</b></div>
        <div>(02) Based in<b>Sofia, Bulgaria · {time} EET</b></div>
        <div>(03) Currently<b>Senior Designer · Noble Graphics</b></div>
      </div>

      <h1 className="hero-name">
        <span className="row">Graphic</span>
        <span className="row indent">designer</span>
        <span className="accent hero-amp" style={{ color: "rgb(255, 55, 5)" }}>&amp;</span>
        <span className="row indent-2">illustrator.</span>
      </h1>

      <div className="hero-foot">
        <div>A portfolio of brands, packaging, and choreographed pixels - selected works, one studio of one</div>
      </div>
    </header>);
}

// ── Marquee ─────────────────────────────────────────
function Marquee({ items }) {
  const block = [];
  items.forEach((it, j) => {
    block.push(<span key={`a-${j}`}>{it}</span>);
    block.push(<span key={`a-${j}-d`} className="dot">●</span>);
  });
  return (
    <div className="marquee">
      <div className="marquee-inner">{block}</div>
      <div className="marquee-inner" aria-hidden="true">{block.map((el, i) => React.cloneElement(el, { key: `b-${i}` }))}</div>
    </div>);
}

// ── Work grid ───────────────────────────────────────
function Work({ projects, theme }) {
  return (
    <section className="sec">
      <div id="work" className="sec-head reveal">
        <div className="sec-num">(I) - Selected Work · 2025 / 2026</div>
        <h2 className="sec-title">Projects that paid for the <span className="accent">coffee.</span></h2>
      </div>

      <div className="work-grid">
        {projects.map((p, i) => {
          const thumbSrc = p.thumb
            ? `assets/thumbnails/${theme}/${p.id}.${p.thumbExt || "jpg"}`
            : null;
          return (
            <a key={p.id}
              href={`projects/${p.id}.html`}
              onClick={() => sessionStorage.setItem('vico.scrollY', window.scrollY)}
              className="proj reveal"
              style={{
                gridColumn: p.col ? `${p.col} / span ${p.span}` : `span ${p.span}`,
                marginTop: p.mt ? `${p.mt}vh` : undefined,
                marginLeft: p.ml ? `${p.ml}vw` : undefined,
                transitionDelay: `${i % 4 * 80}ms`
              }}>
              <div className={`proj-thumb${thumbSrc ? " has-thumb" : ""}`}
                data-label={`${String(i + 1).padStart(2, "0")} · ${p.tag}`}
                style={{ aspectRatio: p.ratio }}>
                {thumbSrc && <img src={thumbSrc} alt={p.title} />}
                <div className="proj-thumb-inner">{p.title}</div>
              </div>
              <div className="proj-meta">
                <div className="t">{p.title} <span className="arrow">↗</span></div>
                <div className="y">{p.year}</div>
                <div className="blurb">{p.blurb}</div>
              </div>
            </a>
          );
        })}
      </div>
    </section>);
}

// ── About — blur-reveal with clickable pills ────────
function About({ blocks }) {
  const initialRevealed = () => {
    const s = new Set();
    blocks.forEach((b) => { if (b.start) s.add(b.id); });
    return s;
  };
  const [revealed, setRevealed] = useState(initialRevealed);
  const [usedPills, setUsedPills] = useState(() => new Set());

  const isRevealed = (id) => revealed.has(id);

  const clickPill = (pill, blockId) => {
    if (!isRevealed(blockId)) return;
    if (usedPills.has(pill.pill)) return;
    setRevealed((prev) => {
      const next = new Set(prev);
      pill.unlocks.forEach((id) => next.add(id));
      return next;
    });
    setUsedPills((prev) => {
      const next = new Set(prev);
      next.add(pill.pill);
      return next;
    });
  };

  const restart = () => {
    setRevealed(initialRevealed());
    setUsedPills(new Set());
  };

  const total = blocks.length;
  const done = blocks.filter((b) => isRevealed(b.id)).length;
  const pct = Math.round((done / total) * 100);

  return (
    <section className="about">
      <div id="about" className="about-inner">
        <div className="sec-head reveal" style={{ marginBottom: 40 }}>
          <div className="sec-num">(II) - About · Click the pills to read</div>
          <h2 className="sec-title">Read me <span className="accent">slowly.</span></h2>
        </div>

        <p className="about-passage reveal">
          {blocks.map((block) => {
            const shown = isRevealed(block.id);
            return (
              <span
                key={block.id}
                className={`seg ${shown ? "done" : ""}`}>
                {block.nodes.map((node, ni) => {
                  if (typeof node === "string") return <React.Fragment key={ni}>{node}</React.Fragment>;
                  const used = usedPills.has(node.pill);
                  return (
                    <span
                      key={ni}
                      className={`pill ${used ? "used" : ""}`}
                      role="button"
                      tabIndex={shown && !used ? 0 : -1}
                      onClick={() => clickPill(node, block.id)}
                      onKeyDown={(e) => {
                        if ((e.key === "Enter" || e.key === " ") && shown && !used) {
                          e.preventDefault();
                          clickPill(node, block.id);
                        }
                      }}>
                      {node.label}
                    </span>);
                })}
              </span>);
          })}
        </p>

        <div className="about-progress reveal">
          <span>{String(done).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          <div className="bar"><i style={{ width: `${pct}%` }} /></div>
          <span>{pct === 100 ? "Complete" : "Reading"}</span>
          <button className="about-restart" onClick={restart}>Restart ↺</button>
        </div>
      </div>
    </section>);
}

// ── Footer ──────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 Victoria Dimitrova</span>
      <span>Designed in Sofia</span>
    </footer>);
}

// ── App shell ───────────────────────────────────────
function App() {
  const [theme, setTheme] = useTheme();
  useReveal();
  const data = VICO_DATA;

  useEffect(() => {
    history.scrollRestoration = 'manual';
    const saved = sessionStorage.getItem('vico.scrollY');
    if (saved) {
      sessionStorage.removeItem('vico.scrollY');
      requestAnimationFrame(() => window.scrollTo(0, parseInt(saved, 10)));
    }
  }, []);

  const [t, setTweak] = useTweaks({ accent: "#ff3705", fontStack: "inter" });
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-sans",
      t.fontStack === "helvetica" ?
      '"Helvetica Neue", Helvetica, Arial, sans-serif' :
      t.fontStack === "mono-mix" ?
      '"JetBrains Mono", ui-monospace, monospace' :
      '"Inter Tight", "Helvetica Neue", Helvetica, Arial, sans-serif'
    );
  }, [t.fontStack]);

  const marqueeItems = [
    "Brand Identity", "Editorial", "Type Design", "Illustration",
    "Posters", "Books", "Campaigns"
  ];

  return (
    <>
      <Nav theme={theme} setTheme={setTheme} />
      <Hero />
      <Marquee items={marqueeItems} />
      <Work projects={data.projects} theme={theme} />
      <About blocks={data.aboutBlocks} />
      <Contact data={data} />
      <Footer />

      <TweaksPanel title="Site tweaks">
        <TweakSection label="Theme" />
        <TweakColor label="Accent" value={t.accent} onChange={(v) => setTweak("accent", v)} />
        <TweakRadio label="Mode" value={theme}
        options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]}
        onChange={setTheme} />
        <TweakSection label="Typography" />
        <TweakSelect label="Font stack" value={t.fontStack}
        options={[
          { value: "inter", label: "Inter Tight" },
          { value: "helvetica", label: "Helvetica" },
          { value: "mono-mix", label: "JetBrains Mono" }
        ]}
        onChange={(v) => setTweak("fontStack", v)} />
      </TweaksPanel>
    </>);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
