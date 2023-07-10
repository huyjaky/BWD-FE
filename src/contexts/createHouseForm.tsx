import { address } from "@/models/address";
import { house_ } from "@/models/house";
import { ReactNode, createContext, useState } from "react";



interface createHouseFormProps {
  children: ReactNode
}

interface createHouseData {
  createHouseForm: house_ | undefined;
  emptyCreateHouseForm: house_ | undefined;
  setCreateHouseForm: (payload: house_) => void;
  typeHouseId: string[];
  setTypeHouseId: (payload: string[]) => void;
  imgArr: any;
  setImgArr: (payload: any) => void;
  Address: address;
  setAddress: (payload: address) => void;
}

const createHouseDataDefault: createHouseData = {
  Address: {
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
  setAddress: ()=>{},
  typeHouseId: [],
  setTypeHouseId: () => { },
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
  imgArr: [],
  setCreateHouseForm: () => { },
  setImgArr: () => { }
}

export const createHouseFormContext = createContext<createHouseData>(createHouseDataDefault);

const CreateHouseFormProvider = ({ children }: createHouseFormProps) => {
  const [createHouseForm, setSelectHouse_] = useState<house_ | undefined>(createHouseDataDefault.createHouseForm);
  const [emptyCreateHouseForm, setEmptyCreateHouseForm_] = useState<house_ | undefined>(createHouseDataDefault.emptyCreateHouseForm)
  const [typeHouseId, setTypeHouseId_] = useState<string[]>(createHouseDataDefault.typeHouseId);
  const [imgArr, setImgArr_] = useState<any>(createHouseDataDefault.imgArr);
  const [Address, setAddress_] = useState<address>(createHouseDataDefault.Address);
  const setCreateHouseForm = (payload: house_) => setSelectHouse_(payload);
  const setTypeHouseId = (payload: string[]) => setTypeHouseId_(payload);
  const setImgArr = (payload: any) => setImgArr_(payload);
  const setAddress = (payload:address) => setAddress_(payload);

  const selectHouseDynamicData = {
    createHouseForm, emptyCreateHouseForm, setCreateHouseForm, typeHouseId, setTypeHouseId,
    imgArr, setImgArr, Address, setAddress
  };

  return <createHouseFormContext.Provider value={selectHouseDynamicData}>
    {children}
  </createHouseFormContext.Provider>
}

export default CreateHouseFormProvider;