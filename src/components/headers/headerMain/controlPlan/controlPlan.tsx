import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import ControlBar from './controlBar/controlBar';
import Popover from './controlBar/popOver';

const ControlPlan = () => {
  const arrLink: { ref: string; title: string }[] = [
    {
      ref: '',
      title: 'Stays'
    },
    {
      ref: '',
      title: 'Experiences'
    },
    {
      ref: '',
      title: 'Online Experiences'
    }
  ];

  const handleOnScaleUp = (event: any) => {
    const scaleUp: HTMLElement | null = document.getElementById('scaleUp');
    const ControlHeader: HTMLElement | null = document.getElementById('ControlHeader');
    const link: HTMLElement | null = document.getElementById('link');
    const mask: HTMLElement | null = document.getElementById('mask');
    const controlBar: HTMLElement | null = document.getElementById('controlBar');
    const where: HTMLElement | null =document.getElementById('where-popup');
    const checkIn: HTMLElement | null = document.getElementById('checkin-popup');
    const checkOut: HTMLElement | null = document.getElementById('checkout-popup');
    const who: HTMLElement | null = document.getElementById('who-popup');

    scaleUp?.classList.add('animate-slideDownHeader');
    link?.classList.add('animate-slideDownControl');
    controlBar?.classList.add('animate-showAnimate');
    ControlHeader?.classList.add('animate-slideDownControl');
    mask?.classList.add('animate-transparentAnimate');
    where?.classList.add('animate-transparentAnimate');
    checkIn?.classList.add('animate-transparentAnimate');
    checkOut?.classList.add('animate-transparentAnimate');
    who?.classList.add('animate-transparentAnimate');
    //--------------------------------------------------------------------------------------
    scaleUp?.classList.remove('animate-slideUpHeader');
    link?.classList.remove('animate-slideUpControl');
    ControlHeader?.classList.remove('animate-slideUpControl');
    mask?.classList.remove('animate-transparentAnimateReverse');
    controlBar?.classList.remove('animate-hiddenAnimate');
    where?.classList.remove('animate-transparentAnimateReverse');
    checkIn?.classList.remove('animate-transparentAnimateReverse');
    checkOut?.classList.remove('animate-transparentAnimateReverse');
    who?.classList.remove('animate-transparentAnimateReverse');

  };

  return (
    <>
      <div className="w-[400px] box-border p-4">
        <div className="w-full h-full">
          {/* link */}
          <div className="w-full h-0 flex overflow-hidden mb-1 " id="link">
            <div className="m-auto mt-3 flex w-full justify-between">
              {arrLink.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={`${item.ref}`}
                    className=" relative
                    before:bottom-0 before:h-[2px]  before:w-0 before:absolute
                    before:bg-slate-500 hover:before:w-full before:transition-all
                    before:duration-200
                  "
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>

          <div
            className="w-full h-full box-border px-1 flex items-center border-2
            rounded-full border-slate-400
          "
            id="scaleUp"
            onClick={handleOnScaleUp}
          >
            <button className="flex-1 " id="header-control_bar-list-index-1">
              Anywhere
            </button>
            <button
              className="flex-1 border-x-2 border-slate-400"
              id="header-control_bar-list-index-2"
            >
              Any week
            </button>
            <button className="flex-1" id="header-control_bar-list-index-4">
              Add guests
            </button>
            <button className="rounded-full w-[30px] h-[30px] bg-red-500 flex">
              <BiSearch className="w-[20px] h-[20px] m-auto text-white" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute w-full h-0 mt-[80px] bg-white flex
        box-border
      "
        id="ControlHeader"
      >
        <div
          className="w-[850px] tablet:w-full h-[90%] box-border rounded-full m-auto flex
          text-[15px] transition-all duration-300 border-2 invisible overflow-hidden
          cursor-pointer
        "
          id="controlBar"
        >
          <ControlBar />
          <Popover/>
        </div>
      </div>
    </>
  );
};

export default ControlPlan;
