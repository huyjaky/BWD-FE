import { HiOutlineFilter } from 'react-icons/hi';
import {motion} from 'framer-motion'
import { useEffect, useRef } from 'react';

const Filter = () => {
  const buttonFilter = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    // const handleOnClickFilter = (event: any) =>{
    //   if (buttonFilter.current) {
    //     const buttonFilter_ = document.getElementById('maskFilter');
    //     if (buttonFilter_) [

    //     ]
    //   }
    // }
  },[])

  const handleOnClickFilter = (event: any) => {
    const buttonFilter_ = document.getElementById('maskFilter');
    buttonFilter_?.classList.add('animate-transparentAnimate');
    buttonFilter_?.classList.remove('invisible');
  }

  return (
    <>
      <div className="w-[150px] h-[80px] flex">
        <div className="flex m-auto p-3 border-2 rounded-2xl border-slate-800 "
          ref={buttonFilter}
          onClick={handleOnClickFilter}
        >
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
