export interface filterForm {
  maxPrice: number;
  minPrice: number;
  beds: number;
  bathRooms: number;
  typeHouse: string[];
  amenities: amenities;
  hostLanguage: string;
}

export interface amenities {
  essentials: string[];
  features: string[];
  location: string[];
  safety: string[];
}
