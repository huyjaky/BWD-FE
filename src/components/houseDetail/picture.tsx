import { IsShowPtContext } from '@/contexts/isShowPt';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import MaskPt from './showAllHousePt/maskPt';
interface PictureProps {
  arrImg: { Path: string }[];
}

const Picture = ({ arrImg }: PictureProps) => {
  const { setIsShowAllPt } = useContext(IsShowPtContext);
  const [select, setSelect] = useState<string | null>('');

  const handleOnClick = () => {
    setIsShowAllPt(true);
    document.body.style.overflow = 'hidden';
  };

  const settingImg = 'object-cover w-full h-full hover:opacity-50  transition-all duration-500';

  return (
    <>
      <div
        className="w-full h-[450px] grid gap-3 rounded-3xl overflow-hidden mt-7
    grid-cols-layoutPicture grid-rows-layoutPicture grid-areas-layoutPicture
    relative mobile:hidden tablet:hidden
    "
      >
        <img
          src={arrImg[0].Path}
          alt=""
          onClick={() => setSelect(arrImg[0].Path)}
          className={`grid-in-h1 ${settingImg}`}
        />
        <img
          src={arrImg[1].Path}
          alt=""
          onClick={() => setSelect(arrImg[1].Path)}
          className={`grid-in-h2 ${settingImg}`}
        />
        <img
          src={arrImg[2].Path}
          alt=""
          onClick={() => setSelect(arrImg[2].Path)}
          className={`grid-in-h3 ${settingImg}`}
        />
        <img
          src={arrImg[3].Path}
          alt=""
          onClick={() => setSelect(arrImg[3].Path)}
          className={`grid-in-h4 ${settingImg}`}
        />
        <img
          src={arrImg[4].Path}
          alt=""
          onClick={() => setSelect(arrImg[4].Path)}
          className={`grid-in-h5 ${settingImg}`}
        />
        <motion.button
          onClick={handleOnClick}
          whileTap={{ scale: 0.8 }}
          className="absolute w-[160px] h-[40px] bg-white right-10 bottom-5 rounded-xl
      flex cursor-pointer
      "
        >
          <div className="w-fit h-fit flex items-center m-auto">
            <BiMenu className="text-[20px]" />
            <span className="text-[15px]">Show all photos</span>
          </div>
        </motion.button>
      </div>
      <MaskPt Path={select} setPath={setSelect} />
    </>
  );
};
export default Picture;
