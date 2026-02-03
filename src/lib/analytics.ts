import { GA4_ID, META_PIXEL_ID } from "../config";
import { getFirstTouchUtm, readUtmFromUrl, mergeUtm } from "./utm";

function loadScriptOnce(src: string, id: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function initAnalytics() {
  // GA4
  if (GA4_ID) {
    loadScriptOnce(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`, "ga4-gtag");

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer!.push(arguments); };

    window.gtag("js", new Date());
    window.gtag("config", GA4_ID, { send_page_view: true });
  }

  // Meta Pixel
  if (META_PIXEL_ID && !window.fbq) {
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    window.fbq?.("init", META_PIXEL_ID);
    window.fbq?.("track", "PageView");
  }
}

export function trackPageView(path: string) {
  if (GA4_ID && window.gtag) window.gtag("event", "page_view", { page_path: path });
  if (META_PIXEL_ID && window.fbq) window.fbq("track", "PageView");
}

export function trackWhatsAppClick(extra?: Record<string, any>) {
  const current = readUtmFromUrl(window.location.href);
  const first = getFirstTouchUtm();
  const utm = mergeUtm(first, current);

  if (GA4_ID && window.gtag) {
    window.gtag("event", "generate_lead", { method: "whatsapp", ...utm, ...extra });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq("track", "Contact", { method: "whatsapp", ...utm, ...extra });
  }
}
