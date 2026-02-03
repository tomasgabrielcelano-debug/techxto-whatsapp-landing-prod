import React from "react";
import { Link } from "react-router-dom";

export default function GarantiaPage() {
  const lines = [
    "1) La garantía cubre fallas de repuesto/instalación dentro del plazo informado al momento del trabajo.",
    "2) Se valida el equipo en el momento de entrega (carga, táctil, imagen, audio, etc. según corresponda).",
    "3) No cubre golpes, caídas, presión, flex, humedad o manipulación posterior.",
    "4) En equipos mojados/humedad: se realiza diagnóstico + limpieza (ultrasonido). El resultado depende del estado del equipo; no siempre se puede garantizar recuperación.",
    "5) En módulos/pantallas: no cubre roturas/rajaduras posteriores a la entrega.",
    "6) En batería: el rendimiento varía por uso; cubre defectos de batería/instalación.",
    "7) En pin de carga: se prueba con varios cables/fuentes; si el problema es placa, se informa.",
    "8) Si aparece un problema distinto al solicitado, se cotiza aparte (no se avanza sin OK).",
    "9) Si algo no quedó bien: traer el equipo con el comprobante y describir el fallo.",
    "10) Priorizamos solución rápida: reparación, cambio de repuesto o ajuste según corresponda."
  ];

  return (
    <div id="top">
      <section className="hero" style={{ paddingBottom: 12 }}>
        <div className="container">
          <h1 className="h1">Garantía</h1>
          <p className="heroSub" style={{ marginBottom: 0 }}>
            10 líneas claras. Sin letra chica rara.
          </p>

          <div className="heroCard" style={{ marginTop: 18 }}>
            <ul className="list">
              {lines.map((x) => (
                <li key={x} className="li">
                  <span className="tick" aria-hidden="true">✓</span>
                  <span className="muted">{x}</span>
                </li>
              ))}
            </ul>

            <div className="divider" />
            <Link className="btn btnGhost" to="/">Volver a la landing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
