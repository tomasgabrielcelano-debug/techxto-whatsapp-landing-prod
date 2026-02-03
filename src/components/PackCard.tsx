import React from "react";
import Badge from "./Badge";
export default function PackCard({ title, includes, note }:{
  title: string; includes: string[]; note?: string;
}) {
  return (
    <div className="card">
      <div className="cardHead">
        <h3 className="h3">{title}</h3>
        <Badge>Pack</Badge>
      </div>
      <ul className="list">
        {includes.map((x) => (
          <li key={x} className="li">
            <span className="tick" aria-hidden="true">✓</span>
            <span>{x}</span>
          </li>
        ))}
      </ul>
      {note ? <p className="muted" style={{ marginTop: 10 }}>{note}</p> : null}
    </div>
  );
}
