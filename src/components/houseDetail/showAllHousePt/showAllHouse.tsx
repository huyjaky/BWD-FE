import { IsShowPtContext } from '@/contexts/isShowPt';
import { Variants, motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';
import MaskPt from './maskPt';

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
  const [select, setSelect] = useState<string | null>('');

  const { isShowAllPt, setIsShowAllPt } = useContext(IsShowPtContext);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  return (
    <>
      <motion.div
        variants={variants}
        initial={isFirstLoading ? false : 'hidden'}
        animate={isShowAllPt ? 'show' : 'hidden'}
        transition={{ duration: 0.6 }}
        onClickCapture={(event) => {
          document.body.style.overflow = 'hidden';
        }}
        className="fixed left-0 w-screen h-screen z-[500] bg-white"
      >
        <div className="h-full w-full relative flex">
          {/* header */}
          <div className="w-full h-fit absolute top-0 ">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={(event) => {
                setIsShowAllPt(false);
                document.body.style.overflow = 'scroll';
                document.body.style.overflowX = 'hidden';
              }}
              className="w-[100px] h-[100px] cursor-pointer flex"
            >
              <IoChevronBackOutline className="text-[50px] m-auto" />
            </motion.button>
          </div>

          {/* content */}
          <div className="w-full h-full overflow-scroll overflow-x-hidden flex ">
            <div className="w-[700px] columns-2 h-fit gap-2  m-auto  mt-16 mb-14 overflow-hidden ">
              {arrImg.map((item: { Path: string }, index: number) => {
                return (
                  <motion.div whileHover={{ opacity: 0.6 }} key={index}>
                    <img
                      src={'/api/img/path/'+item.Path}
                      alt=""
                      onClick={() => setSelect(item.Path)}
                      className="w-full
                      shadow-xl image-full cursor-pointer mb-2 rounded-lg
                    "
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
          <MaskPt Path={select} setPath={setSelect} />
        </div>
      </motion.div>
    </>
  );
};

export default ShowAllHouse;
