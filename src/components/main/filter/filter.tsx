import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { useContext, useRef } from 'react';
import { HiOutlineFilter } from 'react-icons/hi';

interface FilterProps {
  isInvisible: string | null;
}

const Filter = ({ isInvisible }: FilterProps) => {
  const buttonFilter = useRef<HTMLInputElement>(null);
  const { setIsClickOutSide } = useContext(filterFormAnimateContext);

  const handleOnClickFilter = async (event: any) => {
    window.scrollTo(0, 0);
    setIsClickOutSide(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <div
        className={`w-[150px] h-[80px] flex ${isInvisible} mobile:h-full mobile:w-[100px]
tablet:h-full tablet:w-[100px]
      `}
        onClick={handleOnClickFilter}
      >
        <div
          className="flex m-auto p-3 border-2 rounded-2xl border-slate-800 cursor-pointer
          mobile:w-[50px] mobile:h-full mobile:p-0 mobile:border-0
          tablet:w-[50px] tablet:h-full tablet:p-0 tablet:border-0
          "
          ref={buttonFilter}
        >
          <div className="flex w-fit h-[30px] m-auto  mobile:h-full tablet:h-full">
            <HiOutlineFilter className="w-[30px] h-full m-auto " />
            <div className="w-fit h-full flex items-center mobile:hidden tablet:hidden">
              <span className="font-semibold">Filters</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Filter;
