export type UTM = Partial<
  Record<
    "utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term",
    string
  >
>;

const LS_KEY = "techxto:first_touch_utm";

export function readUtmFromUrl(url: string): UTM {
  try {
    const u = new URL(url);
    const p = u.searchParams;
    const utm: UTM = {};
    (["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const).forEach((k) => {
      const v = p.get(k);
      if (v) utm[k] = v;
    });
    return utm;
  } catch {
    return {};
  }
}

export function persistFirstTouchUtm(currentUrl: string) {
  const existing = getFirstTouchUtm();
  if (existing && Object.keys(existing).length) return;

  const utm = readUtmFromUrl(currentUrl);
  if (!Object.keys(utm).length) return;

  try {
    localStorage.setItem(LS_KEY, JSON.stringify(utm));
  } catch {}
}

export function getFirstTouchUtm(): UTM {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UTM;
  } catch {
    return {};
  }
}

export function mergeUtm(...parts: UTM[]): UTM {
  return Object.assign({}, ...parts);
}
