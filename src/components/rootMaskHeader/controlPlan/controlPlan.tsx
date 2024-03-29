import { selectPopoverContext } from '@/contexts';
import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { Variants, motion } from 'framer-motion';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import ControlBar from './controlBar/controlBar';
import Popover from './controlBar/popOver';

const variants: Variants = {
  controlHeaderShow: {
    display: 'flex',
    opacity: [0, 1],
    transition: {
      delay: 0.2
    }
  },
  controlHeaderHidden: {
    opacity: [1, 0],
    transitionEnd: {
      display: 'none'
    }
  },

  slideDownControlBar: {
    scale: [1, 1.2],
    opacity: [1, 0],
    transitionEnd: {
      display: 'none'
    },
    transition: {
      type: 'tween',
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  slideUpControlBar: {
    scale: [1.2, 1],
    opacity: [0, 1],
    display: 'flex',
    transition: {
      delay: 0.2
    }
  },

  showUpLinkControl: {
    opacity: [0, 1],
    display: 'flex'
  },
  hiddenLinkControl: {
    opacity: [1, 0],
    transitionEnd: {
      display: 'none'
    },
    transition: {
      duration: 0.2
    }
  }
};

const ControlPlan = () => {
  const { isShow, setIsShow, setIsShowHeader, isShowHeader } = useContext(filterFormAnimateContext);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const refHeader = useRef<HTMLInputElement>(null);
  const refHeaderControl = useRef<HTMLInputElement>(null);
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
  const { setSelected } = useContext(selectPopoverContext);

  const onSelected = (popoverId: string) => {
    setSelected(popoverId);
  };

  // animate by hand again :")))"
  const handleOnScaleDown = (event: any) => {
    setIsShowHeader(true);
    const inputElement = document.getElementById('searchBox');
    if (inputElement) {
      inputElement.focus();
    }
  };

  const isClickOutSide = (event: any) => {
    const isClickHeaderRoot = document.getElementById('header-root')?.contains(event.target);
    const isClickHeaderControl = refHeaderControl.current?.contains(event.target);

    if (!isClickHeaderRoot && !isClickHeaderControl) {
      setIsShowHeader(false);
      return;
    }
  };

  useEffect(() => {
    document.addEventListener('click', isClickOutSide);
    document.addEventListener('scroll', isClickOutSide);

    setIsFirstLoading(false);
  }, []);

  useEffect(() => { }, [isShowHeader])

  return (
    <>
      <div className="w-[34.3rem] box-border p-4 ">
        <div className="w-full h-full">
          {/* link */}
          <div className="w-full flex overflow-hidden mb-1 " id="link">
            <motion.div
              variants={variants}
              animate={isShowHeader ? 'showUpLinkControl' : 'hiddenLinkControl'}
              className="m-auto mt-3 w-full grid grid-cols-3 grid-rows-1"
            >
              {arrLink.map((item, index) => {
                return (
                  // <Link
                  //   key={index}
                  //   href={`${item.ref}`} >
                  <div
                    key={index}
                    className=" relative w-full
                    before:bottom-0 before:h-[.2rem]  before:w-0 before:absolute
                    before:bg-slate-500 hover:before:w-full before:transition-all
                    before:duration-200
                  "
                  >
                    <div className='w-fit h-full m-auto'>
                      {item.title}
                    </div>
                  </div>
                  // </Link>
                );
              })}
            </motion.div>
          </div>

          {/* animation scaleup */}
          <motion.div
            ref={refHeader}
            variants={variants}
            animate={isShowHeader ? 'slideDownControlBar' : 'slideUpControlBar'}
            className="w-full h-full box-border px-1 flex items-center
            rounded-full border-slate-400 bg-[#f05123] text-slate-100 font-semibold
          "
            id="scaleUp"
            onClick={handleOnScaleDown}
          >
            <button
              className="flex-1 h-full"
              id="header-control_bar-list-index-1"
              onClick={(event) => {
                onSelected('where');
              }}
            >
              Search Location
            </button>
            <button
              className="flex-1 border-x-2 border-slate-400 h-full"
              id="header-control_bar-list-index-2"
              onClick={(event) => onSelected('checkin')}
            >
              Schedule
            </button>
            <button
              className="flex-1 h-full"
              id="header-control_bar-list-index-4"
              onClick={(event) => onSelected('who')}
            >
              Guests
            </button>
            {/* <button className="rounded-full w-[2rem] h-[2rem] bg-red-500 flex">
              <BiSearch className="w-[1rem] h-[1rem] m-auto text-white" />
            </button> */}
          </motion.div>
        </div>
      </div>

      {/* aniamate header */}
      <motion.div
        variants={variants}
        animate={isShowHeader ? 'controlHeaderShow' : 'controlHeaderHidden'}
        ref={refHeaderControl}
        className="absolute w-full h-[5rem] mt-[5rem] bg-white
        box-border z-20
      after:h-full after:left-0 after:top-0 after:absolute
      after:w-[calc(100vw-(100vw-100%)/2)] after:bg-white after:-z-10

      before:h-full before:right-0 before:top-0 before:absolute
      before:w-[calc(100vw-(100vw-100%)/2)] before:bg-white before:-z-10
      "
        id="ControlHeader"
      >
        <div
          className="w-[850px] tablet:w-full h-[90%] box-border rounded-full m-auto flex
          text-[15px] transition-all duration-300 border-2
          cursor-pointer
        "
          id="controlBar"
        >
          <ControlBar />
          <Popover />
        </div>
      </motion.div>
    </>
  );
};

export default ControlPlan;
