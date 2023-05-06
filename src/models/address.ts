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

  checkInDay: Date;
  checkOutDay: Date;

  guest: {
    adults: number;
    childrens: number;
    infants: number;
  };
}

export interface addressProps {
  address: string;
}
