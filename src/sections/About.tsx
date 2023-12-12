'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';
import { TypingText } from '@/components/about';
import { AiOutlineArrowDown } from 'react-icons/ai';

const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer(null, null)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About Candy" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[2rem] text-[1rem] text-center text-slate-700"
      >

        Welcome to <span className="font-extrabold text-black"> Candy </span>{' '}, our real estate website, our website
        offers a user-friendly interface that provides your real estate
        search experience. With so many features packed in, we're confident <span className="font-extrabold text-black"> Candy </span>{' '}
        is your ultimate destination
        for finding the perfect home.
      </motion.p>

      <motion.div variants={fadeIn('up', 'tween', 0.3, 1)}>
        <AiOutlineArrowDown className="text-[2.4rem] object-contain mt-[28px] text-black" />
      </motion.div>
    </motion.div>
  </section>
);

export default About;
