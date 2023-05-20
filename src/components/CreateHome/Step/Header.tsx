import React from 'react';

import ButtonHeader from '../ButtonHeader';
import Logo from '../../../../public/assets/Logo.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
      <motion.div
        variants={ImgVariants}
        initial="hidden"
        animate="visible"
        className="cursor-pointer"
      >
        <Image width={80} className="" src={Logo} alt=" Logo" />
      </motion.div>

      <div>
        <ButtonHeader content="Questions?" />
        <ButtonHeader content="Save & exit" />
      </div>
    </div>
  );
}
