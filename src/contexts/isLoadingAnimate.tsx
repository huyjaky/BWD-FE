import { ReactNode, createContext, useState } from 'react';

interface isLoadingAnimateProps {
  children: ReactNode;
}

interface isLoadingAnimate {
  isLoading: boolean;
  setIsLoading: (payload: boolean) => void;
}

const isLoadingAnimateDefault: isLoadingAnimate = {
  isLoading: true,
  setIsLoading: () => {}
};

export const isLoadingAnimateContext = createContext<isLoadingAnimate>(isLoadingAnimateDefault);

const IsLoadingAnimateProvider = ({ children }: isLoadingAnimateProps) => {
  const [isLoading, setIsLoading_] = useState(isLoadingAnimateDefault.isLoading);
  const setIsLoading = (payload: boolean) => setIsLoading_(payload);

  const isShowPtDynamicData = {
    isLoading,
    setIsLoading
  };

  return (
    <isLoadingAnimateContext.Provider value={isShowPtDynamicData}>{children}</isLoadingAnimateContext.Provider>
  );
};
export default IsLoadingAnimateProvider;

