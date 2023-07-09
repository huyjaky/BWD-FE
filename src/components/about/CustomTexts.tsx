'use client';

import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from '../../utils/motion';

interface TypingTextProps {
  title: any;
  textStyles: string;
}

export const TypingText = ({ title, textStyles }: TypingTextProps) => (
  <motion.p
    variants={textContainer}
    className={`font-normal text-[1.5rem] text-slate-600 ${textStyles}`}
  >
    {Array.from(title).map((letter: any, index: number) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
);

export const TitleText = ({ title, textStyles }: TypingTextProps) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[.5rem] font-bold md:text-[4rem] text-[3rem] text-black ${textStyles}`}
  >
    {title}
  </motion.h2>
);
