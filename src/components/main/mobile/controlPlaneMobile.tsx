import ControlBar from '@/components/rootMaskHeader/controlPlan/controlBar/controlBar';
import { mobileContolPanelContext } from '@/contexts/mobileControlPanel';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useContext, useEffect } from 'react';

const variants: Variants = {
  show: {
    top: 0,
    opacity: 1,
    visibility: 'visible'
  },
  hidden: {
    top: 30,
    opacity: 0,
    visibility: 'hidden'
  }
};

const ControlPlanMobile = () => {
  const { isShow, setIsShow } = useContext(mobileContolPanelContext);
  useEffect(() => {
    console.log(isShow);
  }, [isShow]);

  return (
    <AnimatePresence initial={false}>
      <motion.div className="relative z-40 ">
        <motion.div
          className="fixed right-0 top-0 w-screen h-screen bg-white  flex flex-col"
          variants={variants}
          initial={isShow ? 'hidden' : 'show'}
          animate={isShow ? 'show' : 'hidden'}
          transition={{ type: 'tween', duration: 1 }}>
            {/* header */}
            <motion.div className='flex-1 border-b-2'>
              
            </motion.div>
            <motion.div className='flex-1 box-border px-[80px]'>
              <ControlBar/>
            </motion.div>

            {/* content */}
            <motion.div className='flex-[7]'>
            </motion.div>


          </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ControlPlanMobile;
