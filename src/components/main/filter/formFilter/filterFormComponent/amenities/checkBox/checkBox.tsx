import { useContext, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { filterContext } from '@/contexts/filter';

const tickVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 1 : 0.2 }),
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 }
};

const boxVariants = {
  hover: { scale: 1, strokeWidth: 7 },
  pressed: { scale: 1, strokeWidth: 4 },
  checked: { stroke: '#FF008C' },
  unchecked: { stroke: '#ddd', strokeWidth: 5 }
};

interface CheckBoxProps{
  isCheckedProps: boolean
}

const CheckBox = ({isCheckedProps}: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(isCheckedProps);
  const {filterForm} = useContext(filterContext);
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  useEffect(()=>{
    setIsChecked(isCheckedProps);
  }, [isCheckedProps, isChecked])

  return (
    <div className='text-left'>
      <motion.svg
        initial={false}
        animate={isChecked ? 'checked' : 'unchecked'}
        whileHover='hover'
        whileTap='pressed'
        width='40'
        height='40'
        onClick={() => setIsChecked(!isChecked)}
        className='stroke-[3.5px] outline-none'
      >
        <motion.path
          d='M 7.2 13.6 C 7.2 10.0654 10.0654 7.2 13.6 7.2 L 30.4 7.2 C 33.9346 7.2 36.8 10.0654 36.8 13.6 L 36.8 30.4 C 36.8 33.9346 33.9346 36.8 30.4 36.8 L 13.6 36.8 C 10.0654 36.8 7.2 33.9346 7.2 30.4 Z'
          fill='transparent'
          strokeWidth='5'
          stroke='#FF008C'
          variants={boxVariants}
          className='stroke-[3.5px] stroke-slate-600 '
        />
        <motion.path
          d='M 0 12.8666 L 12.8658 25.7373 L 27.2016 0'
          transform='translate(8.4917 8.8332) rotate(-4 20.0904 20.8687)'
          fill='transparent'
          strokeWidth='7'
          stroke='hsl(0, 0%, 100%)'
          strokeLinecap='round'
          strokeLinejoin='round'
          variants={tickVariants}
          style={{ pathLength, opacity }}
          custom={isChecked}
          className='stroke-[5px] stroke-slate-200'
        />
        <motion.path
          d='M 0 12.8666 L 12.8658 25.7373 L 27.2016 0'
          transform='translate(7.4917 6.8947) rotate(-4 17.0904 12.8687)'
          fill='transparent'
          strokeWidth='7'
          stroke='#7700FF'
          strokeLinecap='round'
          strokeLinejoin='round'
          variants={tickVariants}
          style={{ pathLength, opacity }}
          custom={isChecked}
          className='stroke-[5px] stroke-red-500'


        />
      </motion.svg>
    </div>
  );
};
export default CheckBox;
