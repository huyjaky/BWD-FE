import { selectPopoverDefault } from '@/models/place';
import { ReactNode, useState, createContext } from 'react';

interface selectPopoverProps {
  children: ReactNode;
}

const selectPopoverDefaultData = {
  selected: '',
  setSelected: () => {},
  isLoginClick: false,
  setIsLoginClick: () => {}
};

export const selectPopoverContext = createContext<selectPopoverDefault>(selectPopoverDefaultData);

const SelectPopoverProvider = ({ children }: selectPopoverProps) => {
  const [selected, setSelected_] = useState(selectPopoverDefaultData.selected);
  const [isLoginClick, setIsLoginClick_] = useState(selectPopoverDefaultData.isLoginClick);
  const setSelected = (payload: string) => setSelected_(payload);
  const setIsLoginClick = (payload: boolean) => setIsLoginClick_(payload);

  const selectedDynamicData = { selected, setSelected, isLoginClick, setIsLoginClick };
  return (
    <selectPopoverContext.Provider value={selectedDynamicData}>
      {children}
    </selectPopoverContext.Provider>
  );
};

export default SelectPopoverProvider;
