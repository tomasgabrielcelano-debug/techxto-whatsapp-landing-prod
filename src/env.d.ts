interface ImportMetaEnv {
  readonly VITE_WHATSAPP_PHONE?: string;
  readonly VITE_BUSINESS_NAME?: string;
  readonly VITE_ZONE_TITLE?: string;
  readonly VITE_HOME_SERVICE_TAGLINE?: string;

  readonly VITE_MAP_EMBED_URL?: string;
  readonly VITE_MAP_LINK_URL?: string;
  readonly VITE_DIAG_PRICE_ARS?: string;

  // Medición
  readonly VITE_GA4_ID?: string;
  readonly VITE_META_PIXEL_ID?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
