import React, { useState } from 'react';
import { motion } from 'framer-motion';
interface Step {
  number: number;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  handleNextStep: () => void;
  handleBackStep: () => void;
}
const buttonVariants = {
  initial: {
    scale: 1,
    textShadow: "none",
    boxShadow: "none",
    transition: {
      duration: 1
    }
  },
  hover: {
    scale: [1, 1.1, 1, 1.1, 1],
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255 ,255,255)",
    transition: {
      duration: 1,
      //  mô phỏng lại yoyo giúp khỏi xài keyframe 
      // có thể set: số lần or infinity(vĩnh cửu)
    }
  }
}
const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep, handleBackStep, handleNextStep }) => {



  return (
    <div className="fixed bottom-0 left-0 w-full h-[80px] items-center bg-white">
      <div className="w-full bg-gray-200  h-2 ">
        <motion.div
          className="bg-black h-2 "
          style={{ borderRadius: " 0 10px 10px 0" }}
          animate={{ width: `${(currentStep / steps.length) * 100}%` }}
          transition={{ duration: 1 }}
        >
        </motion.div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          className="py-4 px-8 bg-whiter text-[#222222] font-semibold text-[16px] rounded-xl inline ml-8 underline"
          onClick={handleBackStep}
        >
          Back
        </motion.button>

        <motion.div
          variants={buttonVariants}
          initial='initial'
          whileHover='hover'

        >
          <motion.button
            className="py-4 px-8 bg-[#222222] text-white font-semibold text-[16px] rounded-xl inline mr-8"
            onClick={handleNextStep}
          >
            Next
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
};

export default ProgressBar;
