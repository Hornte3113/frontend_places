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
    <main className="min-h-screen bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <header className="pt-20 pb-12 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-500 mb-6">
            Explora el mundo
          </span>
          <h1 className="text-white font-extrabold tracking-tight leading-tight mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
            Encuentra lugares<br />
            <span className="text-amber-400">cerca de ti</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-sm mx-auto mb-10">
            Restaurantes, museos, parques y más en cualquier ciudad del mundo.
          </p>
          <SearchBar onSearch={search} isLoading={status === "loading"} />

          {status === "idle" && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["Restaurantes en CDMX", "Museos en Barcelona", "Cafeterías en Tuxtla", "Parques en Monterrey"].map((s) => (
                <button
                  key={s}
                  onClick={() => search(s)}
                  className="text-xs text-zinc-500 hover:text-zinc-300 px-3 py-1.5 rounded border border-zinc-800 hover:border-zinc-600 bg-zinc-900 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* RESULTADOS */}
        <section className="pb-16">

          {status === "loading" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {status === "error" && (
            <ErrorMessage message={errorMessage ?? "Error de conexión con el servidor."} onRetry={reset} />
          )}

          {status === "success" && places.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-zinc-400 text-sm">
                  {places.length} resultados para <span className="text-white">&ldquo;{query}&rdquo;</span>
                </p>
                <button
                  onClick={reset}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Nueva búsqueda
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {places.map((place, i) => (
                  <PlaceCard key={place.id} place={place} index={i} />
                ))}
              </div>
            </div>
          )}

          {status === "success" && places.length === 0 && (
            <EmptyState query={query} />
          )}

          {status === "idle" && (
            <div className="flex justify-center py-20">
              <p className="text-zinc-700 text-sm">Escribe algo para empezar.</p>
            </div>
          )}

        </section>
      </div>
    </main>
  );
}
