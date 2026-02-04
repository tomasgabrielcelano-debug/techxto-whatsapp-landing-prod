import React, { useEffect, useMemo, useState } from "react";
import StockCard from "../components/StockCard";
import StockFilters from "../components/StockFilters";
import StickyWhatsApp from "../components/StickyWhatsApp";
import { STOCK_ITEMS as FALLBACK_ITEMS, StockItem } from "../data/stock";
import { applyFilters } from "../lib/stock";
import { buildWhatsAppUrl } from "../lib/whatsapp";
import { STOCK_API_BASE, WHATSAPP_PHONE } from "../config";
import { trackWhatsAppClick } from "../lib/analytics";

export default function ProductosPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("Todas");
  const [items, setItems] = useState<StockItem[]>(FALLBACK_ITEMS);
  const [loading, setLoading] = useState(false);

  // dejamos estos estados por si querés loguear/diagnosticar en consola,
  // pero ya NO se muestran en UI
  const [, setSource] = useState<"fallback" | "remote" | "error">("fallback");
  const [, setErrorMsg] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((x) => set.add(x.category));
    return Array.from(set);
  }, [items]);

  useEffect(() => {
    if (!STOCK_API_BASE) return;

    (async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const endpoint = `${STOCK_API_BASE.replace(/\/$/, "")}/stock`;
        const res = await fetch(endpoint, { cache: "no-store" });

        if (!res.ok) {
          setSource("error");
          setErrorMsg(`HTTP ${res.status}`);
          return;
        }

        const data = (await res.json()) as any;
        const next = Array.isArray(data?.items) ? data.items : [];
        // soporta "active": false para ocultar sin borrar
        const visible = next.filter((x: any) => x?.active !== false);

        setItems(visible);
        setSource("remote");
      } catch {
        // si falla, nos quedamos con el fallback local
        setSource("error");
        setErrorMsg("fetch failed (CORS / network)");
      } finally {
        setLoading(false);
      }
    })();
  }, [STOCK_API_BASE]);

  const filtered = useMemo(
    () => applyFilters(items, { q, category: category as any }),
    [items, q, category]
  );

  const onWhatsApp = (item?: StockItem) => {
    const msg = item
      ? `Hola! Me interesa: ${item.name}. ¿Precio y disponibilidad? Estoy en (ZONA A/B/C).`
      : "Hola! Quiero consultar por un equipo. Estoy en (ZONA A/B/C).";

    trackWhatsAppClick({ cta: "productos", item_id: item?.id, item_name: item?.name });
    window.open(buildWhatsAppUrl(WHATSAPP_PHONE, msg), "_blank", "noreferrer");
  };

  const stickyHref = useMemo(
    () =>
      buildWhatsAppUrl(
        WHATSAPP_PHONE,
        "Hola! Quiero consultar por un equipo. Estoy en (ZONA A/B/C)."
      ),
    []
  );

  return (
    <div id="top">
      <section className="hero" style={{ paddingBottom: 12 }}>
        <div className="container">
          <h1 className="h1">Productos</h1>
          <p className="heroSub" style={{ marginBottom: 0 }}>
            Elegí un equipo y consultá por WhatsApp.
          </p>

          <div className="heroCard" style={{ marginTop: 18 }}>
            <StockFilters
              q={q}
              setQ={setQ}
              category={category}
              setCategory={setCategory}
              categories={categories}
            />

            <div className="stockHeader">
              <div className="muted">
                {loading ? (
                  <>Cargando catálogo…</>
                ) : (
                  <>
                    Mostrando <strong>{filtered.length}</strong> producto(s)
                  </>
                )}
              </div>
            </div>

            <div className="stockGrid">
              {filtered.map((it) => (
                <StockCard key={it.id} item={it} onWhatsApp={onWhatsApp} />
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="card" style={{ marginTop: 14 }}>
                <p className="muted" style={{ margin: 0 }}>
                  No encontré coincidencias. Probá otra búsqueda o escribime por WhatsApp.
                </p>
                <div style={{ marginTop: 12 }}>
                  <button className="btn btnPrimary" onClick={() => onWhatsApp()}>
                    WhatsApp
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <StickyWhatsApp
        href={stickyHref}
        label="WhatsApp"
        onClick={() => trackWhatsAppClick({ cta: "sticky_productos" })}
      />
    </div>
  );
}
