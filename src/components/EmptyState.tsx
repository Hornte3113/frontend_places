// ============================================================
// COMPONENT — EmptyState
// Se muestra cuando la búsqueda no retorna resultados.
// ============================================================
interface EmptyStateProps {
  query: string;
}

export default function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-up">
      <div className="w-16 h-16 rounded-full bg-ink-700 border border-ink-600 flex items-center justify-center mb-5">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M8 11h6M11 8v6" strokeDasharray="2 2" />
        </svg>
      </div>

      <h3 className="font-display font-bold text-white text-lg mb-2">
        Sin resultados
      </h3>
      <p className="font-body text-slate-400 text-sm max-w-xs leading-relaxed">
        No encontramos lugares para{" "}
        <span className="text-amber-400 font-medium">&ldquo;{query}&rdquo;</span>.
        Intenta con otra búsqueda.
      </p>
    </div>
  );
}
