export function buildWhatsAppUrl(phoneE164NoPlus: string, message: string) { const text = encodeURIComponent(message); return `https://wa.me/${phoneE164NoPlus}?text=${text}`; }
