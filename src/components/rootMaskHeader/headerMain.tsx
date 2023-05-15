import LoginPanel from '@/components/loginPanel/LoginPanel';
import { selectPopoverContext } from '@/contexts';
import { placeListContext } from '@/contexts/placeList';
import { useContext, useEffect, useRef, useState } from 'react';
import ControlPlan from './controlPlan/controlPlan';
import HeaderForm from '../headers/headerForm/HeaderForm';
import FormFilter from '../main/filter/formFilter/formFilter';
import { AnimatePresence, motion } from 'framer-motion';
import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';

const HeaderMain = () => {
  const { setPlaceList } = useContext(placeListContext);
  const { isLoginClick, setIsLoginClick } = useContext(selectPopoverContext);
  const { isClickOutSide } = useContext(filterFormAnimateContext);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const loginPanel = useRef<HTMLInputElement>(null);
  const mask = useRef<HTMLInputElement>(null);

  const handleOnMask = (event: any) => {
    // add animate by hand beacause i its ez to fixed :")))
    const mask: HTMLElement | null = document.getElementById('mask');
    const scaleUp: HTMLElement | null = document.getElementById('scaleUp');

    const ControlHeader: HTMLElement | null = document.getElementById('ControlHeader');
    const link: HTMLElement | null = document.getElementById('link');
    const controlBar: HTMLElement | null = document.getElementById('controlBar');
    const where: HTMLElement | null = document.getElementById('where-popup');
    const checkIn_Out: HTMLElement | null = document.getElementById('checkin_out-popup');
    const who: HTMLElement | null = document.getElementById('who-popup');

    scaleUp?.classList.remove('animate-slideDownHeader');
    link?.classList.remove('animate-slideDownControl');
    ControlHeader?.classList.remove('animate-slideDownControl');
    mask?.classList.remove('animate-transparentAnimate');
    controlBar?.classList.remove('animate-showAnimate');

    where?.classList.remove('animate-transparentAnimate');
    checkIn_Out?.classList.remove('animate-transparentAnimate');
    who?.classList.remove('animate-transparentAnimate');
    // -------------------------------------------------------------------
    scaleUp?.classList.add('animate-slideUpHeader');
    link?.classList.add('animate-slideUpControl');
    ControlHeader?.classList.add('animate-slideUpControl');
    mask?.classList.add('animate-transparentAnimateReverse');
    controlBar?.classList.add('animate-hiddenAnimate');

    where?.classList.add('animate-transparentAnimateReverse');
    checkIn_Out?.classList.add('animate-transparentAnimateReverse');
    who?.classList.add('animate-transparentAnimateReverse');

    setPlaceList([]);
  };

  useEffect(() => {
    // animate
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
    handleIsClick();
    setIsFirstLoading(false);
  }, [isLoginClick]);

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div

          initial={
            isClickOutSide
              ? { opacity: 0, visibility: 'hidden' }
              : { opacity: 1, visibility: 'visible' }
          }
          animate={
            isClickOutSide
              ? { opacity: 1, visibility: 'visible' }
              : { opacity: 0, visibility: 'hidden' }
          }

          className="w-screen h-screen bg-mask absolute z-40 flex
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

      <div
        className="w-screen h-screen invisible transition-all duration-500 bg-mask absolute z-20"
        id="mask"
        onClick={handleOnMask}
        onScroll={handleOnMask}
      ></div>
      <HeaderForm>
        <ControlPlan />
      </HeaderForm>
    </>
  );
};

export default HeaderMain;
