# act6-c2-frontend

Frontend de PlaceScope — Explorador de Lugares usando Google Places API (New)  
**Universidad Politécnica de Chiapas — ACT6-C2 AWOS**

## Arquitectura

```
src/
├── app/
│   ├── layout.tsx          → Layout raíz (metadata, fuentes)
│   ├── page.tsx            → Página principal — orquesta estados UI
│   └── globals.css         → Estilos globales + Tailwind
├── components/
│   ├── SearchBar.tsx       → Input de búsqueda con loading state
│   ├── PlaceCard.tsx       → Tarjeta de un lugar (estado success)
│   ├── SkeletonCard.tsx    → Placeholder animado (estado loading)
│   ├── ErrorMessage.tsx    → Mensaje de error amigable
│   └── EmptyState.tsx      → Sin resultados
├── hooks/
│   └── usePlaces.ts        → Hook: maneja fetch + estados (idle/loading/success/error)
├── lib/
│   └── api.ts              → Cliente HTTP al backend (NUNCA llama a Google directo)
└── types/
    └── places.types.ts     → Interfaces TypeScript
```

## Estados de UI implementados

| Estado | Componente | Cuándo |
|--------|-----------|--------|
| `idle` | Mensaje de bienvenida | App recién cargada |
| `loading` | 6× `SkeletonCard` | Mientras el backend responde |
| `success` | Grid de `PlaceCard` | Datos recibidos correctamente |
| `error` | `ErrorMessage` | Backend caído o error de red |

## Setup local

```bash
npm install
cp .env.example .env.local
# Editar NEXT_PUBLIC_BACKEND_URL con la URL de tu backend
npm run dev
# → http://localhost:3000
```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_BACKEND_URL` | URL del backend proxy (default: http://localhost:3001) |

