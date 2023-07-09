'use client';

import { Variants, motion } from 'framer-motion';

import styles from '../../styles';
import { navVariants } from '../../utils/motion';
import { BsList } from 'react-icons/bs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const variants: Variants = {
  show: {
    height: 100
  },
  hidden: {
    height: 0,
    paddingTop: 0,
    paddingBottom: 0
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    document.addEventListener('mousedown', (event) => {
      setIsOpen(false);
    });
  }, []);

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative`}
    >
      <div className="absolute w-[50%] inset-0 gradient-01" />
      <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8 relative`}>
        <div className="w-[2rem] h-[2rem] object-contain"></div>
        <h2 className="font-extrabold text-[2rem] leading-[2rem] text-black">Olympus</h2>
        {/* <img src="/about/menu.svg" alt="menu" className="w-[2rem] h-[2rem] object-contain fill-black" /> */}
        <BsList
          className="w-[2rem] h-[2.4rem] object-contain text-black"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />

        <motion.div
          variants={variants}
          animate={isOpen ? 'show' : 'hidden'}
          className="absolute top-[2.4rem] w-full h-[6.25rem] bg-white
      rounded-3xl shadow-xl overflow-hidden box-border py-3 "
        >
          <div className="w-full h-full">
            <Link href={'/homepage'}>
              <motion.button className="w-full h-fit">
                <span
                  className="text-[1rem] bg-red-500 px-3 py-1 rounded-2xl
            text-white
            "
                >
                  Homepage
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
