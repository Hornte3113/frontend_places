
// COMPONENT — ErrorMessage (estado Error)
// Mensaje amigable cuando el backend o la red falla.
// La app NO se rompe; muestra esto en su lugar.
interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-up">
      {/* Icono */}
      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h3 className="font-display font-bold text-white text-lg mb-2">
        Algo salió mal
      </h3>

      <p className="font-body text-slate-400 text-sm max-w-sm leading-relaxed mb-6">
        {message}
      </p>

      <button
        onClick={onRetry}
        className="
          px-5 py-2.5 rounded-lg
          border border-red-500/30 text-red-400 hover:bg-red-500/10
          font-body text-sm transition-all duration-200
          hover:border-red-500/60
        "
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
