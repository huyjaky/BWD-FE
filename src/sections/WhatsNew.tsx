'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { newFeatures } from '../constants';
import { planetVariants, staggerContainer, fadeIn } from '../utils/motion';
import { NewFeatures, TitleText, TypingText } from '@/components/about';

const WhatsNew = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer(null, null)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div
        variants={fadeIn('right', 'tween', 0.2, 1)}
        className="flex-[0.95] flex justify-center flex-col"
      >
        <TypingText title="| Whats new?" textStyles="" />
        <TitleText title={<>What's new about Olympus?</>} textStyles="" />
        <div className="mt-[48px] flex flex-wrap justify-between gap-[2rem]">
          {newFeatures.map((feature) => (
            <NewFeatures key={feature.title} {...feature} />
          ))}
        </div>
      </motion.div>

      <motion.div variants={planetVariants('right')} className={`flex-1 ${styles.flexCenter}`}>
        <img
          src="/about/whats-new.png"
          alt="get-started"
          className="w-[90%] h-[90%] object-contain"
        />
      </motion.div>
    </motion.div>
  </section>
);

export default WhatsNew;
