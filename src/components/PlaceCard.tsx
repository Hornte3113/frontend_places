import Image from "next/image";
import { Place } from "@/types/places.types";
import { buildPhotoUrl } from "@/lib/api";

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
              ? "fill-amber-400 text-amber-400"
              : i === full && hasHalf
              ? "fill-amber-400/50 text-amber-400"
              : "fill-zinc-600 text-zinc-600"
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
      className={`text-xs font-medium px-2 py-0.5 rounded ${
        isOpen ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
      }`}
    >
      {isOpen ? "Abierto" : "Cerrado"}
    </span>
  );
}

function PriceLevel({ level }: { level: string }) {
  const map: Record<string, string> = {
    PRICE_LEVEL_FREE: "Gratis",
    PRICE_LEVEL_INEXPENSIVE: "$",
    PRICE_LEVEL_MODERATE: "$$",
    PRICE_LEVEL_EXPENSIVE: "$$$",
    PRICE_LEVEL_VERY_EXPENSIVE: "$$$$",
  };
  const label = map[level];
  if (!label) return null;
  return <span className="text-xs text-zinc-400">{label}</span>;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  const typeLabel = place.types?.[0]
    ?.replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <article className="rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col hover:border-zinc-700 transition-colors duration-200">

      {/* Imagen */}
      <div className="relative h-44 bg-zinc-800 flex-shrink-0">
        {place.photos && place.photos.length > 0 ? (
          <Image
            src={buildPhotoUrl(place.photos[0].name, 600)}
            alt={place.displayName.text}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="1.5">
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
        )}

        {typeLabel && (
          <span className="absolute top-2 left-2 text-xs text-zinc-300 bg-zinc-900/80 px-2 py-0.5 rounded">
            {typeLabel}
          </span>
        )}
        {place.priceLevel && (
          <span className="absolute top-2 right-2 text-xs text-zinc-300 bg-zinc-900/80 px-2 py-0.5 rounded">
            <PriceLevel level={place.priceLevel} />
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2">
          {place.displayName.text}
        </h3>

        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
          {place.formattedAddress}
        </p>

        <div className="mt-auto pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
          {place.rating ? (
            <div className="flex items-center gap-1.5">
              <StarRating rating={place.rating} />
              <span className="text-zinc-300 text-xs">{place.rating.toFixed(1)}</span>
              {place.userRatingCount && (
                <span className="text-zinc-600 text-xs">({place.userRatingCount.toLocaleString()})</span>
              )}
            </div>
          ) : (
            <span className="text-zinc-600 text-xs">Sin reseñas</span>
          )}

          {place.regularOpeningHours && (
            <OpenStatus isOpen={place.regularOpeningHours.openNow} />
          )}
        </div>

        {(place.websiteUri || place.internationalPhoneNumber) && (
          <div className="flex items-center gap-3">
            {place.websiteUri && (
              <a
                href={place.websiteUri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-500 hover:text-amber-400 transition-colors"
              >
                Sitio web
              </a>
            )}
            {place.internationalPhoneNumber && (
              <span className="text-xs text-zinc-500">{place.internationalPhoneNumber}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
