import React, { useMemo, useState } from "react";
import Badge from "./Badge";
import { StockItem } from "../data/stock";

export default function StockCard({
  item,
  onWhatsApp,
}: {
  item: StockItem;
  onWhatsApp: (item: StockItem) => void;
}) {
  const images = useMemo(() => {
    const fromItem = (item as any).imageUrls as string[] | undefined;
    const arr = Array.isArray(fromItem) && fromItem.length ? fromItem : (item.imageUrl ? [item.imageUrl] : []);
    if (arr.length) return arr;

    // placeholders por categoría
    const ph =
      item.category === "Accesorios"
        ? "/products/placeholder-accessory.svg"
        : item.category === "Servicios"
        ? "/products/placeholder-service.svg"
        : "/products/placeholder-phone.svg";

    return [ph];
  }, [item]);

  const [idx, setIdx] = useState(0);
  const current = images[Math.min(idx, images.length - 1)] ?? images[0];

  const prev = () => setIdx((v) => (v - 1 + images.length) % images.length);
  const next = () => setIdx((v) => (v + 1) % images.length);

  const [startX, setStartX] = useState<number | null>(null);

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (images.length <= 1) return;
    setStartX(e.clientX);
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (images.length <= 1) return;
    if (startX === null) return;
    const dx = e.clientX - startX;
    setStartX(null);
    if (Math.abs(dx) < 35) return;
    if (dx > 0) prev();
    else next();
  };

  return (
    <div className="card stockCard">
      <div className="stockMedia" style={{ ["--bgimg" as any]: `url(${current})` }} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <img className="stockImg" src={current} alt={item.name} loading="lazy" />
        {images.length > 1 ? (
          <>
            <button className="carouselBtn prev" type="button" aria-label="Anterior" onClick={prev}>
              ‹
            </button>
            <button className="carouselBtn next" type="button" aria-label="Siguiente" onClick={next}>
              ›
            </button>
            <div className="carouselDots" aria-hidden="true">
              {images.map((_, i) => (
                <span key={i} className={"dot " + (i === idx ? "active" : "")} />
              ))}
            </div>
          </>
        ) : null}
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
        <button className="btn btnPrimary stockBtn" onClick={() => onWhatsApp(item)}>
          Consultar por WhatsApp
        </button>
      </div>
    </div>
  );
}
