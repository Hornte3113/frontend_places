// ============================================================
// COMPONENT — PlaceCard (estado Success)
// Tarjeta de un lugar con toda su información relevante.
// ============================================================
import { Place } from "@/types/places.types";

interface PlaceCardProps {
  place: Place;
  index: number;
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          className={
            i < full
              ? "text-amber-400 fill-amber-400"
              : i === full && hasHalf
              ? "text-amber-400 fill-amber-400/50"
              : "text-ink-600 fill-ink-600"
          }
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function OpenStatus({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 text-xs font-body font-medium px-2.5 py-1 rounded-full
        ${isOpen
          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          : "bg-red-500/10 text-red-400 border border-red-500/20"
        }
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-emerald-400" : "bg-red-400"}`} />
      {isOpen ? "Abierto" : "Cerrado"}
    </span>
  );
}

function PriceLevel({ level }: { level: string }) {
  const map: Record<string, { label: string; color: string }> = {
    PRICE_LEVEL_FREE: { label: "Gratis", color: "text-emerald-400" },
    PRICE_LEVEL_INEXPENSIVE: { label: "$", color: "text-amber-300" },
    PRICE_LEVEL_MODERATE: { label: "$$", color: "text-amber-400" },
    PRICE_LEVEL_EXPENSIVE: { label: "$$$", color: "text-amber-500" },
    PRICE_LEVEL_VERY_EXPENSIVE: { label: "$$$$", color: "text-red-400" },
  };
  const info = map[level];
  if (!info) return null;
  return <span className={`text-xs font-bold font-display ${info.color}`}>{info.label}</span>;
}

export default function PlaceCard({ place, index }: PlaceCardProps) {
  const delay = `${index * 60}ms`;
  const typeLabel = place.types?.[0]
    ?.replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <article
      className="
        group rounded-2xl bg-ink-800 border border-ink-600
        hover:border-amber-500/40 hover:bg-ink-700
        transition-all duration-300 overflow-hidden
        opacity-0 animate-fade-up
        flex flex-col
      "
      style={{ animationDelay: delay, animationFillMode: "forwards" }}
    >
      {/* Imagen / placeholder visual */}
      <div className="relative h-44 bg-gradient-to-br from-ink-700 to-ink-900 overflow-hidden flex-shrink-0">
        {/* Grid decorativo tipo mapa */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(var(--tw-gradient-from) 1px, transparent 1px), linear-gradient(90deg, var(--tw-gradient-from) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            "--tw-gradient-from": "#fbbf24",
          } as React.CSSProperties}
        />
        {/* Pin central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center
              group-hover:scale-110 transition-transform duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-500/40 rounded-full blur-sm" />
          </div>
        </div>

        {/* Tipo de lugar (badge) */}
        {typeLabel && (
          <div className="absolute top-3 left-3">
            <span className="text-xs font-body text-slate-400 bg-ink-950/70 backdrop-blur-sm px-2 py-1 rounded-md border border-ink-600">
              {typeLabel}
            </span>
          </div>
        )}

        {/* Precio */}
        {place.priceLevel && (
          <div className="absolute top-3 right-3 bg-ink-950/70 backdrop-blur-sm px-2 py-1 rounded-md border border-ink-600">
            <PriceLevel level={place.priceLevel} />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Nombre */}
        <h3 className="font-display font-bold text-white text-base leading-snug line-clamp-2 group-hover:text-amber-400 transition-colors duration-200">
          {place.displayName.text}
        </h3>

        {/* Dirección */}
        <p className="font-body text-slate-400 text-xs leading-relaxed line-clamp-2 flex items-start gap-1.5">
          <svg className="mt-0.5 flex-shrink-0 text-slate-500" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
          </svg>
          {place.formattedAddress}
        </p>

        {/* Footer: rating + estado */}
        <div className="mt-auto pt-3 border-t border-ink-600 flex items-center justify-between gap-2">
          {place.rating ? (
            <div className="flex items-center gap-2">
              <StarRating rating={place.rating} />
              <span className="font-display font-bold text-amber-400 text-sm">
                {place.rating.toFixed(1)}
              </span>
              {place.userRatingCount && (
                <span className="text-slate-500 text-xs font-body">
                  ({place.userRatingCount.toLocaleString()})
                </span>
              )}
            </div>
          ) : (
            <span className="text-slate-600 text-xs font-body">Sin reseñas</span>
          )}

          {place.regularOpeningHours && (
            <OpenStatus isOpen={place.regularOpeningHours.openNow} />
          )}
        </div>

        {/* Links opcionales */}
        {(place.websiteUri || place.internationalPhoneNumber) && (
          <div className="flex items-center gap-3 pt-1">
            {place.websiteUri && (
              <a
                href={place.websiteUri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-body text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15,3 21,3 21,9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Sitio web
              </a>
            )}
            {place.internationalPhoneNumber && (
              <span className="text-xs font-body text-slate-500">
                {place.internationalPhoneNumber}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
