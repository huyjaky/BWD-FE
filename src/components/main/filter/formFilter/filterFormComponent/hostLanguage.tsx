import { filterContext } from '@/contexts/filter';
import { getHouseContext } from '@/contexts/getHouse';
import { motion } from 'framer-motion';
import { useContext, useEffect } from 'react';
const HostLanguage = () => {
  const { filterForm, setFilterForm } = useContext(filterContext);
  const { isFilter, setIsFilter } = useContext(getHouseContext)
  const arrLanguage: string[] = ['HouseForSale', 'HouseForRent'];

  return (
    <div className="w-full h-fit">
      <div className="w-full grid grid-cols-2">
        {arrLanguage.map((item: string, index: number) => {
          return (
            <div className="flex-1 h-[6.25rem] flex" key={index}>
              <button
                onClick={(event) => {
                  if (filterForm.typeHouse.includes(item)) {
                    const temp = filterForm.typeHouse.filter((items: string) => items != item);
                    setFilterForm({ ...filterForm, typeHouse: temp });
                    console.log(filterForm.typeHouse);
                    return;
                  }
                  setFilterForm({ ...filterForm, typeHouse: [...filterForm.typeHouse, item] });
                }}
                className={`w-[80%] h-[4.5rem] m-auto border-2 rounded-xl hover:bg-redIcon hover:text-white
                active:scale-[.8] transition-all duration-500
                ${filterForm.typeHouse.includes(item) ? 'bg-redIcon text-white' : ''}`}
              >
                {item}
              </button>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default HostLanguage;
