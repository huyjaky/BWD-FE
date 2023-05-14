import { filterContext } from '@/contexts/filter';
import { motion } from 'framer-motion';
import { useContext } from 'react';

const BedsBathRooms = () => {
  const { filterForm, setFilterForm } = useContext(filterContext);
  const styleButton = 'w-[60px] h-[40px] rounded-full border-2 border-slate-600 ml-3';
  const arrButton: number[] = [];
  for (let index = 0; index <= 8; index++) {
    arrButton.push(index);
  }

  return (
    <div className="w-full h-fit">
      {/* beds */}
      <div className="w-full h-fit mb-5">
        <span>Beds</span>
        <div className="w-full flex justify-start mt-2">
          {arrButton.map((item: number, index: number) => {
            if (index == 0) {
              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.6 }}
                  transition={{ duration: 0.5 }}
                  className={`${styleButton.replace('ml-3', '')}
                                ${filterForm.beds == 0 ? 'bg-black text-white' : ''}
                              `}
                  onClick={(event) => setFilterForm({ ...filterForm, beds: index })}
                >
                  {'Any'}
                </motion.button>
              );
            }
            return (
              <motion.button
                key={index}
                whileTap={{ scale: 0.6 }}
                transition={{ duration: 0.5 }}
                className={` ${styleButton}
                            ${filterForm.beds == index ? 'bg-black text-white' : ''}
                              `}
                onClick={(event) => setFilterForm({ ...filterForm, beds: index })}
              >
                {index}
                {index == 8 ? '+' : ''}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* bathrooms */}
      <div className="w-full h-fit mb-5">
        <span>Bathrooms</span>
        <div className="w-full flex justify-start mt-2">
          {arrButton.map((item: number, index: number) => {
            if (index == 0) {
              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.6 }}
                  transition={{ duration: 0.5 }}
                  className={`${styleButton.replace('ml-3', '')}
                                ${filterForm.bathRooms == 0 ? 'bg-black text-white' : ''}
                              `}
                  onClick={(event) => setFilterForm({ ...filterForm, bathRooms: index })}
                >
                  {'Any'}
                </motion.button>
              );
            }
            return (
              <motion.button
                key={index}
                whileTap={{ scale: 0.6 }}
                transition={{ duration: 0.5 }}
                className={` ${styleButton}
                            ${filterForm.bathRooms == index ? 'bg-black text-white' : ''}
                              `}
                onClick={(event) => setFilterForm({ ...filterForm, bathRooms: index })}
              >
                {index}
                {index == 8 ? '+' : ''}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BedsBathRooms;
