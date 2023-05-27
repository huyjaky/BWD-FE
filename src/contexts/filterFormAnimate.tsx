import { ReactNode, createContext, useState } from 'react';

interface filterFormAnimateProps {
  children: ReactNode;
}

interface filterFormAnimateData {
  isClickOutSide: boolean;
  isShow: boolean;
  setIsShow: (payload: boolean) => void;
  setIsClickOutSide: (payload: boolean) => void;
  isShowHeader: boolean,
  setIsShowHeader: (payload: boolean) => void
}

const filterFormAnimateDataDefault: filterFormAnimateData = {
  isClickOutSide: false,
  setIsClickOutSide: () => {},
  isShow: false,
  setIsShow: () => {},
  isShowHeader: false,
  setIsShowHeader: () =>{}
};

export const filterFormAnimateContext = createContext<filterFormAnimateData>(
  filterFormAnimateDataDefault
);

const FilterFormAnimateProvider = ({ children }: filterFormAnimateProps) => {
  const [isClickOutSide, setIsClickOutSide_] = useState(
    filterFormAnimateDataDefault.isClickOutSide
  );
  const [isShow, setIsShow_] = useState(filterFormAnimateDataDefault.isShow);
  const [isShowHeader, setIsShowHeader_] = useState(filterFormAnimateDataDefault.isShowHeader);
  const setIsClickOutSide = (payload: boolean) => setIsClickOutSide_(payload);
  const setIsShow = (payload: boolean) => setIsShow_(payload);
  const setIsShowHeader = (payload: boolean) => setIsShowHeader_(payload);

  const filterFormAnimateDynamicData = {
    isClickOutSide,
    setIsClickOutSide,
    isShow,
    setIsShow,
    isShowHeader,
    setIsShowHeader
  };

  return (
    <filterFormAnimateContext.Provider value={filterFormAnimateDynamicData}>
      {children}
    </filterFormAnimateContext.Provider>
  );
};
export default FilterFormAnimateProvider;
