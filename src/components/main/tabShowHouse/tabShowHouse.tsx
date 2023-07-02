// import required modules

import { motion } from "framer-motion";
import { BsChevronDoubleDown } from "react-icons/bs";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SlideShowHouse from "./slideShowHouse";


const TabShowHouse = () => {
  const arrTemp: number[] = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="h-fit">
      <SlideShowHouse />
      <div className="w-full h-[70px] flex hover:border-2 hover:border-red-500
      rounded-2xl transition-all duration-500
      ">
        <div className="w-fit h-fit m-auto flex flex-col">
          <motion.div className="m-auto ">
            <BsChevronDoubleDown  className="text-[30px]"/>
          </motion.div>
          <span className="font-semibold">Show more</span>
        </div>
      </div>
    </div>
  );
};

export default TabShowHouse;
