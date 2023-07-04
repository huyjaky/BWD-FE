import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { imgArr } from '../imgArr';
import { HiOutlineFilter } from 'react-icons/hi';
import Filter from '../filter/filter';
import DesktopLaptop from './desktopLaptop';
import TabletMobile from './tabletMobile';

const TypeHouse = () => {
  return (
    <>
      <div className="mobile:hidden tablet:hidden">
        <DesktopLaptop />
      </div>

      <div className="desktop:hidden laptop:hidden mt-6">
        <TabletMobile />
      </div>
    </>
  );
};

export default TypeHouse;
