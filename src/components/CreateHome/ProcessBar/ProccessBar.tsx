import React, { useState } from 'react';

interface Step {
  number: number;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep, setCurrentStep }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[80px] bg-white">
      <div className="w-full bg-gray-400 h-1.5 mb-2 flex">
        {steps.map((item: Step) => (
          <div
            key={item.number}
            className={`h-1.5 bg-transparent mb-2 transition-all duration-700 ease-out ${
              item.number <= currentStep ? 'bg-[#222222]' : ''
            }`}
            style={{ width: `${100 / steps.length}%` }}
          ></div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="py-4 px-8 bg-whiter text-[#222222] font-semibold text-[16px] rounded-xl inline ml-8 underline"
          onClick={() =>
            setCurrentStep((prevStep) =>
              prevStep <= steps.length && prevStep > 1 ? prevStep - 1 : prevStep
            )
          }
        >
          Back
        </button>
        <button
          className="py-4 px-8 bg-[#222222] text-white font-semibold text-[16px] rounded-xl inline mr-8"
          onClick={() =>
            setCurrentStep((prevStep) => (prevStep < steps.length ? prevStep + 1 : prevStep))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
