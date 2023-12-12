'use client';

import { socials } from '@/constants';
import styles from '@/styles';
import { footerVariants } from '@/utils/motion';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const Footer = () => {
  const [isTapJoin, setIsTapJoin] = useState<boolean>(false);
  return (
    <>
      <motion.footer
        variants={footerVariants}
        initial="hidden"
        whileInView="show"
        className={`${styles.xPaddings} py-8 relative`}
      >
        <div className="footer-gradient" />
        <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
          <div className="flex items-center justify-between flex-wrap gap-5 roud ">
            <h4 className="font-bold md:text-[4rem] text-[3rem] text-black">JOIN WITH US</h4>
            <Link href={'/homepage'}>
              <motion.button
                onClick={(event) => setIsTapJoin(true)}
                whileTap={{ scale: 0.8 }}
                type="button"
                className="flex items-center h-fit py-4 px-6 bg-white border-2 rounded-[2rem] gap-[1rem]
            border-slate-600 relative
            "
              >
                <span className="text-[1rem] text-black font-semibold">JOIN</span>
                <motion.div
                  initial={{ visibility: 'hidden' }}
                  animate={isTapJoin ? { visibility: 'visible', scale: 100 } : {}}
                  transition={{ duration: 2, type: 'tween' }}
                  className="absolute w-[4rem] h-[4rem] bg-white z-50 right-0 rounded-full pointer-events-none"
                ></motion.div>
              </motion.button>
            </Link>
          </div>

          <div className="flex flex-col">
            <div className="mb-[3rem] h-[.2rem] bg-white opacity-10" />

            <div className="flex items-center justify-between flex-wrap gap-4">
              <h4 className="font-extrabold text-[2rem] text-black">Candy</h4>
              <p className="font-normal text-[1rem] text-black opacity-50">
                Copyright © 2022 - 2023 Candy. All rights reserved.
              </p>

              <div className="flex gap-4">
                {socials.map((social) => (
                  <img
                    key={social.name}
                    src={social.url}
                    alt={social.name}
                    className="w-[2rem] h-[2rem] object-contain cursor-pointer fill-slate-900"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
