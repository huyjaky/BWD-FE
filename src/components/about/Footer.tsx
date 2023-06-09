'use client';

import { AnimatePresence, motion } from 'framer-motion';
import HeaderMain from '../rootMaskHeader/headerMain';
import TypeHouse from '../main/typeHouse';
import SkeletonShowHouse from '../skeletonLoading/skletonShowHouse';


const Footer = () => {
  const arrTempLoading: number[] = Array.from({ length: 10 }, (_, index) => index);
  return (
    <>
      <motion.div className='w-screen h-screen overflow-hidden mt-[100px]'>
        <AnimatePresence initial={false}>
          <HeaderMain />
        </AnimatePresence>
        <div className='w-full h-fit px-[80px] mobile:px-[20px] box-border'>
          <TypeHouse />
        </div>
        <div className='w-full h-fit box-border px-[80px]'>
          <motion.div className="w-full h-fit grid grid-cols-houseBox gap-x-9 gap-y-8 px-7 py-8 " id="scroll-inf">
            {arrTempLoading.map((item: number, index: number) => (
              <motion.div key={index} >
                <SkeletonShowHouse />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </motion.div>
    </>
  )
};

export default Footer;
