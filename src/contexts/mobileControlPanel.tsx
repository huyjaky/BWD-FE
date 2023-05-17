import { ReactNode, createContext, useState } from 'react';

interface mobileContolPanelProps {
  children: ReactNode;
}

interface mobileContolPanelData {
  isShow: boolean;
  setIsShow: (payload: boolean) => void;
}

const mobileContolPanelDataDefault: mobileContolPanelData = {
  isShow: false,
  setIsShow: () => {}
};

export const mobileContolPanelContext = createContext<mobileContolPanelData>(
  mobileContolPanelDataDefault
);

const MobileContolPanelProvider = ({ children }: mobileContolPanelProps) => {
  const [isShow, setIsShow_] = useState(mobileContolPanelDataDefault.isShow);
  const setIsShow = (payload: boolean) => setIsShow_(payload);
  const mobileContolPanelDynamicData = { isShow, setIsShow };
  return (
    <mobileContolPanelContext.Provider value={mobileContolPanelDynamicData}>
      {children}
    </mobileContolPanelContext.Provider>
  );
};
export default MobileContolPanelProvider;
