export interface address {
  countryRegion: string;
  locality: string;
  adminDistrict: string;
  adminDistrict2: string;
  countryRegionIso2: string;
  houseNumber: string;
  postalCode: string;
  addressLine: string;
  streetName: string;
  formattedAddress: string;
  latitude: string;
  longitude: string;
}

export interface addressProps {
  address: string;
}
