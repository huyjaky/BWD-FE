
// import required modules

import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Test = () => {
  const { scrollYProgress } = useScroll();
  const convert = useTransform(scrollYProgress, [0, .7], [1, 5]);

  return (
    <>
      <div className='w-full h-[100vh] bg-emerald-300'>
        <div className='fixed top-0 left-0 w-screen h-screen  flex
        '>
          <motion.div className='relative w-full h-full '>
            <motion.div className={`w-[36rem] h-[calc(100vh-100px)] bottom-0 left-[calc(50%-18rem-100vh)]
            bg-transparent absolute rounded-t-full box-content border-[100vh] border-b-0
            origin-bottom
            `} style={{ scale: convert }}>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default Test;
