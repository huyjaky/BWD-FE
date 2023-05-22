import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';

const variants: Variants = {
  show: {
    top: [1200, 0]
  },
  hidden: {
    top: [0, 1200]
  }
};

const ShowAllHouse = () => {
  const { isShowAllPt, setIsShowAllPt } = useContext(filterFormAnimateContext);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  useEffect(() => {}, [isShowAllPt]);
  return (
    <motion.div
      variants={variants}
      initial={isFirstLoading ? false : 'hidden'}
      animate={isShowAllPt ? 'show' : 'hidden'}
      className="fixed top-[1200px] left-0 w-screen h-screen z-50 bg-emerald-300"
    >
      <div className="h-full w-full relative overflow-scroll overflow-x-hidden">
        {/* header */}
        <div className="w-full h-fit absolute top-0">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={event => setIsShowAllPt(false)}
            className="w-[100px] h-[100px] cursor-pointer flex"
          >
            <IoChevronBackOutline className="text-[50px] m-auto" />
          </motion.button>
        </div>

        {/* content */}
        <div>
          
        </div>
      </div>
    </motion.div>
  );
};

export default ShowAllHouse;
