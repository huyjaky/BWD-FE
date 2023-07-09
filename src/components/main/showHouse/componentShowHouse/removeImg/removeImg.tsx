import MaskPt from "@/components/houseDetail/showAllHousePt/maskPt";
import { house_ } from "@/models/house";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";

interface RemoveImgProps {
  arrImg: { Path: string }[],
  tempHouse: house_ | undefined;
  setTempHouse: Dispatch<SetStateAction<house_ | undefined>>;
}


const   RemoveImg = ({ arrImg, tempHouse, setTempHouse }: RemoveImgProps) => {
  const [select, setSelect] = useState<string | null>('');
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  return (
    <motion.div
      // variants={variants}
      // transition={{ duration: 0.6 }}
      // onClickCapture={(event) => {
      //   document.body.style.overflow = 'hidden';
      // }}
      className="w-full h-fit"
    >
      <div className="h-full w-full relative flex">
        {/* content */}
        <div className="w-full h-full ">
          <div className="w-full columns-2 h-fit gap-2  m-auto  mt-16 mb-14 overflow-hidden ">
            {arrImg.map((item: { Path: string }, index: number) => {
              return (
                <motion.div whileHover={{ opacity: 0.6 }} key={index} className="relative">
                  <img
                    src={'/api/img/path/' + item.Path}
                    alt=""
                    onClick={() => setSelect(item.Path)}
                    className="w-full
                      shadow-xl image-full cursor-pointer mb-2 rounded-lg
                    "
                  />
                  <div
                    onClick={() => {
                      if (tempHouse) {
                        if (tempHouse.arrImg.length == 5) return;
                        setTempHouse({ ...tempHouse, arrImg: [...tempHouse?.arrImg.filter(item_=>item.Path !== item_.Path)]})
                      }
                    }}
                    className="absolute w-fit h-fit top-2 right-2 bg-white rounded-md z-30">
                    <RiDeleteBin5Line className="w-[2.4rem] h-[2.4rem] text-red-500 " />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <MaskPt Path={select} setPath={setSelect} />
      </div>
    </motion.div>
  )
}
export default RemoveImg;
