import { useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { imgArr } from './imgArr';

const TypeHouse = () => {

  const slide = useRef<HTMLInputElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(()=>{
    if (slide.current) {
      setWidth(slide.current?.scrollWidth - slide.current.offsetWidth);
    }
  }, [])

  const handleOnClick = (event: any) => {
    console.log('check');
  }

  return (
    <div className="w-full h-full relative z-10">
      <motion.div className='w-full h-full overflow-hidden' ref={slide}>
        <motion.div
          className="grid grid-flow-col w-fit h-fit"
          drag='x'
          dragConstraints={{right: 0, left: -width}}>
          {imgArr?.map((item: { title: string; path: string }, index: number) => {
            return (
              <motion.div
                key={index}
                className="w-fit h-full flex flex-col mx-[20px] box-border
            py-3 relative after:absolute after:w-0 after:h-[3px] after:bottom-0 after:bg-slate-600
            after:hover:w-full after:transition-all after:duration-500"
            onClick={handleOnClick}
            >
                <div className="w-full h-fit flex pointer-events-none" >
                  <img src={`${item.path}`} alt="" className="w-[30px] h-[30px] m-auto" />
                </div>
                <span className="w-full h-fit text-[15px] whitespace-nowrap">{item.title}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TypeHouse;
