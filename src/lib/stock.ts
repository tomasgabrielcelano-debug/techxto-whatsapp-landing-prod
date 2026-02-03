import { StockItem } from "../data/stock";

export type StockFilters = {
  q: string;
  category: string | "Todas";
};

export function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

export function matchesQuery(item: StockItem, qRaw: string) {
  const q = normalize(qRaw);
  if (!q) return true;

  const hay = [
    item.name,
    item.category,
    item.condition ?? "",
    item.price ?? "",
    item.notes ?? "",
    ...(item.tags ?? []),
    item.badge ?? "",
  ]
    .join(" ")
    .toString();

  return normalize(hay).includes(q);
}

export function applyFilters(items: StockItem[], filters: StockFilters) {
  return items.filter((it) => {
    if (filters.category !== "Todas" && it.category !== filters.category) return false;
    if (!matchesQuery(it, filters.q)) return false;
    return true;
  });
}
