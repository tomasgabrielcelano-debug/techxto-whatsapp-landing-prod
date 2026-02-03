# TechXto – Landing (React) para cerrar por WhatsApp (atiendo desde casa)

Este build deja claro que:
- **Atendés desde tu casa**
- **Con turno**
- Priorizás cercanía para respuesta rápida

Rutas:
- `/` landing
- `/zonas` cobertura (ZONA A / ZONA B / ZONA C)
- `/garantia` 10 líneas
- `/productos` catálogo (consulta por WhatsApp)

## Config
Copiá `.env.example` a `.env` y completá:
- `VITE_WHATSAPP_PHONE`
- `VITE_MAP_*` (ideal: una esquina/lugar cercano sin doxxear tu casa)
- `VITE_GA4_ID` y `VITE_META_PIXEL_ID`

## Eventos
- GA4: `generate_lead` al click de WhatsApp
- Pixel: `Contact` al click de WhatsApp
Incluye UTMs first-touch + current si existen.

## Deploy
Estático: build `npm run build` → `dist/`
Docker: `docker compose up --build -d`

## Equipos mojados / No enciende
- Equipos mojados: diagnóstico + limpieza (ultrasonido). Sin garantía de recuperación.
- No enciende/placa: puede tercerizarse con técnico especializado.

## Catálogo (/productos)
- Ruta: `/productos` (y `/stock` redirige acá)
- Datos: `src/data/stock.ts` (lista simple)
- CTA: cada item abre WhatsApp con mensaje precargado.
- Fotos: poné las imágenes en `public/products/` y en cada item agregá `imageUrl` (ej: `/products/iphone13.jpg`).
- Sin checkout (solo consulta).

### Nota (build en Linux/containers)
Este proyecto llama Vite via `node ./node_modules/vite/bin/vite.js` para evitar problemas de permisos con `.bin` al descomprimir ZIP.
