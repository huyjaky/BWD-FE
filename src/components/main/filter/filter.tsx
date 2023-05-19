import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { useContext, useRef } from 'react';
import { HiOutlineFilter } from 'react-icons/hi';

interface FilterProps {
  isInvisible: string | null;
}


const Filter = ({ isInvisible }: FilterProps) => {
  const buttonFilter = useRef<HTMLInputElement>(null);
  const { setIsClickOutSide } = useContext(filterFormAnimateContext);

  const handleOnClickFilter = (event: any) => {
    setIsClickOutSide(true);
  };

  return (
    <>
      <div className={`w-[150px] h-[80px] flex ${isInvisible}`}>
        <div
          className="flex m-auto p-3 border-2 rounded-2xl border-slate-800 cursor-pointer"
          ref={buttonFilter}
          onClick={handleOnClickFilter}>
          <div className="flex w-fit h-[30px] m-auto">
            <HiOutlineFilter className="w-[30px] h-full" />
            <div className="w-fit h-full flex items-center">
              <span className="font-semibold">Filters</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Filter;
