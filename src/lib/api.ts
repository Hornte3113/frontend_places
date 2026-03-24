
import { PlacesApiResponse, PlaceDetailApiResponse } from "@/types/places.types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

//Busca lugares por texto consultando el back

export async function searchPlaces(textQuery: string): Promise<PlacesApiResponse> {
  const res = await fetch(`${BACKEND_URL}/api/places/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ textQuery, maxResultCount: 12 }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error ?? `Error del servidor: ${res.status}`);
  }

  return res.json() as Promise<PlacesApiResponse>;
}

 //Obtiene el detalle de un lugar por ID.
 
export async function getPlaceDetail(placeId: string): Promise<PlaceDetailApiResponse> {
  const res = await fetch(`${BACKEND_URL}/api/places/${placeId}`, {
    method: "GET",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error ?? `Error del servidor: ${res.status}`);
  }

  return res.json() as Promise<PlaceDetailApiResponse>;
}


export function buildPhotoUrl(photoName: string, maxWidth = 400): string {
  // el photoName ya viene con el formato "places/XXX/photos/YYY"
  return `${BACKEND_URL}/api/places/photo/${photoName}?maxWidth=${maxWidth}`;
}
