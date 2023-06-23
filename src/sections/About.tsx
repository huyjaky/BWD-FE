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
      <TypingText title="| About Olympus" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-slate-700"
      >
        Welcome to
        <span className="font-extrabold text-black">Olympus</span>, the cutting-edge real estate platform that
        leverages Artificial Intelligence <span className="font-extrabold text-black">(AI){' '}</span>
        to revolutionize your property search experience.
        With a user-friendly interface and state-of-the-art AI technology,{' '}
        <span className="font-extrabold text-black">Olympus</span>  is your ultimate destination for finding the perfect home.

      </motion.p>

      <motion.div variants={fadeIn('up', 'tween', 0.3, 1)}>
        <AiOutlineArrowDown className="text-[40px] object-contain mt-[28px] text-black" />
      </motion.div>
    </motion.div>
  </section>
);

export default About;
