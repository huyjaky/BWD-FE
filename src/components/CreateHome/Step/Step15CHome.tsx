import React, { ChangeEvent, useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { newHouseContext } from '../../../contexts/createHome';

export default function Step15CHome() {
  const { state, dispatch } = useContext(newHouseContext);

  const [selectedOption, setSelectedOption] = useState<string>(state.guest);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption((prevState) => event.target.value);
  };

  useEffect(() => {
    dispatch({ type: 'STEP15', payload: selectedOption });
  }, [selectedOption]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-[98vw] px-[80px]
                        mobile:px-0
                        mobile:pb-20
        "
    >
      <div
        className="w-[65%] mobile:w-[100%] ml-auto mr-auto pl-[70px] mt-[30px]
            mobile:pl-0
            laptop:w-[90%]
            tablet:w-[90%]
            "
      >
        <div className="flex flex-col px-10 w-[100%]">
          <div className="mb-[32px]">
            <div className="mb-[62px] h-[82px] tablet:mb-[62px] laptop:mb-[22px] mobile:mb-[152px] w-[100%] ml-auto mr-auto ">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                className="text-[32px] font-semibold w-[100%] leading-10 mb-3
                        "
              >
                Choose who to welcome for your first reservation
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                className="text-[18px] text-[#717171] "
              >
                After your first guest, anyone can book your place.{' '}
                <span className="underline">Learn more</span>
              </motion.p>
            </div>
            <div className="">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.1 }}
                className={`flex flex-col my-[16px] p-[24px] border
                            ${
                              selectedOption === 'Anyolympusguest'
                                ? 'bg-[#F7F7F7] border-[2px] hover:border-black border-black'
                                : 'border-gray-200 border-[2px] hover:border-black'
                            }
                             rounded-[14px] hover:border-black cursor-pointer
                            `}
              >
                <motion.div className="flex items-center justify-center cursor-pointer">
                  <div>
                    <input
                      value="Anyolympusguest"
                      onChange={handleRadioChange}
                      id="bordered-radio-1"
                      type="radio"
                      name="bordered-radio"
                      checked={selectedOption === 'Anyolympusguest'}
                      className="w-4 h-4
                                        text-black
                                        rounded-[50%]
                                        bg-black
                                       "
                    />
                  </div>
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full cursor-pointer ml-2 text-[18px] font-semibold text-black "
                  >
                    Any olympus guest
                  </label>
                </motion.div>
                <div className="flex justify-start">
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full ml-6 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Get reservations faster when you welcome anyone from the olympus community.
                  </label>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.3 }}
                className={`flex flex-col p-[24px] rounded-[14px] cursor-pointer  ${
                  selectedOption === 'AnExperiancedguest'
                    ? 'bg-[#F7F7F7] border-[2px] hover:border-black border-black'
                    : 'border-gray-200 border-[2px] hover:border-black'
                }`}
              >
                <div className="flex justify-center items-center cursor-pointer">
                  <div className="cursor-pointer">
                    <input
                      value="AnExperiancedguest"
                      onChange={handleRadioChange}
                      checked={selectedOption === 'AnExperiancedguest'}
                      id="bordered-radio-2"
                      type="radio"
                      name="bordered-radio"
                      className="w-4 h-4 cursor-pointer "
                    />
                  </div>
                  <label
                    htmlFor="bordered-radio-2"
                    className="w-full ml-2 text-[18px] font-semibold text-gray-900 cursor-pointer"
                  >
                    An experienced guest
                  </label>
                </div>
                <div className="ml-6 flex justify-start cursor-pointer">
                  <label
                    htmlFor="bordered-radio-2"
                    className="w-full text-sm cursor-pointer font-medium text-gray-900 dark:text-gray-300"
                  >
                    For your first guest, welcome someone with a good track record on Olympus who
                    can offer tips for how to be a great Host.
                  </label>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
