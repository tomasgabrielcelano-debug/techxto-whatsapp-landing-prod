import React from "react";
import Badge from "./Badge";
import { StockItem } from "../data/stock";

export default function StockCard({
  item,
  onWhatsApp,
}: {
  item: StockItem;
  onWhatsApp: (item: StockItem) => void;
}) {
  const img = item.imageUrl
    || (item.category === "Accesorios" ? "/products/placeholder-accessory.svg"
    : item.category === "Servicios" ? "/products/placeholder-service.svg"
    : "/products/placeholder-phone.svg");

  return (
    <div className="card stockCard">
      <div className="stockMedia">
        <img className="stockImg" src={img} alt={item.name} loading="lazy" />
      </div>
      <div className="stockTop">
        <div>
          <h3 className="h3" style={{ marginTop: 0, marginBottom: 6 }}>
            {item.name}
          </h3>

          <div className="muted stockMeta">
            <span>{item.category}</span>
            {item.condition ? <span className="dotSep">•</span> : null}
            {item.condition ? <span>{item.condition}</span> : null}
          </div>
        </div>

        {item.badge ? <Badge>{item.badge}</Badge> : null}
      </div>

      {item.tags?.length ? (
        <div className="chips" style={{ marginTop: 10 }}>
          {item.tags.slice(0, 6).map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {item.notes ? (
        <p className="muted" style={{ marginTop: 12, marginBottom: 0 }}>
          {item.notes}
        </p>
      ) : null}

      <div className="stockBottom">
        <div className="stockPrice">{item.price ?? "Consultar"}</div>
        <button className="btn btnPrimary" onClick={() => onWhatsApp(item)}>
          Consultar por WhatsApp
        </button>
      </div>
    </div>
  );
}
