import { filterContext } from '@/contexts/filter';
import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { getHouseContext } from '@/contexts/getHouse';
import { motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { HiOutlineFilter } from 'react-icons/hi';

interface FilterProps {
  isInvisible: string | null;
}

const Filter = ({ isInvisible }: FilterProps) => {
  const buttonFilter = useRef<HTMLInputElement>(null);
  const { setIsClickOutSide } = useContext(filterFormAnimateContext);
  const { filterForm } = useContext(filterContext);
  const { isFilter } = useContext(getHouseContext);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleOnClickFilter = async (event: any) => {
    window.scrollTo(0, 0);
    setIsClickOutSide(true);
    document.body.style.overflow = 'hidden';
  };
  useEffect(() => {
    const emptyObjJson = JSON.stringify({
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
    });
    const filterFormJson = JSON.stringify(filterForm);
    if (filterFormJson === emptyObjJson) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [isFilter, filterForm]);

  return (
    <>
      <div
        className={`w-[150px] h-[80px] flex ${isInvisible} mobile:h-full mobile:w-[100px]
tablet:h-full tablet:w-[100px]
      `}
        onClick={handleOnClickFilter}
      >
        <div
          className={`flex m-auto p-3 border-2 rounded-2xl cursor-pointer
          mobile:w-[50px] mobile:h-full mobile:p-0 mobile:border-0
          tablet:w-[50px] tablet:h-full tablet:p-0 tablet:border-0 relative
          ${(isEmpty && isFilter !== 'main') || isFilter !== 'favoriteHouse' ? ' border-slate-800' : 'border-red-500'}
          `}
          ref={buttonFilter}
        >
          {(isEmpty && isFilter !== 'main') || isFilter !== 'favoriteHouse' ? (
            <></>
          ) : (
            <motion.div
              animate={{ scale: 1.2 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-[20px] h-[20px] rounded-full bg-red-400 absolute -right-1
          top-4 flex opacity-70
          "
            >
              <div className="w-[10px] h-[10px] bg-red-600 rounded-full m-auto"></div>
            </motion.div>
          )}
          <div className="flex w-fit h-[30px] m-auto  mobile:h-full tablet:h-full">
            <HiOutlineFilter className={`w-[30px] h-full m-auto ${(isEmpty && isFilter !== 'main') || isFilter !== 'favoriteHouse' ? '' : 'text-red-500'}` }/>
            <div className="w-fit h-full flex items-center mobile:hidden tablet:hidden ">
              <span className="font-semibold">Filter</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Filter;
