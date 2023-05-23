import React, { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { FiMinus } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Step6CHome() {
  const [guestCount, setguestCount] = useState(1);

  const [BedroomCount, setBedroomCount] = useState(1);

  const [BedsCount, setBedsCount] = useState(1);

  const [BathroomCount, setBathroomCount] = useState(1);

  const [showExtraRow, setShowExtraRow] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-[98vw] h-[700px] px-[80px] tablet:px-[50px] mt-10"
    >
      <div className="w-[60%] tablet:w-[80%] laptop:w-[80%] mobile:w-[100%] ml-auto mr-auto pl-[70px] mobile:pl-0 ">
        <div>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 35, delay: 0.1 }}
              className="text-[32px] font-semibold
                        mobile:text-[26px]
                        tablet:text-[26px]
                        "
            >
              Share some basics about your place
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
              className="text-[18px] py-[18px] text-[#717171]"
            >
              You'll add more details later, like bed types.
            </motion.h2>
            <div className="flex flex-col justify-between">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.3 }}
                className="flex justify-between py-[24px] border-b-[1px]"
              >
                <div>
                  <h1 className="text-[18px] ">Guests</h1>
                </div>
                <div className="flex justify-between gap-3 items-center">
                  <button
                    className={`border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300 hover:border-black `}
                    style={{}}
                    onClick={() => setguestCount((prev) => prev - 1)}
                  >
                    <FiMinus className={`w-[32px] h-[32px] p-[5px] `} />
                  </button>
                  <span className="text-[16px] w-[16px]">{guestCount}</span>
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                  >
                    <BsPlus
                      className="w-[32px] h-[32px] p-[5px]"
                      onClick={() => setguestCount((prev) => prev + 1)}
                    />
                  </button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.4 }}
                className="flex justify-between py-[24px] border-b-[1px]"
              >
                <div>
                  <h1 className="text-[18px] ">Bedrooms</h1>
                </div>
                <div className="flex justify-between gap-3 items-center">
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={() => setBedroomCount((prev) => prev - 1)}
                  >
                    <FiMinus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                  <span className="text-[16px] w-[16px]">{BedroomCount}</span>
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={() => setBedroomCount((prev) => prev + 1)}
                  >
                    <BsPlus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.5 }}
                className="flex justify-between py-[24px] border-b-[1px]"
              >
                <div>
                  <h1 className="text-[18px] ">Beds</h1>
                </div>
                <div className="flex justify-between gap-3 items-center">
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={() => setBedsCount((prev) => prev - 1)}
                  >
                    <FiMinus className="w-[32px] h-[32px] p-[5px] " />
                  </button>
                  <span className="text-[16px] w-[16px]">{BedsCount}</span>
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={() => setBedsCount((prev) => prev + 1)}
                  >
                    <BsPlus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.6 }}
                className="flex justify-between py-[24px] "
              >
                <div>
                  <h1 className="text-[18px] ">Bathrooms</h1>
                </div>
                <div className="flex justify-between gap-3 items-center">
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={() => setBathroomCount((prev) => prev - 1)}
                  >
                    <FiMinus className="w-[32px] h-[32px] p-[5px] " />
                  </button>
                  <span className="text-[16px] w-[16px]">{BathroomCount}</span>
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={() => setBathroomCount((prev) => prev + 1)}
                  >
                    <BsPlus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 35, delay: 0.7 }}
            >
              <div>
                <h2 className="text-[18px] font-semibold py-[18px]">
                  Does every bedroom have a lock?
                </h2>
                <div>
                  <div className="flex items-center mb-5">
                    <input
                      onClick={() => setShowExtraRow(false)}
                      id="default-radio-1"
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-5 h-5 text-black bg-gray-100 border-gray-300 focus:ring-black dark:focus:ring-black dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ml-3 text-[16px]  text-gray-900 dark:text-gray-300"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex">
                      <input
                        onClick={() => setShowExtraRow(true)}
                        id="default-radio-2"
                        type="radio"
                        value=""
                        name="default-radio"
                        className="w-5 h-5 text-black bg-gray-100 border-gray-300 focus:ring-black dark:focus:ring-black dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-3 text-[16px] text-gray-900 dark:text-gray-300"
                      >
                        No
                      </label>
                    </div>
                    {showExtraRow && (
                      <label className="ml-8 text-[14px] text-[#717171]">
                        Guests expect a lock for their room. We strongly recommend adding one.&nbsp;
                        <span className="text-black font-semibold underline">Learn more</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
