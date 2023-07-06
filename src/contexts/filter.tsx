import { filterForm } from '@/models/filter';
import { ReactNode, createContext, useState } from 'react';

interface filterProps {
  children: ReactNode;
}

interface filterData {
  filterForm: filterForm;
  emptyFilterForm: filterForm;
  setFilterForm: (payload: filterForm) => void;
  resetFilterForm: () => void;
  isEmpty: () => boolean;
}

const filterDataDefault: filterData = {
  filterForm: {
    maxPrice: 250,
    minPrice: 10,
    beds: 0,
    bathRooms: 0,
    typeHouse: [],
    amenities: {
      essentials: [],
      features: [],
      location: [],
      safety: []
    },
    hostLanguage: ''
  },
  emptyFilterForm: {
    maxPrice: 250,
    minPrice: 10,
    beds: 0,
    bathRooms: 0,
    typeHouse: [],
    amenities: {
      essentials: [],
      features: [],
      location: [],
      safety: []
    },
    hostLanguage: ''
  },
  setFilterForm: (payload: filterForm) => {},
  resetFilterForm: () => {},
  isEmpty: () => true
};

export const filterContext = createContext<filterData>(filterDataDefault);

const FilterProvider = ({ children }: filterProps) => {
  const [filterForm, setFilterForm_] = useState(filterDataDefault.filterForm);
  const [emptyFilterForm, setEmptyFilterForm] = useState(filterDataDefault.filterForm);

  const setFilterForm = (payload: filterForm) => setFilterForm_(payload);
  const resetFilterForm = () => setFilterForm_(filterDataDefault.filterForm);
  const isEmpty = () => {
    const emptyObjJson = JSON.stringify(filterDataDefault.filterForm);
    const filterFormJson = JSON.stringify(filterForm);
    if (filterFormJson === emptyObjJson) {
      return true;
    } else {
      return false;
    }
  };

  const filterDynamicData = { filterForm, setFilterForm, resetFilterForm, isEmpty, emptyFilterForm };

  return <filterContext.Provider value={filterDynamicData}>{children}</filterContext.Provider>;
};
export default FilterProvider;
