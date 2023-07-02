import { filterFormAnimateContext } from "@/contexts/filterFormAnimate";
import { motion } from "framer-motion";
import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { BsStack } from "react-icons/bs";
import { HiOutlineFilter } from "react-icons/hi";
import { imgArr } from "../imgArr";
import Image from 'next/image'

const DesktopLaptop = () => {
  const [isHoverTypehouse, setIsHoverTypehouse] = useState<boolean>(false);
  const [keyHover, setKeyHover] = useState<number>(-1);
  const [keyHoverControl, setKeyHoverControl] = useState<number>(-1);

  const [keyClickTypehouse, setKeyClickTypehouse] = useState<number>(-1);

  const { setIsClickOutSide } = useContext(filterFormAnimateContext);

  const mainDivRef = useRef<HTMLDivElement>(null);
  const secondaryDivRef = useRef<HTMLDivElement>(null);

  const classIcon = 'w-full h-[70px] p-3';
  const controlBtn: { title: string, icon: ReactElement<any, any> }[] = [
    { title: 'Menu', icon: <BsStack className={classIcon} /> },
    { title: 'Filter', icon: <HiOutlineFilter className={classIcon} /> }
  ]


  // useEffect nay lam popup khi the div kia scroll thi the div con lai scroll theo
  useEffect(() => {
    const mainDiv = mainDivRef.current;
    const secondaryDiv = secondaryDivRef.current;
    if (!mainDiv || !secondaryDiv) return;

    const handleScroll = () => {
      const scrollPosition = mainDiv.scrollTop;
      secondaryDiv.scrollTop = scrollPosition;
    };

    mainDiv.addEventListener('scroll', handleScroll);

    return () => {
      mainDiv.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-[calc(50vh-230px)] left-0 z-[15]">
      <motion.div className='w-[70px] h-fit
    rounded-r-2xl border-2 border-slate-500 border-l-0 bg-white z-10 overflow-hidden
    '>

        <motion.div className="w-full h-fit" ref={mainDivRef}>
          {controlBtn.map((item: { title: string, icon: ReactElement<any, any> }, index: number) => {
            return (
              <motion.div key={index} onHoverStart={() => { setIsHoverTypehouse(true); setKeyHoverControl(index) }}
                onHoverEnd={() => { setIsHoverTypehouse(false); setKeyHoverControl(-1) }}
                onClick={(event) => {
                  if (item.title === 'Filter') {
                    window.scrollTo(0, 0);
                    setIsClickOutSide(true);
                    document.body.style.overflow = 'hidden';
                  }
                }}
                className="border-b-2 border-slate-700"
              >
                <motion.div className="w-full h-fit">
                  {item.icon}
                </motion.div>
              </motion.div>
            )
          })}
          {imgArr.map((item: { title: string; path: (type: string) => ReactElement<any, any> }, index: number) => {
            return (
              <motion.div key={index} onHoverStart={() => { setIsHoverTypehouse(true); setKeyHover(index) }}
                onHoverEnd={() => { setIsHoverTypehouse(false); setKeyHover(-1) }}
                onClick={(event) => {setKeyClickTypehouse(index)}}
                className="p-1"
              >

                <motion.div className="w-full relative flex" >
                  {item.path(`m-auto text-[58px] w-full stroke-1 hover:text-red-500 transition-all
                  ${keyClickTypehouse===index ? 'bg-red-400 rounded-full text-white' : ''}
                  `)}

                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-[90px] top-0 w-fit h-full flex flex-col
      z-30 overflow-scroll overflow-x-hidden  overflow-y-hidden pointer-events-non
      " ref={secondaryDivRef}>
        {controlBtn.map((item: { title: string, icon: ReactElement<any, any> }, index: number) => {
          return (
            <div key={index} className="flex-1 ">
              <motion.div className={`w-fit flex-1 h-full
              ${isHoverTypehouse && keyHoverControl === index ? 'visible' : 'invisible'}
              `}>
                <div className="flex rounded-xl bg-white p-3 border-2">
                  <span className="m-auto">{item.title}</span>
                </div>
              </motion.div>
            </div>
          )
        })}
        {imgArr.map((item: { title: string; path: (type: string) => ReactElement<any, any> }, index: number) => {
          return (
            <div key={index} className="flex-1">
              <motion.div className={`w-fit flex-1 h-full
              ${isHoverTypehouse && keyHover === index ? 'visible' : 'invisible'}
              `}>
                <div className="flex rounded-xl bg-white p-3 border-2">
                  <span className="m-auto  whitespace-nowrap">{item.title}</span>
                </div>
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default DesktopLaptop;