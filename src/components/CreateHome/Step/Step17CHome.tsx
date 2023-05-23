import React from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

export default function Step17CHome() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-[98vw] px-[80px]
                        mobile:px-0
                        mobile:h-[630px]
        "
    >
      <div
        className="w-[65%] ml-auto mr-auto pl-[70px] mt-[30px]
            mobile:pl-0
            laptop:w-[90%]
            tablet:w-[90%]
            "
      >
        <div className="flex flex-col px-10 w-[100%] mobile:px-0">
          <div className="mb-[32px]">
            <div className="mb-[0px] h-[65px] w-[100%] ">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 35, delay: 0.1 }}
                className="text-[32px] font-semibold w-[100%] leading-10 mb-3
                        "
              >
                Just one last step!
              </motion.h1>
            </div>
            <div className="border-b-[1px] flex flex-col gap-3 pb-[48px]">
              <div className="mb-[20px]">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 35, delay: 0.2 }}
                  className="flex items-center text-[18px] font-semibold">
                  Does your place have any of these? <RiErrorWarningLine className="ml-2" />{' '}
                </motion.h1>
              </div>
              <div className="flex flex-col gap-3">
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 35, delay: 0.2 }}
                  className="flex items-center mb-4 justify-between">
                  <div>
                    <label htmlFor="security-camera" className="text-[16px] text-gray-900 ">
                      Security camera(s)
                    </label>
                  </div>
                  <input
                    id="security-camera"
                    type="checkbox"
                    value=""
                    className="w-[24px] h-[24px] text-white rounded-[20px] checked:bg-black"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 35, delay: 0.3 }}
                  className="flex items-center mb-4 justify-between">
                  <div>
                    <label htmlFor="Weapons" className="text-[16px] text-gray-900 ">
                      Weapons
                    </label>
                  </div>
                  <input
                    id="Weapons"
                    type="checkbox"
                    value=""
                    className="w-[24px] h-[24px] text-white rounded-[20px] checked:bg-black"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 35, delay: 0.4 }}
                  className="flex items-center mb-4 justify-between">
                  <div>
                    <label htmlFor="Dangerous-animals" className="text-[16px] text-gray-900 ">
                      Dangerous animals
                    </label>
                  </div>
                  <input
                    id="Dangerous-animals"
                    type="checkbox"
                    value=""
                    className="w-[24px] h-[24px] text-white rounded-[20px] checked:bg-black"
                  />
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 35, delay: 0.2 }}
              className="pt-[48px]">
              <h1 className="mb-2 text-[18px] text-[#717171] font-semibold">
                Important things to know
              </h1>
              <div className="leading-5 text-[#717171]">
                Be sure to comply with your <span className="underline">local laws</span> and review
                Airbnb's <span className="underline">nondiscrimination policy</span> and{' '}
                <span className="underline">guest and Host fees</span>.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
