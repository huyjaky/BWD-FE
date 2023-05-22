import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { Variants, motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';

const variants: Variants = {
  show: {
    top: [1200, 0]
  },
  hidden: {
    top: [0, 1200]
  }
};

interface ShowAllHouseProps {
  arrImg: { Path: string }[];
}

const ShowAllHouse = ({ arrImg }: ShowAllHouseProps) => {
  // so lan lap di lap lai cua 12 buc hinh
  let count: number = Math.floor(arrImg.length / 12);
  // so du con lai va so du luon be hon 12
  let extra: number = arrImg.length % 12;
  // diem co dinh tren truc vi tri
  let pointer: number = 0;

  // neu do dai cua mang img be hon 12 thi cho vong chay la 1
  if (arrImg.length < 12) count = 1;

  const part = [];
  const extraElement = [];

  const element = () => {
    let element_ = [];
    // neu mang img be hon 12 thi lay anh tu vi tri 0 -> anh cuoi cung va vi tri do be hon 12
    for (let index = 0; index < (arrImg.length < 12 ? arrImg.length : 12); index++) {
      element_.push(
        <motion.img
          whileHover={{opacity: .4}}
          src={arrImg[pointer].Path}
          key={index}
          alt=""
          className={`object-cover rounded-xl w-full h-full grid-in-h${index + 1}`}
        />
      );
      pointer++;
    }
    return element_;
  };

  for (let index = 0; index < count; index++) {
    part.push(
      <div className="grid gap-3 grid-areas-layoutShowAllPt grid-cols-layoutShowAllPt grid-rows-layoutShowAllPt">
        {element()}
      </div>
    );
  }

  for (let index = 0; index < extra; index++) {
    extraElement.push(
      <motion.img
        whileHover={{opacity: .4}}
        src={arrImg[pointer].Path}
        alt=""
        className={`object-cover rounded-xl w-full h-full grid-in-h${index + 1}`}
      />
    );
    pointer++;
  }

  const { isShowAllPt, setIsShowAllPt } = useContext(filterFormAnimateContext);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  useEffect(() => {}, [isShowAllPt]);

  return (
    <motion.div
      variants={variants}
      initial={isFirstLoading ? false : 'hidden'}
      animate={isShowAllPt ? 'show' : 'hidden'}
      className="fixed top-[1200px] left-0 w-screen h-screen z-50 bg-white">
      <div className="h-full w-full relative flex">
        {/* header */}
        <div className="w-full h-fit absolute top-0">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(event) => setIsShowAllPt(false)}
            className="w-[100px] h-[100px] cursor-pointer flex">
            <IoChevronBackOutline className="text-[50px] m-auto" />
          </motion.button>
        </div>

        {/* content */}
        <div className="w-full h-full overflow-scroll overflow-x-hidden flex">
          <div className="w-fit h-fit  m-auto  mt-16 mb-14 overflow-hidden">

            {part}
            <motion.div className="grid gap-3 mt-3 grid-areas-layoutShowAllPt grid-cols-layoutShowAllPt grid-rows-layoutShowAllPt">
              {extraElement}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShowAllHouse;
