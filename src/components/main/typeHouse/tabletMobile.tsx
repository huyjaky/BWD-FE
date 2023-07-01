import { motion } from 'framer-motion';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { HiOutlineFilter } from 'react-icons/hi';
import Filter from '../filter/filter';
import { imgArr } from '../imgArr';


const TabletMobile = () => {

  return (
    <div className='w-full h-[100px] mobile:h-fit  flex'>

      <div className='m-auto grid tablet:grid-cols-4 mobile:grid-cols-2 mobile:grid-rows-2'>
        {imgArr.map((item: { title: string; path: (type: string) => ReactElement<any, any> }, index: number) => {
          return (
            <div key={index} className='w-fit h-full '>
              {item.path('text-[55px] stroke-1 mx-[50px]')}
              <div className='w-fit h-fit overflow-hidden m-auto'>{item.title}</div>
            </div>
          )
        })}
      </div>

    </div>
  );
}

export default TabletMobile;