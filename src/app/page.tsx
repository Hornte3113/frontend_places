// ============================================================
// PAGE — Home (Client Component)
// Orquesta los estados: idle, loading, success, error.
// ============================================================
"use client";

import SearchBar from "@/components/SearchBar";
import PlaceCard from "@/components/PlaceCard";
import SkeletonCard from "@/components/SkeletonCard";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyState from "@/components/EmptyState";
import { usePlaces } from "@/hooks/usePlaces";

export default function Home() {
  const { places, status, errorMessage, query, search, reset } = usePlaces();

  return (
    <main className="min-h-screen bg-ink-950 relative overflow-hidden">

      {/* Fondo decorativo — efecto nebulosa */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full
          bg-amber-500/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full
          bg-amber-600/4 blur-[100px]" />
        {/* Grid sutil */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HERO ─────────────────────────────────────── */}
        <header className="pt-16 pb-12 text-center">
          {/* Logotipo */}
          <div className="inline-flex items-center gap-2 mb-8
            px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-display text-amber-400 text-xs font-semibold tracking-widest uppercase">
              Buscador de lugares
            </span>
          </div>

          <h1 className="font-display font-extrabold text-white leading-none tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
            Descubre el{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-amber-400">mundo</span>
              <span className="absolute bottom-1 left-0 right-0 h-2 bg-amber-500/20 rounded-full -z-10" />
            </span>{" "}
            a tu alrededor
          </h1>

          <p className="font-body text-slate-400 text-base max-w-md mx-auto leading-relaxed mb-10">
            Busca restaurantes, museos, parques, cafeterías y mucho más
            en cualquier ciudad del mundo.
          </p>

          {/* SearchBar */}
          <SearchBar onSearch={search} isLoading={status === "loading"} />

          {/* Sugerencias rápidas */}
          {status === "idle" && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {[
                "Restaurantes en CDMX",
                "Museos en Barcelona",
                "Cafeterías en Tuxtla",
                "Parques en Monterrey",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => search(s)}
                  className="
                    text-xs font-body text-slate-500 hover:text-amber-400
                    px-3 py-1.5 rounded-full border border-ink-600 hover:border-amber-500/40
                    bg-ink-800 hover:bg-ink-700
                    transition-all duration-200
                  "
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* ── RESULTADOS ───────────────────────────────── */}
        <section className="pb-20">

          {/* Estado: Loading → skeletons */}
          {status === "loading" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-4 w-48 bg-ink-700 rounded animate-pulse" />
                <div className="h-4 w-20 bg-ink-700 rounded animate-pulse" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          )}

          {/* Estado: Error */}
          {status === "error" && (
            <ErrorMessage
              message={errorMessage ?? "Error de conexión con el servidor."}
              onRetry={reset}
            />
          )}

          {/* Estado: Success con resultados */}
          {status === "success" && places.length > 0 && (
            <div>
              {/* Header de resultados */}
              <div className="flex items-center justify-between mb-6 animate-fade-up">
                <div>
                  <p className="font-body text-slate-400 text-sm">
                    Resultados para{" "}
                    <span className="text-white font-medium">&ldquo;{query}&rdquo;</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-amber-400 font-bold text-sm">
                    {places.length} lugares
                  </span>
                  <button
                    onClick={reset}
                    className="text-xs font-body text-slate-500 hover:text-slate-300
                      transition-colors flex items-center gap-1"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                    Nueva búsqueda
                  </button>
                </div>
              </div>

              {/* Grid de tarjetas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {places.map((place, i) => (
                  <PlaceCard key={place.id} place={place} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Estado: Success sin resultados */}
          {status === "success" && places.length === 0 && (
            <EmptyState query={query} />
          )}

          {/* Estado: Idle — mensaje de bienvenida */}
          {status === "idle" && (
            <div className="flex flex-col items-center justify-center py-24 gap-6 opacity-40">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
                <path d="M3.05 11a9 9 0 1 0 .5-2.5" strokeDasharray="3 3" />
              </svg>
              <p className="font-body text-slate-600 text-sm text-center max-w-xs">
                Escribe una búsqueda arriba para explorar lugares en cualquier ciudad.
              </p>
            </div>
          )}

        </section>
      </div>
    </main>
  );
}
