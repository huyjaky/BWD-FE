import { filterContext } from '@/contexts/filter';
import { motion } from 'framer-motion';
import { useContext, useEffect } from 'react';
const HostLanguage = () => {
  const { filterForm, setFilterForm } = useContext(filterContext);
  const arrLanguage: string[] = ['English', 'Vietnamese'];

  return (
    <div className="w-full h-fit">
      <div className="w-full grid grid-cols-2">
        {arrLanguage.map((item: string, index: number) => {
          return (
            <div className="flex-1 h-[6.25rem] flex" key={index}>
              <button
                onClick={(event) => setFilterForm({ ...filterForm, hostLanguage: item })}
                className={`w-[80%] h-[4.5rem] m-auto border-2 rounded-xl hover:bg-redIcon hover:text-white
                active:scale-[.8] transition-all duration-500
                ${filterForm.hostLanguage === item ? 'bg-redIcon text-white' : ''}`}
              >
                {item}
              </button>
            </div>
          );
        })}

        <div className="flex-1 h-[6.25rem] flex">
          <button
            onClick={(event) => setFilterForm({ ...filterForm, hostLanguage: '' })}
            className={`w-[80%] h-[4.5rem] m-auto border-2 rounded-xl hover:bg-redIcon hover:text-white
                active:scale-[.8] transition-all duration-500
                ${filterForm.hostLanguage === '' ? 'bg-redIcon text-white' : ''}`}
          >
            All
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostLanguage;
