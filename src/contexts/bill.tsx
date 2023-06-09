import { ReactNode, createContext, useState } from 'react';

interface BillContextProps {
  children: ReactNode;
}

interface Bill {
  checkInDay: Date;
  image: string;
  title: string;
  formatedAddress: string;
  price: number;
  guest: {
    adults: number;
    childrens: number;
    infants: number;
  };
}

interface BillContextData {
  Bill: Bill;
  setBill: (payload: Bill) => void;
}

const BillContextDataDefault: BillContextData = {
  Bill: {
    image: '',
    title: '',
    formatedAddress: '',
    price: 0,
    checkInDay: new Date(),
    guest: {
      adults: 0,
      childrens: 0,
      infants: 0
    }
  },
  setBill: () => {}
};

export const BillContext = createContext<BillContextData>(BillContextDataDefault);

const BillProvider = ({ children }: BillContextProps) => {
  const [Bill, setBill_] = useState(BillContextDataDefault.Bill);
  const setBill = (payload: Bill) => setBill_(payload);

  const dynamicBillData = { Bill, setBill };

  return <BillContext.Provider value={dynamicBillData}>{children}</BillContext.Provider>;
};

export default BillProvider;
