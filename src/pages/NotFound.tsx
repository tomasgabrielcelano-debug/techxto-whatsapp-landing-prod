import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="hero">
      <div className="container">
        <h1 className="h1">404</h1>
        <p className="heroSub">No existe esta página.</p>
        <Link className="btn btnGhost" to="/">Ir a la landing</Link>
      </div>
    </div>
  );
}
