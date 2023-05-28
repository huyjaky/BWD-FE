import LoginPanel from '@/components/loginPanel/LoginPanel';
import { selectPopoverContext } from '@/contexts';
import { placeListContext } from '@/contexts/placeList';
import { useContext, useEffect, useRef, useState } from 'react';
import ControlPlan from './controlPlan/controlPlan';
import HeaderForm from '../headers/headerForm/HeaderForm';
import FormFilter from '../main/filter/formFilter/formFilter';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';

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

const HeaderMain = () => {
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

  useEffect(() => {
    // animate de mo popup login
    const handleOnclickLogin = (event: any) => {
      const isClick = loginPanel.current?.contains(event.target);
      if (!isClick && isLoginClick) {
        mask.current?.classList.remove('animate-transparentAnimateLogin2');
        loginPanel.current?.classList.remove('animate-slideUpLogin');
        mask.current?.classList.add('animate-transparentAnimateLoginReverse2');
        loginPanel.current?.classList.add('animate-slideDownLogin');
        setIsLoginClick(false);
        return;
      }
    };

    // animate de dong popup login
    const handleOnClickLogin2 = (event: any) => {
      if (isFirstLoading) return;
      mask.current?.classList.remove('animate-transparentAnimateLogin2');
      loginPanel.current?.classList.remove('animate-slideUpLogin');
      mask.current?.classList.add('animate-transparentAnimateLoginReverse2');
      loginPanel.current?.classList.add('animate-slideDownLogin');
      setIsLoginClick(false);
    };

    // animate for dynamic event
    const handleIsClick = () => {
      if (isLoginClick) {
        mask.current?.classList.remove('animate-transparentAnimateLoginReverse2');
        loginPanel.current?.classList.remove('animate-slideDownLogin');
        mask.current?.classList.add('animate-transparentAnimateLogin2');
        loginPanel.current?.classList.add('animate-slideUpLogin');
        return;
      } else if (!isLoginClick && !isFirstLoading) {
        mask.current?.classList.remove('animate-transparentAnimateLogin2');
        loginPanel.current?.classList.remove('animate-slideUpLogin');
        mask.current?.classList.add('animate-transparentAnimateLoginReverse2');
        loginPanel.current?.classList.add('animate-slideDownLogin');
      }
    };

    document.addEventListener('mousedown', handleOnclickLogin);
    document.addEventListener('scroll', handleOnClickLogin2);
    handleIsClick();
    setIsFirstLoading(false);
  }, [isLoginClick]);

  useEffect(() => {}, [isClickOutSide]);
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
          <FormFilter />
        </motion.div>
      </AnimatePresence>

      <div
        className="w-screen h-screen transition-all duration-500 bg-mask absolute z-40 flex
        overflow-hidden invisible
        "
        ref={mask}
      >
        <div className="w-full h-full flex">
          <div className="w-fit  h-fit bg-white m-auto rounded-3xl" ref={loginPanel}>
            <LoginPanel>
              <div></div>
            </LoginPanel>
          </div>
        </div>
      </div>

      {/* aniamte mask */}
      <motion.div
        variants={variants}
        animate={isShowHeader ? 'show' : 'hidden'}
        className="w-screen h-screen opacity-0 bg-mask absolute z-20"
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
