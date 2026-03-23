// ============================================================
// COMPONENT — SkeletonCard (estado Loading)
// Shimmer placeholder mientras llegan los datos.
// ============================================================
export default function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-ink-800 border border-ink-600 overflow-hidden animate-pulse">
      {/* Imagen placeholder */}
      <div className="h-44 bg-ink-700" />
      <div className="p-5 space-y-3">
        {/* Nombre */}
        <div className="h-5 bg-ink-700 rounded-lg w-3/4" />
        {/* Dirección */}
        <div className="h-3 bg-ink-700 rounded w-full" />
        <div className="h-3 bg-ink-700 rounded w-2/3" />
        {/* Rating */}
        <div className="flex items-center gap-2 pt-1">
          <div className="h-4 w-16 bg-ink-700 rounded" />
          <div className="h-4 w-10 bg-ink-700 rounded" />
        </div>
      </div>
    </div>
  );
}
