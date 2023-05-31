import React, { ChangeEvent, useState, useContext, useEffect } from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { newHouseContext } from '../../../contexts/createHome';

export default function Step13CHome() {
  const { state, dispatch } = useContext(newHouseContext);

  const [character, setCharacter] = useState(state.description);

  const [warning, setWarning] = useState(false);

  let lengthChar = character.length;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (character.length < 500) {
      setWarning(false);
    } else {
      setWarning(true);
    }
    setCharacter(event.target.value);
  };

  const characterCount = character.length;

  useEffect(() => {
    dispatch({ type: 'STEP13', payload: character });
  }, [character]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-[98vw] px-[80px]
                        mobile:px-0
        "
    >
      <div
        className="w-[65%] ml-auto mr-auto pl-[70px] mt-[30px]
            mobile:pl-0
            laptop:w-[90%]
            tablet:w-[90%]
            "
      >
        <div className="flex flex-col px-10 w-[100%]">
          <div className="mb-[32px]">
            <div className="mb-[32px] h-[82px] tablet:mb-[62px] mobile:mb-[152px] w-[100%] ml-auto mr-auto ">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                className="text-[32px] font-semibold w-[100%] leading-10 mb-3
                        "
              >
                Create your description
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                className="text-[18px] text-[#717171]"
              >
                Share what makes your place special.
              </motion.p>
            </div>
            <div>
              <motion.textarea
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                value={character}
                placeholder="You'll have a great time at this comfortable place to stay."
                onChange={handleChange}
                id="message"
                rows={7}
                className="block p-6 text-[20px] w-full h-[300px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></motion.textarea>
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                className="mt-2"
              >
                <span className="text-gray-400 ">{characterCount}/500</span>
              </motion.div>
              {warning && (
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                >
                  <span className="flex items-center text-red-500 text-[12px]">
                    <RiErrorWarningFill /> The maximum number of characters allowed is 32.
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
