import React, { useState, useContext, useEffect } from 'react';
import { BsPlus } from 'react-icons/bs';
import { FiMinus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { newHouseContext } from '../../../contexts/createHome';

export default function Step7CHome() {
  const { state, dispatch } = useContext(newHouseContext);

  const [privateCount, setprivateCount] = useState(state.kindOfBathrooms.private);

  const [DedicatedCount, setDedicatedCount] = useState(state.kindOfBathrooms.dedicated);

  const [SharedCount, setSharedCount] = useState(state.kindOfBathrooms.shared);

  useEffect(() => {
    dispatch({
      type: 'STEP7',
      payload: {
        private: privateCount,
        dedicated: DedicatedCount,
        shared: SharedCount
      }
    });
  }, [privateCount, DedicatedCount, SharedCount]);

  const handleprivateCount = () => {
    if (privateCount <= 0) {
      return;
    } else {
      setprivateCount((prev) => prev - 0.5);
    }
  };

  const handleDedicatedCount = () => {
    if (DedicatedCount <= 0) {
      return;
    } else {
      setDedicatedCount((prev) => prev - 0.5);
    }
  };

  const handleSharedCount = () => {
    if (SharedCount <= 0) {
      return;
    } else {
      setSharedCount((prev) => prev - 0.5);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-[98vw] px-[80px]"
    >
      <div
        className="w-[52%] mobile:w-[100%] ml-auto mr-auto pl-[60px] mobile:pl-0 mt-[80px]
                      tablet:w-[80%] laptop:w-[80%]
      "
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 35, delay: 0.1 }}
            className="text-[32px] font-semibold leading-9 mb-5
                        mobile:text-[26px]
                        "
          >
            What kind of bathrooms are available to guests?
          </motion.h1>
          <div>
            <div className="flex flex-col justify-between">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                className="flex justify-between py-[24px] border-b-[1px]"
              >
                <div>
                  <h1 className="text-[18px] font-semibold">Private and attached</h1>
                  <p className="text-[#717171]">
                    It’s connected to the guest’s room and is just for them.
                  </p>
                </div>
                <div className="flex justify-between gap-3 items-center">
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={handleprivateCount}
                  >
                    <FiMinus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                  <span className="text-[16px] w-[16px]">{privateCount}</span>
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                  >
                    <BsPlus
                      className="w-[32px] h-[32px] p-[5px]"
                      onClick={() => setprivateCount((prev) => prev + 0.5)}
                    />
                  </button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.3 }}
                className="flex justify-between py-[24px] border-b-[1px]"
              >
                <div>
                  <h1 className="text-[18px] font-semibold ">Dedicated</h1>
                  <p className="text-[#717171]">
                    It’s private, but accessed via a shared space, like a hallway.
                  </p>
                </div>
                <div className="flex justify-between gap-3 items-center">
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={handleDedicatedCount}
                  >
                    <FiMinus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                  <span className="text-[16px] w-[16px]">{DedicatedCount}</span>
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={() => setDedicatedCount((prev) => prev + 0.5)}
                  >
                    <BsPlus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.4 }}
                className="flex justify-between py-[24px]"
              >
                <div>
                  <h1 className="text-[18px] font-semibold ">Shared</h1>
                  <p className="text-[#717171]">It’s shared with other people.</p>
                </div>
                <div className="flex justify-between gap-3 items-center">
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={handleSharedCount}
                  >
                    <FiMinus className="w-[32px] h-[32px] p-[5px] " />
                  </button>
                  <span className="text-[16px] w-[16px]">{SharedCount}</span>
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={() => setSharedCount((prev) => prev + 0.5)}
                  >
                    <BsPlus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
