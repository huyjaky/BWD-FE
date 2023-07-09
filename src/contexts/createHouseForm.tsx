import { house_ } from "@/models/house";
import { ReactNode, createContext, useState } from "react";



interface createHouseFormProps {
  children: ReactNode
}

interface createHouseData {
  createHouseForm: house_ | undefined;
  emptyCreateHouseForm: house_ | undefined;
  setCreateHouseForm: (payload: house_) => void
}

const createHouseDataDefault: createHouseData = {
  createHouseForm: {
    address: {
      countryRegion: '',
      locality: '',
      adminDistrict: '',
      countryRegionIso2: '',
      postalCode: '',
      addressLine: '',
      streetName: '',
      formattedAddress: '',
      latitude: 0,
      longitude: 0,
      title: ''
    },
    AddressId: '', //
    Area: '', //
    arrImg: [],
    Capacity: 0, //
    DateUp: new Date(), //
    Description: '', //
    HouseId: '',
    IsFavorite: false,
    JudicalId: '',
    NumsOfBath: 0, //
    NumsOfBed: 0, //
    Orientation: '',
    placeOffer: [], //
    PostBy: '', //
    Price: 0, //
    Title: '', //
    Type: '',
    useracc: {
      UserId: '',
      UserName: '',
      Password: '',
      Birth: new Date(),
      Gmail: '',
      Sex: '',
      Decentralization: '',
      PersonCode: '',
      CustomerType: '',
      Image: '',
      error: '',
      Phone: ''
    }
  },
  emptyCreateHouseForm: {
    address: {
      countryRegion: '',
      locality: '',
      adminDistrict: '',
      countryRegionIso2: '',
      postalCode: '',
      addressLine: '',
      streetName: '',
      formattedAddress: '',
      latitude: 0,
      longitude: 0,
      title: ''
    },
    AddressId: '', //
    Area: '', //
    arrImg: [],
    Capacity: 0, //
    DateUp: new Date(), //
    Description: '', //
    HouseId: '',
    IsFavorite: false,
    JudicalId: '',
    NumsOfBath: 0, //
    NumsOfBed: 0, //
    Orientation: '',
    placeOffer: [], //
    PostBy: '', //
    Price: 0, //
    Title: '', //
    Type: '',
    useracc: {
      UserId: '',
      UserName: '',
      Password: '',
      Birth: new Date(),
      Gmail: '',
      Sex: '',
      Decentralization: '',
      PersonCode: '',
      CustomerType: '',
      Image: '',
      error: '',
      Phone: ''
    },
  },
  setCreateHouseForm: () => { }
}

export const createHouseFormContext = createContext<createHouseData>(createHouseDataDefault);

const CreateHouseFormProvider = ({ children }: createHouseFormProps) => {
  const [createHouseForm, setSelectHouse_] = useState<house_ | undefined>(createHouseDataDefault.createHouseForm);
  const [emptyCreateHouseForm, setEmptyCreateHouseForm_] = useState<house_ | undefined>(createHouseDataDefault.emptyCreateHouseForm)
  const setCreateHouseForm = (payload: house_) => setSelectHouse_(payload);

  const selectHouseDynamicData = { createHouseForm, emptyCreateHouseForm, setCreateHouseForm };

  return <createHouseFormContext.Provider value={selectHouseDynamicData}>
    {children}
  </createHouseFormContext.Provider>
}

export default CreateHouseFormProvider;