'use client';

import { motion } from 'framer-motion';

import styles from '../../styles';
import { fadeIn } from '../../utils/motion';

interface ExploreCardProps {
  id: string;
  imgUrl: string;
  title: string;
  index: number;
  active: string;
  handleClick: any;
}

const ExploreCard = ({ id, imgUrl, title, index, active, handleClick }: ExploreCardProps) => (
  <motion.div
    variants={fadeIn('right', 'tween', index * 0.3, 0.75)}
    className={`relative ${
      active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
    } flex items-center justify-center min-w-[11rem] h-[44rem]  duration-[0.7s] ease-out-flex cursor-pointer
      transition-[flex] `}
    onClick={() => handleClick(id)}
  >
    <img
      src={imgUrl}
      alt="planet-04"
      className="absolute w-full h-full object-cover rounded-[1.5rem]"
    />
    {active !== id ? (
      <h3 className="font-semibold sm:text-[2rem] text-[1rem] text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
        {title}
      </h3>
    ) : (
      <div
        className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[2rem] transition-all
      ease-linear
      "
      >
        <div
          className={`${styles.flexCenter} w-[4rem] h-[4rem] rounded-[2rem] glassmorphism mb-[1rem]
          transition-all ease-in-out
          `}
        >
          <img src="/about/headset.svg" alt="headset" className="w-1/2 h-1/2 object-contain" />
        </div>
        <p className="font-normal text-[1rem] leading-[1rem] text-white uppercase">
          Explorer house
        </p>
        <h2 className="mt-[2rem] font-semibold sm:text-[2rem] text-[2rem] text-white">{title}</h2>
      </div>
    )}
  </motion.div>
);

export default ExploreCard;
