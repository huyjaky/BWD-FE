import { textContainer, textVariant2 } from '@/utils/motion';
import { motion } from 'framer-motion';

interface TypingTextProps {
  title: any;
  textStyles: string;
}

const AnimateTitle = ({ title, textStyles }: TypingTextProps) => {
  return (
    <motion.p
      variants={textContainer}
      className={`font-bold text-[40px]
 mobile:text-[30px] mobile:text-left
      `}
    >
      {Array.from(title).map((letter: any, index: number) => (
        <motion.span variants={textVariant2} key={index}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default AnimateTitle;
