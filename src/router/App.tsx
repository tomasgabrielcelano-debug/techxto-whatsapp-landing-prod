import React, { useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import Home from "../pages/Home";
import ZonasPage from "../pages/Zonas";
import GarantiaPage from "../pages/Garantia";
import ProductosPage from "../pages/Productos";
import NotFound from "../pages/NotFound";
import { buildWhatsAppUrl } from "../lib/whatsapp";
import { WHATSAPP_PHONE } from "../config";
import { initAnalytics, trackPageView, trackWhatsAppClick } from "../lib/analytics";
import { persistFirstTouchUtm } from "../lib/utm";

export default function App() {
  const location = useLocation();

  const waHref = useMemo(() => {
    const msg = "Hola! Quiero consultar. Estoy en (ZONA A/B/C).";
    return buildWhatsAppUrl(WHATSAPP_PHONE, msg);
  }, []);

  useEffect(() => {
    persistFirstTouchUtm(window.location.href);
    initAnalytics();
  }, []);

  useEffect(() => {
    const path = location.pathname + location.search + location.hash;
    trackPageView(path);
    persistFirstTouchUtm(window.location.href);
  }, [location]);

  const headerCta = (
    <a
      className="ctaTop"
      href={waHref}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackWhatsAppClick({ cta: "header" })}
    >
      WhatsApp
    </a>
  );

  return (
    <SiteLayout headerRight={headerCta}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zonas" element={<ZonasPage />} />
        <Route path="/garantia" element={<GarantiaPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/stock" element={<Navigate to="/productos" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SiteLayout>
  );
}
