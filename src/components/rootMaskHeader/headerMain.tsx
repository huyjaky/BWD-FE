import LoginPanel from '@/components/loginPanel/LoginPanel';
import { selectPopoverContext } from '@/contexts';
import { placeListContext } from '@/contexts/placeList';
import { useContext, useEffect, useRef, useState } from 'react';
import ControlPlan from './controlPlan/controlPlan';
import HeaderForm from '../headers/headerForm/HeaderForm';
import FormFilter from '../main/filter/formFilter/formFilter';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { variants as variants_ } from "@/components/main/showHouse/variantsShowHouse";

const variants: Variants = {
  show: {
    display: 'flex',
    opacity: [0, 1]
  },
  hidden: {
    opacity: [1, 0],
    transitionEnd: {
      display: 'none'
    }
  }
};

interface HeaderMainProps {
  keyMapBing: string,
  keyChatEngine: string
}

const HeaderMain = ({ keyMapBing, keyChatEngine }: HeaderMainProps) => {
  const { setPlaceList } = useContext(placeListContext);
  const { isLoginClick, setIsLoginClick } = useContext(selectPopoverContext);
  const { isClickOutSide, setIsClickOutSide, isShowHeader, setIsShowHeader } =
    useContext(filterFormAnimateContext);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const loginPanel = useRef<HTMLInputElement>(null);
  const mask = useRef<HTMLInputElement>(null);

  const handleOnMask = (event: any) => {
    setPlaceList([]);
  };

  useEffect(() => {}, [isLoginClick]);

  const handleOnClickLogin = (event: any) => {
    const isClickInSide = loginPanel.current?.contains(event.target);
    if (!isClickInSide) {
      setIsLoginClick(false);
      return;
    } else {
      return;
    }
  }

  useEffect(() => { }, [isShowHeader, isClickOutSide])

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          variants={variants}
          animate={isClickOutSide ? 'show' : 'hidden'}
          transition={{ duration: 0.5 }}
          className="w-screen h-screen bg-mask absolute z-40
        overflow-hidden "
          id="maskFilter"
        >
          <FormFilter keyMapBing={keyMapBing} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        <motion.div
          variants={variants_}
          animate={isLoginClick ? 'showMask' : 'hiddenMask'}
          onClick={handleOnClickLogin}
          className="fixed w-screen h-screen bg-mask z-50 top-0 left-0" >
          <div className='w-fit h-fit m-auto  mobile:w-screen mobile:h-screen
    flex flex-col mobile:p-0 p-5 rounded-xl ' ref={loginPanel}>
            <LoginPanel >
              <div></div>
            </LoginPanel>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* aniamte mask */}
      <motion.div
        variants={variants}
        animate={isShowHeader ? 'show' : 'hidden'}
        className="w-screen h-screen opacity-0 bg-mask z-20 fixed top-0 left-0"
        id="mask"
        onClick={handleOnMask}
      ></motion.div>

      <HeaderForm>
        <ControlPlan />
      </HeaderForm>
    </>
  );
};

export default HeaderMain;
