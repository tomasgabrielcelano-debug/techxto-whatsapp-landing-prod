import React from "react";

export default function StockFilters({
  q,
  setQ,
  category,
  setCategory,
  categories,
}: {
  q: string;
  setQ: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  categories: string[];
}) {
  return (
    <div className="stockFilters">
      <label className="field">
        <span>Buscar</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ej: iPhone 13, funda, Redmi, sellado..."
          autoComplete="off"
        />
      </label>

      <div className="stockCats">
        <button
          className={"catBtn " + (category === "Todas" ? "active" : "")}
          onClick={() => setCategory("Todas")}
          type="button"
        >
          Todas
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={"catBtn " + (category === c ? "active" : "")}
            onClick={() => setCategory(c)}
            type="button"
          >
            {c.replace("Celulares - ", "")}
          </button>
        ))}
      </div>
    </div>
  );
}
