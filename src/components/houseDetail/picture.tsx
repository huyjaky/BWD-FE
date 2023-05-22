import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { BiMenu } from 'react-icons/bi';
interface PictureProps {
  arrImg: { Path: string }[];
}

const Picture = ({ arrImg }: PictureProps) => {
  const { setIsShowAllPt } = useContext(filterFormAnimateContext);
  return (
    <div
      className="w-full h-[450px] grid gap-3 rounded-3xl overflow-hidden mt-7
    grid-cols-layoutPicture grid-rows-layoutPicture grid-areas-layoutPicture
    relative
    "
    >
      <img src={arrImg[0].Path} alt="" className="grid-in-h1 object-cover w-full h-full" />
      <img src={arrImg[1].Path} alt="" className="grid-in-h2 object-cover w-full h-full" />
      <img src={arrImg[2].Path} alt="" className="grid-in-h3 object-cover w-full h-full" />
      <img src={arrImg[3].Path} alt="" className="grid-in-h4 object-cover w-full h-full" />
      <img src={arrImg[4].Path} alt="" className="grid-in-h5 object-cover w-full h-full" />
      <motion.button
        onClick={(event) => {
          setIsShowAllPt(true);
          document.body.style.overflow = 'hidden';
        }}
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
  );
};
export default Picture;
