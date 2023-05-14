import { ReactNode, createContext, useState } from "react";



interface filterFormAnimateProps {
  children: ReactNode;
}

interface filterFormAnimateData{
  isClickOutSide: boolean
  setIsClickOutSide: (payload: boolean) => void
}

const filterFormAnimateDataDefault:filterFormAnimateData = {
  isClickOutSide: false,
  setIsClickOutSide: () => {}
}

export const filterFormAnimateContext = createContext<filterFormAnimateData>(filterFormAnimateDataDefault);

const FilterFormAnimateProvider = ({children}: filterFormAnimateProps) => {
  const [isClickOutSide, setIsClickOutSide_] = useState(filterFormAnimateDataDefault.isClickOutSide);
  const setIsClickOutSide = (payload: boolean) => setIsClickOutSide_(payload);

  const filterFormAnimateDynamicData = {isClickOutSide, setIsClickOutSide};

  return <filterFormAnimateContext.Provider value={filterFormAnimateDynamicData}>
    {children}
  </filterFormAnimateContext.Provider>
}
export default FilterFormAnimateProvider;