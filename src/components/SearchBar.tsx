// ============================================================
// COMPONENT — SearchBar
// Input de búsqueda con botón y soporte para Enter.
// ============================================================
"use client";

import { useState, KeyboardEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim() && !isLoading) onSearch(value.trim());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="relative flex items-center gap-3 w-full max-w-2xl mx-auto">
      {/* Icono lupa */}
      <div className="absolute left-4 text-amber-500 pointer-events-none">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Busca restaurantes, museos, parques…"
        disabled={isLoading}
        className="
          w-full pl-12 pr-4 py-4 rounded-xl
          bg-ink-800 border border-ink-600
          text-white placeholder-slate-500
          font-body text-sm
          focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      />

      <button
        onClick={handleSubmit}
        disabled={isLoading || !value.trim()}
        className="
          flex-shrink-0 px-6 py-4 rounded-xl
          bg-amber-500 hover:bg-amber-400
          text-ink-950 font-display font-bold text-sm tracking-wide
          transition-all duration-200
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:shadow-lg hover:shadow-amber-500/20
          active:scale-95
        "
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin-slow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Buscando
          </span>
        ) : (
          "Explorar"
        )}
      </button>
    </div>
  );
}
