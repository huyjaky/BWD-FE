import { ReactNode, createContext, useState } from 'react';

interface filterFormAnimateProps {
  children: ReactNode;
}

interface filterFormAnimateData {
  isClickOutSide: boolean;
  isShow: boolean;
  setIsShow: (payload: boolean) => void;
  setIsClickOutSide: (payload: boolean) => void;
  isShowAllPt: boolean;
  setIsShowAllPt: (payload: boolean) => void;
}

const filterFormAnimateDataDefault: filterFormAnimateData = {
  isClickOutSide: false,
  setIsClickOutSide: () => {},
  isShow: false,
  setIsShow: () => {},
  isShowAllPt: false,
  setIsShowAllPt: () => {}
};

export const filterFormAnimateContext = createContext<filterFormAnimateData>(
  filterFormAnimateDataDefault
);

const FilterFormAnimateProvider = ({ children }: filterFormAnimateProps) => {
  const [isClickOutSide, setIsClickOutSide_] = useState(
    filterFormAnimateDataDefault.isClickOutSide
  );
  const [isShow, setIsShow_] = useState(filterFormAnimateDataDefault.isShow);
  const [isShowAllPt, setIsShowAllPt_] = useState(filterFormAnimateDataDefault.isShowAllPt);
  const setIsClickOutSide = (payload: boolean) => setIsClickOutSide_(payload);
  const setIsShow = (payload: boolean) => setIsShow_(payload);
  const setIsShowAllPt = (payload: boolean) => setIsShowAllPt_(payload);

  const filterFormAnimateDynamicData = {
    isClickOutSide,
    setIsClickOutSide,
    isShow,
    setIsShow,
    isShowAllPt,
    setIsShowAllPt
  };

  return (
    <filterFormAnimateContext.Provider value={filterFormAnimateDynamicData}>
      {children}
    </filterFormAnimateContext.Provider>
  );
};
export default FilterFormAnimateProvider;
