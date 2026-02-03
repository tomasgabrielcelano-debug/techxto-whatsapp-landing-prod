export type StockCategory =
  | "Celulares - iPhone usados"
  | "Celulares - iPhone sellados"
  | "Celulares - Xiaomi"
  | "Celulares - Samsung"
  | "Celulares - Motorola"
  | "Accesorios"
  | "Servicios";

export type StockItem = {
  id: string;
  name: string;
  category: StockCategory;
  tags?: string[];
  condition?: "Nuevo" | "Usado" | "Sellado";
  notes?: string;
  price?: string; // texto libre: "ARS 120.000" / "USD 250" / "Consultar"
  badge?: string; // ej. "OFERTA", "TOP", "ÚLTIMO"
  imageUrl?: string; // path en /public (ej: "/products/iphone13.jpg")
};

export const STOCK_CATEGORIES: StockCategory[] = [
  "Celulares - iPhone usados",
  "Celulares - iPhone sellados",
  "Celulares - Xiaomi",
  "Celulares - Samsung",
  "Celulares - Motorola",
  "Accesorios",
  "Servicios",
];

/**
 * Catálogo liviano (sin checkout).
 * - Editá esta lista y listo.
 * - Sugerencia: mantené pocos items (20–60) para que cargue rápido.
 */
export const STOCK_ITEMS: StockItem[] = [
  {
    id: "iph-13-128-used",
    name: "iPhone 13 128GB",
    category: "Celulares - iPhone usados",
    condition: "Usado",
    tags: ["batería 90%+", "libre", "garantía"],
    price: "Consultar",
    notes: "Se prueba todo en el momento (táctil, cámaras, Face/Touch ID si aplica).",
    badge: "TOP",
  },
  {
    id: "iph-14-128-sealed",
    name: "iPhone 14 128GB",
    category: "Celulares - iPhone sellados",
    condition: "Sellado",
    tags: ["garantía", "caja sellada"],
    price: "Consultar",
    badge: "NUEVO",
  },
  {
    id: "xia-redmi-note-12",
    name: "Xiaomi Redmi Note 12",
    category: "Celulares - Xiaomi",
    condition: "Nuevo",
    tags: ["dual sim", "cargador", "garantía"],
    price: "Consultar",
  },
  {
    id: "sam-a15",
    name: "Samsung A15",
    category: "Celulares - Samsung",
    condition: "Nuevo",
    tags: ["garantía"],
    price: "Consultar",
  },
  {
    id: "mot-g54",
    name: "Motorola G54",
    category: "Celulares - Motorola",
    condition: "Nuevo",
    tags: ["garantía"],
    price: "Consultar",
  },
  {
    id: "acc-vidrio",
    name: "Vidrio templado",
    category: "Accesorios",
    tags: ["instalación"],
    price: "Consultar",
  },
  {
    id: "acc-funda",
    name: "Funda reforzada",
    category: "Accesorios",
    tags: ["varios modelos"],
    price: "Consultar",
  },
  {
    id: "srv-bateria",
    name: "Cambio de batería (Pack)",
    category: "Servicios",
    tags: ["sellado", "calibración", "garantía"],
    price: "Consultar",
  },
];
