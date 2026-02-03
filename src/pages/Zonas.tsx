import React from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import { MAP_EMBED_URL, MAP_LINK_URL, ZONES_CORE, ZONES_EXPANSION, ZONES_SPECIAL } from "../config";

export default function ZonasPage() {
  return (
    <div id="top">
      <section className="hero" style={{ paddingBottom: 12 }}>
        <div className="container">
          <h1 className="h1">Zonas de atención</h1>
          <p className="heroSub" style={{ marginBottom: 0 }}>
            Atiendo desde mi casa (con turno).
          </p>

          <div className="heroCard" style={{ marginTop: 18 }}>
            <div className="grid2">
              <div className="card" style={{ background: "rgba(8,20,15,.28)" }}>
                <h3 className="h3" style={{ marginTop: 0 }}>ZONA A</h3>
                <div className="chips">
                  {ZONES_CORE.map((z) => <span className="chip" key={z}>{z}</span>)}
                </div>

                <div className="divider" />
                <h3 className="h3">ZONA B</h3>
                <div className="chips">
                  {ZONES_EXPANSION.map((z) => <span className="chip" key={z}>{z}</span>)}
                </div>

                <div className="divider" />
                <h3 className="h3">ZONA C</h3>
                <div className="chips">
                  {ZONES_SPECIAL.map((z) => <span className="chip" key={z}>{z}</span>)}
                </div>
              </div>

              <div className="card mapCard">
                <iframe
                  title="Mapa"
                  src={MAP_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="callout" style={{ marginTop: 14 }}>
              <div>
                <div className="calloutTitle">Cómo llegar</div>
                <p className="muted" style={{ margin: 0 }}>
                  Te paso ubicación exacta por WhatsApp cuando confirmamos turno.
                </p>
              </div>
              <a className="btn btnGhost" href={MAP_LINK_URL} target="_blank" rel="noreferrer">
                Abrir Maps
              </a>
            </div>

            <div className="divider" />
            <Link className="btn btnGhost" to="/">Volver a la landing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
