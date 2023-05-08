import { selectPopoverDefault } from '@/models/place';
import { ReactNode, useState, createContext } from 'react';

interface selectPopoverProps {
  children: ReactNode;
}

const selectPopoverDefaultData = {
  selected: '',
  setSelected: () => {}
};

export const selectPopoverContext = createContext<selectPopoverDefault>(selectPopoverDefaultData);

const SelectPopoverProvider = ({ children }: selectPopoverProps) => {
  const [selected, setSelected_] = useState(selectPopoverDefaultData.selected);
  const setSelected = (payload: string) => setSelected_(payload);

  const selectedDynamicData = { selected, setSelected };
  return (
    <selectPopoverContext.Provider value={selectedDynamicData}>
      {children}
    </selectPopoverContext.Provider>
  );
};

export default SelectPopoverProvider;
