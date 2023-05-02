import Link from 'next/link';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
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
    const scaleUp = document.getElementById('scaleUp');
    const ControlHeader = document.getElementById('ControlHeader');
    const link = document.getElementById('link');
    const mask = document.getElementById('mask');
    const controlBar = document.getElementById('controlBar');

    scaleUp?.classList.add('animate-slideDownHeader');
    link?.classList.add('animate-slideDownControl');
    controlBar?.classList.add('animate-showAnimate');
    ControlHeader?.classList.add('animate-slideDownControl');
    mask?.classList.add('animate-transparentAnimate');

    scaleUp?.classList.remove('animate-slideUpHeader');
    link?.classList.remove('animate-slideUpControl');
    ControlHeader?.classList.remove('animate-slideUpControl');
    mask?.classList.remove('animate-transparentAnimateReverse');
    controlBar?.classList.remove('animate-hiddenAnimate');
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
                  ">
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
            onClick={handleOnScaleUp}>
            <button className="flex-1 " id="header-control_bar-list-index-1" >
              Anywhere
            </button>
            <button className="flex-1 border-x-2 border-slate-400" id="header-control_bar-list-index-2"
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
        id="ControlHeader">
        <div
          className="w-[850px] tablet:w-full h-[90%] box-border rounded-full m-auto flex
          text-[15px] transition-all duration-300 border-2 invisible overflow-hidden
          cursor-pointer
        "
          id="controlBar">
          <div className="w-full h-full flex">
            <div className="flex-[0.6] flex">
              <div
                className="flex-col flex m-auto w-full rounded-full box-border pl-7
                z-10 relative before:absolute before:w-full before:h-[calc(100%+25px)] before:-translate-y-[calc(15%+1px)]
                before:-translate-x-9 before:-z-10 before:rounded-full transition-all duration-500
                before:shadow-xl
                "
                id="header-control_bar-index-1"
                >
                <span>Where</span>
                {/* the input cho nay lam sau */}
                <span>Search destinations</span>
              </div>

            </div>
            <div className="flex-1 flex">
              <div className="flex-1 flex">
                <div
                  className="flex flex-col m-auto flex-1 box-border pl-3
                z-10 relative before:absolute before:w-full before:h-[calc(100%+25px)] before:-translate-y-[calc(15%+1px)]
                before:-translate-x-3 before:-z-10 before:rounded-full transition-all duration-500
                before:shadow-xl
                "
                  >
                  <span>Check in</span>
                  <span>Add dates</span>
                </div>
                <div
                  className="flex flex-col m-auto flex-1 box-border pl-3
                z-10 relative before:absolute before:w-full before:h-[calc(100%+25px)] before:-translate-y-[calc(15%+1px)]
                before:-translate-x-3 before:-z-10 before:rounded-full transition-all duration-500
                before:shadow-xl
                "
                  id="header-control_bar-index-3"
                  >
                  <span>Check out</span>
                  <span>Add dates</span>
                </div>
              </div>
              <div className="flex-1 flex">
                <div
                  className="flex-1 flex flex-col m-auto box-border pl-3
                z-10 relative before:absolute before:w-[calc(200%+30px)] before:h-[calc(100%+25px)] before:-translate-y-[calc(15%+1px)]
                before:-translate-x-3 before:-z-10 before:rounded-full transition-all duration-500
                before:shadow-xl
                "
                  id="header-control_bar-index-4"
                  >
                  <span>Who</span>
                  <span>Add guests</span>
                </div>

                <div className="flex-1 flex box-border p-3 w-full relative z-10">
                  <div className="rounded-full w-full h-full bg-red-500 flex ">
                    <BiSearch className="w-[30px] h-[30px] m-auto text-white" />
                    <span className="text-white font-semibold m-auto ml-0">Search</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ControlPlan;
