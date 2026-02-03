import React, { useMemo, useState } from "react";
import Section from "../components/Section";
import StickyWhatsApp from "../components/StickyWhatsApp";
import PackCard from "../components/PackCard";
import { Accordion } from "../components/Accordion";
import {
  ZONE_TITLE,
  HOME_SERVICE_TAGLINE,
  WHATSAPP_PHONE,
  DEFAULT_REPAIR_OPTIONS,
  DIAG_PRICE_ARS,
  ZONES_CORE,
  ZONES_EXPANSION,
  ZONES_SPECIAL,
} from "../config";
import { buildWhatsAppUrl } from "../lib/whatsapp";
import { trackWhatsAppClick } from "../lib/analytics";

type RepairValue = (typeof DEFAULT_REPAIR_OPTIONS)[number]["value"];

export default function Home() {
  const [model, setModel] = useState("");
  const [repair, setRepair] = useState<RepairValue>("batería");
  const [hood, setHood] = useState("");

  const message = useMemo(() => {
    const m = model.trim() || "modelo";
    const raw = hood.trim();
    const h = raw || "Morón/Haedo/Castelar";
    const zone = raw
      ? (raw.toLowerCase().startsWith("zona") ? raw : `Zona ${raw}`)
      : `Zona ${h}`;
    return `Hola, tengo un (${m}) y necesito (${repair}). ${zone}.`;
  }, [model, repair, hood]);

  const waHref = useMemo(() => buildWhatsAppUrl(WHATSAPP_PHONE, message), [message]);

  const onWhatsApp = (cta: "cotizar" | "reservar" | "sticky" | "header" | "bottom") => () =>
    trackWhatsAppClick({ cta });

  const packs = [
    {
      title: "Pack Batería",
      includes: ["Batería + instalación", "Calibración", "Garantía"],
    },
    {
      title: "Pack Módulo (pantalla)",
      includes: ["Instalación", "Pruebas", "Garantía"],
    },
    {
      title: "Pack Pin de carga",
      includes: ["Cambio + limpieza", "Pruebas", "Garantía"],
    },
  ];

  const faqs = [
    {
      q: "¿Dónde atendés?",
      a: (
        <p className="muted" style={{ margin: 0 }}>
          <strong>Atiendo desde mi casa, con turno.</strong> Te paso la ubicación por WhatsApp cuando confirmamos.
        </p>
      ),
    },
    {
      q: "¿Recibís equipos mojados (agua/humedad)?",
      a: (
        <p className="muted" style={{ margin: 0 }}>
          Sí. Se hace <strong>diagnóstico + limpieza (ultrasonido)</strong> y se evalúa el estado. En equipos mojados no se
          garantiza recuperación: se avanza sólo con tu OK.
        </p>
      ),
    },
    {
      q: "¿Cuánto tardan?",
      a: (
        <ul className="list">
          <li className="li">
            <span className="tick" aria-hidden="true">✓</span>
            <span><strong>Si hay repuesto:</strong> suele salir en el día con turno.</span>
          </li>
          <li className="li">
            <span className="tick" aria-hidden="true">✓</span>
            <span><strong>Batería / pin:</strong> normalmente 30–90 min (según modelo).</span>
          </li>
          <li className="li">
            <span className="tick" aria-hidden="true">✓</span>
            <span><strong>Módulo:</strong> 1–3 hs (según modelo/pruebas).</span>
          </li>
          <li className="li">
            <span className="tick" aria-hidden="true">✓</span>
            <span><strong>Mojado / placa:</strong> tiempos variables según diagnóstico.</span>
          </li>
        </ul>
      ),
    },
    {
      q: "¿Qué garantía dan?",
      a: (
        <p className="muted" style={{ margin: 0 }}>
          Depende del trabajo y del repuesto. Te la indico por WhatsApp <strong>antes de confirmar</strong>.
        </p>
      ),
    },
    {
      q: "¿Cómo se paga?",
      a: (
        <p className="muted" style={{ margin: 0 }}>
          Efectivo o transferencia. Si necesitás otra forma, lo vemos por WhatsApp.
        </p>
      ),
    },
    {
      q: "¿Hacen envíos?",
      a: (
        <p className="muted" style={{ margin: 0 }}>
          Si querés, se puede coordinar por mensajería/paquetería según la zona. Consultame por WhatsApp.
        </p>
      ),
    },
  ];

  return (
    <div id="top">
      <section className="hero">
        <div className="container heroInner">
          <div className="heroLeft">
            <h1 className="h1">{ZONE_TITLE}</h1>
            <p className="heroSub">{HOME_SERVICE_TAGLINE}</p>

            <div className="heroCard">
              <div className="grid2">
                <label className="field">
                  <span>Modelo</span>
                  <input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Ej: iPhone 13 / Redmi Note 12 / A23..."
                    autoComplete="off"
                  />
                </label>

                <label className="field">
                  <span>Preciso</span>
                  <select value={repair} onChange={(e) => setRepair(e.target.value as RepairValue)}>
                    {DEFAULT_REPAIR_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field" style={{ gridColumn: "1 / -1" }}>
                  <span>ZONA</span>
                  <input
                    value={hood}
                    onChange={(e) => setHood(e.target.value)}
                    placeholder="Ej: Morón / Haedo / Castelar..."
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className="msgBox" style={{ marginTop: 14 }}>
                <div className="muted" style={{ fontWeight: 800 }}>Mensaje precargado</div>
                <div className="msg">{message}</div>
              </div>

              
              <div className="heroActions">
                <a className="btn btnPrimary" href={waHref} target="_blank" rel="noreferrer" onClick={onWhatsApp("cotizar")}>
                  WhatsApp
                </a>
              </div>


              <p className="muted" style={{ margin: "10px 0 0" }}>
                Atendemos con turno (desde casa). Te paso ubicación exacta cuando confirmamos.
              </p>
            </div>

            <div className="promises">
              <div className="promise">
                <div className="emoji" aria-hidden="true">⚡</div>
                <div>
                  <div className="promiseTitle">Turno rápido</div>
                </div>
              </div>
              <div className="promise">
                <div className="emoji" aria-hidden="true">🛡️</div>
                <div>
                  <div className="promiseTitle">Garantía</div>
                </div>
              </div>
              <div className="promise">
                <div className="emoji" aria-hidden="true">🧾</div>
                <div>
                  <div className="promiseTitle">Presupuesto claro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section id="packs" title="Packs" subtitle="Servicios armados.">
        <div className="grid3">
          {packs.map((p) => (
            <PackCard key={p.title} title={p.title} includes={p.includes} />
          ))}
        </div>

        <div className="grid2" style={{ marginTop: 14 }}>
          <div className="card warn">
            <h3 className="h3" style={{ marginTop: 0 }}>Casos especiales (mojado)</h3>
            <ul className="list">
              <li className="li">
                <span className="tick" aria-hidden="true">✓</span>
                <span><strong>Equipo mojado:</strong> diagnóstico + limpieza (ultrasonido). No se garantiza recuperación.</span>
              </li>
              <li className="li">
                <span className="tick" aria-hidden="true">✓</span>
                <span>Se informa el estado antes de avanzar y se continúa sólo con tu OK.</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="h3" style={{ marginTop: 0 }}>Casos especiales (no enciende)</h3>
            <ul className="list">
              <li className="li">
                <span className="tick" aria-hidden="true">✓</span>
                <span><strong>No enciende:</strong> diagnóstico de placa.</span>
              </li>
              <li className="li">
                <span className="tick" aria-hidden="true">✓</span>
                <span>Si hace falta, se deriva a técnico especializado.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="callout">
          <div>
            <div className="calloutTitle">¿Precio exacto?</div>
            <p className="muted" style={{ margin: 0 }}>
              Mandame el WhatsApp con modelo + trabajo + ZONA y te respondo con precio y turno.
            </p>
          </div>
          <a className="btn btnPrimary" href={waHref} target="_blank" rel="noreferrer" onClick={onWhatsApp("cotizar")}>
            WhatsApp
          </a>
        </div>
      </Section>

      <Section id="reglas" title="Reglas claras" subtitle="Para evitar malentendidos.">
        <div className="grid2">
          <div className="card">
            <h3 className="h3" style={{ marginTop: 0 }}>Seña y repuestos</h3>
            <ul className="list">
              <li className="li">
                <span className="tick" aria-hidden="true">✓</span>
                <span><strong>Seña 40%</strong> para reservar repuesto.</span>
              </li>
              <li className="li">
                <span className="tick" aria-hidden="true">✓</span>
                <span>Sin seña no se congela precio ni stock.</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="h3" style={{ marginTop: 0 }}>Diagnóstico</h3>
            <ul className="list">
              <li className="li">
                <span className="tick" aria-hidden="true">✓</span>
                <span><strong>Diagnóstico {DIAG_PRICE_ARS}</strong> (descontable si se repara).</span>
              </li>
              <li className="li">
                <span className="tick" aria-hidden="true">✓</span>
                <span>Si hay fallas ocultas, se informa antes de avanzar.</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="h3" style={{ marginTop: 0 }}>Atención con turno (desde casa)</h3>
            <ul className="list">
              <li className="li">
                <span className="tick" aria-hidden="true">✓</span>
                <span>Coordinamos por WhatsApp y te paso ubicación exacta.</span>
              </li>
              <li className="li">
                <span className="tick" aria-hidden="true">✓</span>
                <span>Los turnos dependen de la disponibilidad y del repuesto.</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="h3" style={{ marginTop: 0 }}>No enciende / placa</h3>
            <ul className="list">
              <li className="li">
                <span className="tick" aria-hidden="true">✓</span>
                <span>Diagnóstico primero (se informa antes de gastar).</span>
              </li>
              <li className="li">
                <span className="tick" aria-hidden="true">✓</span>
                <span>Si es micro-soldadura, se puede tercerizar a un técnico especializado.</span>
              </li>
              <li className="li">
                <span className="tick" aria-hidden="true">✓</span>
                <span>Plazos variables según el caso.</span>
              </li>
            </ul>
          </div>

          <div className="card warn">
            <h3 className="h3" style={{ marginTop: 0 }}>Equipos mojados</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              Se hace diagnóstico + limpieza (ultrasonido) y se evalúa el estado. No se garantiza recuperación. Se avanza sólo con tu OK.
            </p>
          </div>
        </div>
      </Section>

      <Section id="zonas" title="Zonas">
        <div className="grid3">
          <div className="card">
            <h3 className="h3" style={{ marginTop: 0 }}>ZONA A</h3>
            <div className="chips">
              {ZONES_CORE.map((z) => (
                <span className="chip" key={z}>{z}</span>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="h3" style={{ marginTop: 0 }}>ZONA B</h3>
            <div className="chips">
              {ZONES_EXPANSION.map((z) => (
                <span className="chip" key={z}>{z}</span>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="h3" style={{ marginTop: 0 }}>ZONA C</h3>
            <div className="chips">
              {ZONES_SPECIAL.map((z) => (
                <span className="chip" key={z}>{z}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="faq" title="FAQ" subtitle="Corto y al punto.">
        <Accordion items={faqs} />
      </Section>

      <section className="bottomCta">
        <div className="container bottomCtaInner">
          <div>
            <h2 className="h2" style={{ margin: 0 }}>Listo. Mandá el WhatsApp.</h2>
            <p className="muted" style={{ margin: "6px 0 0" }}>
              Modelo + trabajo + ZONA → precio y turno.
            </p>
          </div>
          <a className="btn btnPrimary" href={waHref} target="_blank" rel="noreferrer" onClick={onWhatsApp("bottom")}>
            WhatsApp
          </a>
        </div>
      </section>

      <StickyWhatsApp href={waHref} label="WhatsApp" onClick={onWhatsApp("sticky")} />
    </div>
  );
}
