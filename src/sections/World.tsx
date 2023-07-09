'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { TitleText, TypingText } from '@/components/about';
import { fadeIn, staggerContainer } from '../utils/motion';

const World = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer(null, null)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title="| People on the World" textStyles="text-center" />
      <TitleText
        title={<>Track friends around you and invite them to join together</>}
        textStyles="text-center"
      />

      <motion.div
        variants={fadeIn('up', 'tween', 0.3, 1)}
        className="relative mt-[68px] flex w-full h-[34.3rem]"
      >
        <img src="/about/map.png" alt="map" className="w-full h-full object-cover" />

        <div className="absolute bottom-20 right-20 w-[4.5rem] h-[4.5rem] p-[6px] rounded-full bg-[#5D6680]">
          <img src="/about/people-01.png" alt="people" className="w-full h-full" />
        </div>

        <div className="absolute top-10 left-20 w-[4.5rem] h-[4.5rem] p-[6px] rounded-full bg-[#5D6680]">
          <img src="/about/people-02.png" alt="people" className="w-full h-full" />
        </div>

        <div className="absolute top-1/2 left-[45%] w-[4.5rem] h-[4.5rem] p-[6px] rounded-full bg-[#5D6680]">
          <img src="/about/people-03.png" alt="people" className="w-full h-full" />
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default World;
