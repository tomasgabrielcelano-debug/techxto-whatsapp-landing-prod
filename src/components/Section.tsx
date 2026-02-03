import React from "react";
export default function Section({ id, title, subtitle, children }:{
  id?: string; title: string; subtitle?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="section">
      <div className="container">
        <header className="sectionHeader">
          <h2 className="h2">{title}</h2>
          {subtitle ? <p className="muted">{subtitle}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
