import Link from 'next/link';
import { FaAirbnb } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import { BsList } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';
import ControlPlan from './controlPlan/controlPlan';
const HeaderMain = () => {

  const handleOnMask = (event: any) => {
    const mask: HTMLElement | null = document.getElementById('mask');
    const scaleUp: HTMLElement | null = document.getElementById('scaleUp');

    const ControlHeader: HTMLElement | null = document.getElementById('ControlHeader');
    const link: HTMLElement | null = document.getElementById('link');
    const controlBar: HTMLElement | null = document.getElementById('controlBar');
    const where: HTMLElement | null = document.getElementById('where-popup');
    const checkIn: HTMLElement | null = document.getElementById('checkin-popup');
    const checkOut: HTMLElement | null = document.getElementById('checkout-popup');
    const who: HTMLElement | null = document.getElementById('who-popup');


    scaleUp?.classList.remove('animate-slideDownHeader');
    link?.classList.remove('animate-slideDownControl');
    ControlHeader?.classList.remove('animate-slideDownControl');
    mask?.classList.remove('animate-transparentAnimate');
    controlBar?.classList.remove('animate-showAnimate');

    where?.classList.remove('animate-transparentAnimate');
    checkIn?.classList.remove('animate-transparentAnimate');
    checkOut?.classList.remove('animate-transparentAnimate');
    who?.classList.remove('animate-transparentAnimate');
    // -------------------------------------------------------------------
    scaleUp?.classList.add('animate-slideUpHeader');
    link?.classList.add('animate-slideUpControl');
    ControlHeader?.classList.add('animate-slideUpControl');
    mask?.classList.add('animate-transparentAnimateReverse');
    controlBar?.classList.add('animate-hiddenAnimate');

    where?.classList.add('animate-transparentAnimateReverse');
    checkIn?.classList.add('animate-transparentAnimateReverse');
    checkOut?.classList.add('animate-transparentAnimateReverse');
    who?.classList.add('animate-transparentAnimateReverse');

  };

  return (
    <>
      <div
        className="w-screen h-screen invisible transition-all duration-500 bg-mask absolute"
        id="mask"
        onClick={handleOnMask}
        onScroll={handleOnMask}
      ></div>
      <div className="w-full h-[80px] relative bg-white">
        <header className="w-full h-[80px] border-b-2 flex justify-center px-[80px] box-border absolute">
          <div className="w-full h-full flex relative">
            {/* logo container */}
            <Link
              href={'/'}
              className="desktop:flex-1 laptop:mr-7  flex items-center text-red-500
            z-30
            "
            >
              <FaAirbnb className="h-[50px] w-[50px] mr-1" />
              <div className="text-[30px] w-0 overflow-hidden desktop:w-fit font-semibold">
                airbnb
              </div>
            </Link>

            {/* control plan */}
            <ControlPlan />

            {/* controlbar */}
            <div className="flex-1 flex items-center justify-end z-30">
              {/* airbnb your home */}
              <Link
                href={''}
                className="rounded-full bg-white h-fit box-content px-4 py-2
            hover:bg-slate-300
          "
              >
                <span className="font-semibold">Airbnb your home</span>
              </Link>
              {/* translate */}
              <Link
                href={''}
                className="rounded-full bg-white box-content p-1 mr-3 hover:bg-slate-300"
              >
                <TbWorld className="w-[30px] h-[30px]" />
              </Link>
              {/* control */}
              <div
                className="w-fit p-1 rounded-full bg-white flex border-gray-400 hover:shadow-lg
            transition-all duration-500
          "
              >
                <BsList className="w-[30px] h-[30px]" />
                <HiUserCircle className="w-[40px] h-[30px]" />
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default HeaderMain;
