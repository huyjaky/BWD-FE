import { ReactNode, createContext, useState } from 'react';

interface isShowPtProps {
  children: ReactNode;
}

interface isShowPtData {
  isShowAllPt: boolean;
  setIsShowAllPt: (payload: boolean) => void;
}

const isShowPtDataDefault: isShowPtData = {
  isShowAllPt: false,
  setIsShowAllPt: () => {}
};

export const IsShowPtContext = createContext<isShowPtData>(isShowPtDataDefault);

const IsShowPtProvider = ({ children }: isShowPtProps) => {
  const [isShowAllPt, setIsShowAllPt_] = useState(isShowPtDataDefault.isShowAllPt);
  const setIsShowAllPt = (payload: boolean) => setIsShowAllPt_(payload);

  const isShowPtDynamicData = {
    isShowAllPt,
    setIsShowAllPt
  };

  return (
    <IsShowPtContext.Provider value={isShowPtDynamicData}>{children}</IsShowPtContext.Provider>
  );
};
export default IsShowPtProvider;
