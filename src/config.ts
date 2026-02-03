export const BUSINESS_NAME = import.meta.env.VITE_BUSINESS_NAME ?? "TechXto";
export const ZONE_TITLE =
  import.meta.env.VITE_ZONE_TITLE ?? "Reparación de celulares en Rafael Castillo / Zona Oeste";

export const HOME_SERVICE_TAGLINE =
  import.meta.env.VITE_HOME_SERVICE_TAGLINE ?? "Atención con turno ";

// E.164 without plus for wa.me. Default set for convenience — change via .env.
export const WHATSAPP_PHONE =
  (import.meta.env.VITE_WHATSAPP_PHONE ?? "5491144772631").replace(/\D/g, "");

export const DIAG_PRICE_ARS = import.meta.env.VITE_DIAG_PRICE_ARS ?? "Consultar";

export const MAP_EMBED_URL =
  import.meta.env.VITE_MAP_EMBED_URL ??
  "https://www.google.com/maps?q=Rafael%20Castillo%2C%20Buenos%20Aires&output=embed";

export const MAP_LINK_URL =
  import.meta.env.VITE_MAP_LINK_URL ??
  "https://www.google.com/maps?q=Rafael%20Castillo%2C%20Buenos%20Aires";

export const DEFAULT_REPAIR_OPTIONS = [
  { value: "batería", label: "Batería" },
  { value: "módulo", label: "Módulo (pantalla)" },
  { value: "pin de carga", label: "Pin de carga" },
  { value: "equipo mojado", label: "Equipo mojado (agua/humedad)" },
  { value: "no enciende", label: "No enciende / placa" },
] as const;

// Recomendadas por cercanía (núcleo + expansión)
export const ZONES_CORE = ["Rafael Castillo", "Laferrere", "Isidro Casanova", "Ciudad Evita", "San Justo"];
export const ZONES_EXPANSION = ["Ramos Mejía", "Villa Luzuriaga", "Lomas del Mirador", "Tapiales", "La Tablada"];
export const ZONES_SPECIAL = ["Morón", "Haedo", "Castelar", "Ituzaingó"];

export const GA4_ID = import.meta.env.VITE_GA4_ID;
export const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;


// Base URL para catálogo dinámico (Worker/KV). Ej: https://stock.techxto.ar
export const STOCK_API_BASE = import.meta.env.VITE_STOCK_API_BASE ?? "";
