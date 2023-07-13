export interface address {
  countryRegion: string;
  locality: string;
  adminDistrict: string;
  countryRegionISO2: string;
  postalCode: string;
  addressLine: string;
  streetName: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  title:string;
  district:string;
}

export interface addressProps {
  address: string;
}
