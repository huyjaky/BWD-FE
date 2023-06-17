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
        <span className="font-extrabold text-black">Olympus</span> is a new thing in the future,
        where you can find any house in the world{' '}
        <span className="font-extrabold text-black">madness of the olympus</span> of today, using{' '}
        <span className="font-extrabold text-black">AI</span> devices you can easily explore a house
        you want. Let's <span className="font-extrabold text-black">explore</span> the madness of
        the metaverse by scrolling down
      </motion.p>

      <motion.div variants={fadeIn('up', 'tween', 0.3, 1)}>
        <AiOutlineArrowDown className="text-[40px] object-contain mt-[28px] text-black" />
      </motion.div>
    </motion.div>
  </section>
);

export default About;
