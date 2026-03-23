// ============================================================
// TIPOS — Espejo de los contratos del backend
// El frontend conoce la forma de los datos que recibe,
// pero NO sabe nada de Google Places directamente.
// ============================================================

export interface PlaceDisplayName {
  text: string;
  languageCode: string;
}

export interface PlaceLocation {
  latitude: number;
  longitude: number;
}

export interface PlacePhoto {
  name: string;
  widthPx: number;
  heightPx: number;
}

export interface PlaceOpeningHours {
  openNow: boolean;
  weekdayDescriptions?: string[];
}

export interface Place {
  id: string;
  displayName: PlaceDisplayName;
  formattedAddress: string;
  location: PlaceLocation;
  rating?: number;
  userRatingCount?: number;
  types?: string[];
  regularOpeningHours?: PlaceOpeningHours;
  photos?: PlacePhoto[];
  internationalPhoneNumber?: string;
  websiteUri?: string;
  priceLevel?: string;
  businessStatus?: string;
}

export interface PlacesApiResponse {
  success: boolean;
  data?: Place[];
  error?: string;
}

export interface PlaceDetailApiResponse {
  success: boolean;
  data?: Place;
  error?: string;
}

// Estados de la UI
export type FetchStatus = "idle" | "loading" | "success" | "error";
