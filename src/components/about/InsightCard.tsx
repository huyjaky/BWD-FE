'use client';

import { motion } from 'framer-motion';

import { fadeIn } from '../../utils/motion';
import { BsArrowUpRightCircle } from 'react-icons/bs';

interface InsightCardProps {
  imgUrl: string,
  title: string,
  subtitle: string,
  index: number
}

const InsightCard = ({ imgUrl, title, subtitle, index }: InsightCardProps) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 1)}
    className="flex md:flex-row flex-col gap-4"
  >
    <img
      src={imgUrl}
      alt="planet-01"
      className="md:w-[270px] w-full h-[250px] rounded-[32px] object-cover"
    />
    <div className="w-full flex justify-between items-center">
      <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
        <h4 className="font-normal lg:text-[42px] text-[26px] text-black">
          {title}
        </h4>
        <p className="mt-[16px] font-normal lg:text-[20px] text-[14px] text-slate-700">
          {subtitle}
        </p>
      </div>

      <motion.div
        whileHover={{scale: 1.2}}
        className="lg:flex hidden items-center justify-center w-[100px] h-[100px] rounded-full bg-transparent"
      >
        <BsArrowUpRightCircle
          className="w-full h-full object-contain text-slate-500"
        />
      </motion.div>
    </div>
  </motion.div>
);

export default InsightCard;
