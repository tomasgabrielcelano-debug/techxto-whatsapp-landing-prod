import React from "react";
export function Accordion({ items }:{ items: { q: string; a: React.ReactNode }[] }) {
  return (
    <div className="accordion">
      {items.map((it, idx) => (
        <details key={idx} className="accItem">
          <summary className="accQ">{it.q}</summary>
          <div className="accA">{it.a}</div>
        </details>
      ))}
    </div>
  );
}
