import { ReactNode, useState, createContext, useReducer } from 'react';

interface Children {
  children: ReactNode;
}

type Action = {
  type: string;
  payload: any;
}

export type houseDataType = {
  [key: string]: any;
  type: string;
  place: string;
  address: string;
  addressConfirmation: {
    country: string;
    subAddress: string[];
    city: string;
    province: string;
    postCode: string;
  };
  placeInfo: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    hasLock: 'yes' | 'no' | null;
  };
  kindOfBathrooms: {
    private: number;
    dedicated: number;
    shared: number;
  };
  encounter: string;
  amenities: string[];
  title: string;
  description: string;
  guest: string;
  price: number;
  note: {
    camera: boolean;
    weapons: boolean;
    dangerAnimals: boolean;
  };
};

const initHouseData: houseDataType = {
  type: '',
  place: '',
  address: '',
  addressConfirmation: {
    country: '',
    subAddress: [],
    city: '',
    province: '',
    postCode: '',
  },
  placeInfo: {
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    hasLock: null,
  },
  kindOfBathrooms: {
    private: 0,
    dedicated: 0,
    shared: 0,
  },
  encounter: '',
  amenities: [],
  title: '',
  description: '',
  guest: '',
  price: 0,
  note: {
    camera: false,
    weapons: false,
    dangerAnimals: false,
  }
}

const newHouseContext = createContext<{ state: houseDataType; dispatch: React.Dispatch<Action> }>({
  state: initHouseData,
  dispatch: () => {}
});


function reducer(state: houseDataType, action: Action): houseDataType {
  switch (action.type) {
    case 'STEP2':
      return {
        ...state,
        type: action.payload
      };
    case 'STEP3':
      return {
        ...state,
        place: action.payload
      };
    case 'STEP4':
      return {
        ...state,
        address: action.payload
      };
    case 'STEP5':
      return {
        ...state,
        addressConfirmation: {
          country: action.payload.country,
          subAddress: action.payload.subAddress,
          city: action.payload.city,
          province: action.payload.province,
          postCode: action.payload.postCode
        }
      };
    case 'STEP6':
      return {
        ...state,
        placeInfo: {
          guests: action.payload.guests,
          bedrooms: action.payload.bedrooms,
          beds: action.payload.beds,
          bathrooms: action.payload.bathrooms,
          hasLock: action.payload.hasLock
        }
      };
    case 'STEP7':
      return {
        ...state,
        kindOfBathrooms: {
          private: action.payload.private,
          dedicated: action.payload.dedicated,
          shared: action.payload.shared
        }
      };
    case 'STEP8':
      return {
        ...state,
        encounter: action.payload
      };
    case 'STEP10':
      return {
        ...state,
        amenities: action.payload
      };
    // case 'STEP11':
    //   return {
    //   };
    case 'STEP12':
      return {
        ...state,
        title: action.payload
      };
    case 'STEP13':
      return {
        ...state,
        description: action.payload
      };
    case 'STEP15':
      return {
        ...state,
        guest: action.payload
      };
    case 'STEP16':
      return {
        ...state,
        price: action.payload
      };
    case 'STEP17':
      return {
        ...state,
        note: {
          camera: action.payload.camera,
          weapons: action.payload.weapons,
          dangerAnimals: action.payload.dangerAnimals
        }
      };
    default:
      return state;
  }
}

function CreateHouseProvider({ children }: Children) {
  const [state, dispatch] = useReducer(reducer, initHouseData);

  return <newHouseContext.Provider value={{ state, dispatch }}>{children}</newHouseContext.Provider>;
}

export { newHouseContext, CreateHouseProvider };
