import React from 'react';

import ButtonHeader from '../ButtonHeader';
import Logo from '../../../../public/assets/Logo.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
  const ImgVariants = {
    hidden: {
      opacity: 0,
      rotate: -180
    },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 2
      }
    }
  };

  return (
    <div className="px-[48px] pt-[32px] flex justify-between">
      {/* <img src={logo} alt="logo" className="w-[32px] h-[32px]" /> */}
      {/* <img src={Lo} /> */}
      <Link href={'/homepage'}>
        <motion.div
          variants={ImgVariants}
          initial="hidden"
          animate="visible"
          className="cursor-pointer"
        >
          <Image width={80} className="" src={Logo} alt=" Logo" />
        </motion.div>
      </Link>

      <div className="flex">
        {/* <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 35 }}
        >
          <ButtonHeader content="Questions?" />
        </motion.div> */}
        <Link href={'/homepage'}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 35 }}
          >
            <ButtonHeader content="Save & exit" />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
