import ControlBar from '@/components/rootMaskHeader/controlPlan/controlBar/controlBar';
import Popover from '@/components/rootMaskHeader/controlPlan/controlBar/popOver';
import { mobileContolPanelContext } from '@/contexts/mobileControlPanel';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useContext } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

const variants: Variants = {
  show: {
    visibility: ['hidden', 'visible'],
    top: [30, 0],
    opacity: [0, 1]
  },
  hidden: {
    top: [0, 30],
    opacity: [1, 0],
    transitionEnd: {
      visibility: 'hidden'
    }
  }
};

const ControlPlanMobile = () => {
  const { isShow, setIsShow } = useContext(mobileContolPanelContext);

  return (
    <AnimatePresence initial={false}>
      <motion.div className="relative z-40 ">
        <motion.div
          className="fixed right-0 top-0 w-screen h-screen bg-white  flex flex-col"
          variants={variants}
          animate={isShow ? 'show' : 'hidden'}
          transition={{ type: 'tween', duration: 0.5 }}
        >
          {/* header */}
          <motion.div className="flex-[0.5] ">
            <motion.button className="h-full w-[100px] overflow-hidden ">
              <IoIosArrowRoundBack
                className="w-full text-[40px] font-bold  stroke-[50px] fill-red-500
              text-red-500 "
                onClick={(event) => setIsShow(false)}
              />
            </motion.button>
          </motion.div>

          <motion.div className="flex-1 box-border px-[80px] mobile:px-3">
            <ControlBar />
          </motion.div>

          {/* content */}
          <motion.div className="flex-[7] box-border w-full mb-[70px] px-[80px] py-5 ">
            <motion.div className="w-full h-full relative border-2 rounded-2xl">
              <Popover />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ControlPlanMobile;
