// contact.jsx — shared Contact section used on homepage and project pages
import React from 'react';

export function Contact({ data }) {
  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <h2 className="contact-headline reveal">
          <a href={`mailto:${data.email}`}>
            Let's make<br />something <span className="accent" style={{ padding: "4px 0px 7px" }}>meaningful.</span>
          </a>
        </h2>
        <div className="contact-side reveal-stagger">
          <div>
            <div className="label">Email</div>
            <div className="row"><a href={`mailto:${data.email}`}>{data.email} <span className="arr">↗</span></a></div>
          </div>
          {data.socials.map((s) =>
          <div key={s.label}>
              <div className="label">{s.label}</div>
              <div className="row"><a href={s.href} target="_blank" rel="noopener noreferrer">{s.handle} <span className="arr">↗</span></a></div>
            </div>
          )}
        </div>
      </div>
    </section>);
}
