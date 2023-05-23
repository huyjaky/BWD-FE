import { filterForm } from '@/models/filter';
import { ReactNode, createContext, useState } from 'react';

interface filterProps {
  children: ReactNode;
}

interface filterData {
  filterForm: filterForm;
  setFilterForm: (payload: filterForm) => void;
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
  setFilterForm: (payload: filterForm) => {}
};

export const filterContext = createContext<filterData>(filterDataDefault);

const FilterProvider = ({ children }: filterProps) => {
  const [filterForm, setFilterForm_] = useState(filterDataDefault.filterForm);
  const setFilterForm = (payload: filterForm) => setFilterForm_(payload);

  const filterDynamicData = { filterForm, setFilterForm };

  return <filterContext.Provider value={filterDynamicData}>{children}</filterContext.Provider>;
};
export default FilterProvider;
