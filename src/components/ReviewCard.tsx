import React from "react";
export default function ReviewCard({ name, text, stars=5 }:{
  name: string; text: string; stars?: number;
}) {
  const s = "★".repeat(Math.max(0, Math.min(5, stars))) + "☆".repeat(Math.max(0, 5 - stars));
  return (
    <div className="card">
      <div className="reviewStars" aria-label={`${stars} de 5 estrellas`}>{s}</div>
      <p className="reviewText">“{text}”</p>
      <p className="muted">— {name}</p>
    </div>
  );
}
