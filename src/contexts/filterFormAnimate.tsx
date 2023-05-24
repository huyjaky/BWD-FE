import { ReactNode, createContext, useState } from 'react';

interface filterFormAnimateProps {
  children: ReactNode;
}

interface filterFormAnimateData {
  isClickOutSide: boolean;
  isShow: boolean;
  setIsShow: (payload: boolean) => void;
  setIsClickOutSide: (payload: boolean) => void;

}

const filterFormAnimateDataDefault: filterFormAnimateData = {
  isClickOutSide: false,
  setIsClickOutSide: () => {},
  isShow: false,
  setIsShow: () => {},

};

export const filterFormAnimateContext = createContext<filterFormAnimateData>(
  filterFormAnimateDataDefault
);

const FilterFormAnimateProvider = ({ children }: filterFormAnimateProps) => {
  const [isClickOutSide, setIsClickOutSide_] = useState(
    filterFormAnimateDataDefault.isClickOutSide
  );
  const [isShow, setIsShow_] = useState(filterFormAnimateDataDefault.isShow);
  const setIsClickOutSide = (payload: boolean) => setIsClickOutSide_(payload);
  const setIsShow = (payload: boolean) => setIsShow_(payload);

  const filterFormAnimateDynamicData = {
    isClickOutSide,
    setIsClickOutSide,
    isShow,
    setIsShow,

  };

  return (
    <filterFormAnimateContext.Provider value={filterFormAnimateDynamicData}>
      {children}
    </filterFormAnimateContext.Provider>
  );
};
export default FilterFormAnimateProvider;
