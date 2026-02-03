import React from "react";
import { Link, NavLink } from "react-router-dom";
import { BUSINESS_NAME, MAP_LINK_URL } from "../config";

export default function SiteLayout({ headerRight, children }:{
  headerRight: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="page viewport">
      <div className="bgLayer" aria-hidden="true" />
      <header className="topbar">
        <div className="container topbarInner">
          <Link className="brand" to="/" aria-label="Inicio">
            <img className="brandLogo" src="/logo.png" alt={`${BUSINESS_NAME} logo`} />
            <span className="brandText">{BUSINESS_NAME}</span>
          </Link>

          <nav className="nav">
            <NavLink to="/zonas">Zonas</NavLink>
            <NavLink to="/productos">Productos</NavLink>
            <NavLink to="/garantia">Garantía</NavLink>
            <a href={MAP_LINK_URL} target="_blank" rel="noreferrer">Cómo llegar</a>
          </nav>

          {headerRight}
        </div>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        <div className="container footerInner">
          <p className="muted" style={{ margin: 0 }}>
            © {new Date().getFullYear()} {BUSINESS_NAME}. Contacto por WhatsApp.
          </p>
          <a className="muted" href="#top">Volver arriba</a>
        </div>
      </footer>
    </div>
  );
}
