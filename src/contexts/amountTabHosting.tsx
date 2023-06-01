import { ReactNode, createContext, useState } from "react";

interface AmountTabHostingProps {
  children: ReactNode
}

interface AmountTabHostingData {
  currentHosting: number,
  setCurrentHosting: (payload: number) => void
}

const AmountTabHostingDataDefault: AmountTabHostingData = {
  currentHosting: 0,
  setCurrentHosting: ()=>{},
}

export const AmountTabHostingContext = createContext<AmountTabHostingData>(AmountTabHostingDataDefault)

const AmountTabHostingProviders = ({children}: AmountTabHostingProps) =>{
  const [currentHosting, setCurrentHosting_] = useState(AmountTabHostingDataDefault.currentHosting);
  const setCurrentHosting = (payload: number) => setCurrentHosting_(payload);

  const AmountCurrentHostingDynamicData = {currentHosting, setCurrentHosting};
  return  <AmountTabHostingContext.Provider value={AmountCurrentHostingDynamicData}>
    {children}
  </AmountTabHostingContext.Provider>
}

export default AmountTabHostingProviders