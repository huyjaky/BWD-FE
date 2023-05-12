import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { imgArr } from './imgArr';

const TypeHouse = () => {
  const slide = useRef<HTMLInputElement>(null);
  const [width, setWidth] = useState<number>(0);


  useEffect(() => {
    if (slide.current) {
      setWidth(slide.current?.scrollWidth - slide.current.offsetWidth);
    }
  }, []);

  const handleOnClickLogo = (event: any) => {
    console.log('check');
  };

  const handleOnClickNext = (event: any) => {
    console.log('next');

  }


  const handleOnCLickPrevious = (event: any) => {
    console.log('previous');
  }

  return (
    <div className="w-full h-full relative z-10">
      <motion.div className="w-full h-full overflow-hidden relative" ref={slide}>
        {/* button right */}
        <div
          className="absolute w-[100px] h-full right-0 bottom-0 z-10
          bg-gradient-to-r from-transparent via-white to-white flex
        "
        >
          <button
            className="w-[40px] h-[40px] m-auto rounded-full
            mt-[10px] flex mr-[10px]
          "
          onClick={handleOnClickNext}
          >
            <GrNext className="m-auto text-[30px]" />
          </button>
        </div>

        {/* button left */}
        <div
          className="absolute w-[100px] h-full left-0 bottom-0 z-10
          bg-gradient-to-l from-transparent via-white to-white
        "
        >
          <button
            className="w-[40px] h-[40px] m-auto rounded-full
            mt-[10px] flex ml-[10px]
          "
          onClick={handleOnCLickPrevious}
          >
            <GrPrevious className="m-auto text-[30px]" />
          </button>
        </div>

        <motion.div
          className="grid grid-flow-col w-fit h-fit box-border px-14"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          transition={{type: 'spring'}}
        >
          {imgArr?.map((item: { title: string; path: string }, index: number) => {
            return (
              <motion.div
                key={index}
                className="w-fit h-full flex flex-col mx-[20px] box-border
            py-3 relative after:absolute after:w-0 after:h-[3px] after:bottom-0 after:bg-slate-600
            after:hover:w-full after:transition-all after:duration-500"
                onClick={handleOnClickLogo}
              >
                <div className="w-full h-fit flex pointer-events-none">
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
