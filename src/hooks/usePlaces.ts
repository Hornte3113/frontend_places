
// HOOK — usePlaces
// Encapsula el estado de búsqueda: loading, success, error.
// Los componentes solo consumen este hook; no manejan fetch.

"use client";

import { useState, useCallback } from "react";
import { Place, FetchStatus } from "@/types/places.types";
import { searchPlaces } from "@/lib/api";

interface UsePlacesReturn {
  places: Place[];
  status: FetchStatus;
  errorMessage: string | null;
  query: string;
  search: (q: string) => Promise<void>;
  reset: () => void;
}

export function usePlaces(): UsePlacesReturn {
  const [places, setPlaces] = useState<Place[]>([]);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const search = useCallback(async (q: string) => {
    if (!q.trim()) return;

    setQuery(q);
    setStatus("loading");
    setErrorMessage(null);
    setPlaces([]);

    try {
      const response = await searchPlaces(q);

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "No se recibieron datos del servidor.");
      }

      setPlaces(response.data);
      setStatus("success");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Ocurrió un error inesperado. Intenta de nuevo.";
      setErrorMessage(message);
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setPlaces([]);
    setStatus("idle");
    setErrorMessage(null);
    setQuery("");
  }, []);

  return { places, status, errorMessage, query, search, reset };
}
