'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { fadeIn, staggerContainer, zoomIn } from '../utils/motion';

const Feedback = () => (
  <section className={`${styles.paddings}`}>
    <motion.div
      variants={staggerContainer(null, null)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-6 transition-all `}
    >
      <motion.div
        variants={fadeIn('right', 'tween', 0.2, 1)}
        className="flex-[0.5] lg:max-w-[34.5rem] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[2rem]
        border-[1px] border-[#6A6A6A] relative transition-all"
      >
        <div className="feedback-gradient" />
        <div>
          <h4 className="font-bold sm:text-[2rem] text-[2rem] sm:leading-[2rem] leading-[2rem] text-black">
            Huy Phan
          </h4>
          <p className="mt-[8px] font-normal sm:text-[1rem] text-[1rem] sm:leading-[22.68px] leading-[16.68px] text-black">
            Founder Candy
          </p>
        </div>

        <p className="mt-[2rem] font-normal sm:text-[2.2rem] text-[1rem] sm:leading-[45.6px] leading-[39.6px] text-black">
          “With Candy, you can easily explore and select your favorite homes. Users can access detailed information
          and interact with homeowners to discover your ideal home.”
        </p>
      </motion.div>

      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className="relative flex-1 flex justify-center items-center transition-all"
      >
        <img
          src="https://thanhtra.com.vn/data/images/0/2021/12/21/nghiemlan/lam-phat-bat-dong-san.jpg"
          alt="planet-09"
          className="w-full lg:h-[38rem] h-auto min-h-[13rem] object-cover rounded-[2.4rem]
          transition-all"
        />
      </motion.div>
    </motion.div>
  </section>
);

export default Feedback;
