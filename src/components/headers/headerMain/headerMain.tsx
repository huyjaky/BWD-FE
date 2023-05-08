import LoginPanel from '@/components/loginPanel/LoginPanel';
import { placeListContext } from '@/contexts/placeList';
import { selectPlaceContext } from '@/contexts/selectPlace';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { FaAirbnb } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import ControlPlan from './controlPlan/controlPlan';
import ButtonAccount from '../buttonAccount/ButtonAccount';
import HeaderForm from '../headerForm/HeaderForm';
const HeaderMain = () => {
  const { setPlaceList } = useContext(placeListContext);

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
    const handleOnclickLogin = (event: any) => {
      const isClick = loginPanel.current?.contains(event.target);
      if (!isClick) {
        mask.current?.classList.remove('animate-transparentAnimate');
        loginPanel.current?.classList.remove('animate-slideUpLogin');

        mask.current?.classList.add('animate-transparentAnimateReverse');
        loginPanel.current?.classList.add('animate-slideDownLogin');
      }
    };
    document.addEventListener('mousedown', handleOnclickLogin);
  }, []);

  return (
    <>
      <div
        className="w-screen h-screen transition-all duration-500 bg-mask absolute z-40 flex
        overflow-hidden animate-transparentAnimate hidden
        "
        ref={mask}
        onScroll={handleOnMask}
      >
        <div className="w-full h-full flex animate-slideUpLogin">
          <div className="w-fit  h-fit bg-white m-auto rounded-3xl" ref={loginPanel}>
            <LoginPanel>
              <div></div>
            </LoginPanel>
          </div>
        </div>
      </div>
      <div
        className="w-screen h-screen invisible transition-all duration-500 bg-mask absolute"
        id="mask"
        onClick={handleOnMask}
        onScroll={handleOnMask}
      ></div>
      <HeaderForm>
        <ControlPlan/>
      </HeaderForm>
    </>
  );
};

export default HeaderMain;
