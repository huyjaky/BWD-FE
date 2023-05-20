import React, { useState } from 'react';
import ChooDesPl from '../ChooDesPl';
import { categoriesStep8 } from '../utils/constant';
import { motion } from 'framer-motion';

export default function Step8CHome() {
  const [selected, setselected] = useState('');

  const type = 'select1';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="w-[98vw] px-[80px] mt-10">
        <div
          className="w-[60%] ml-auto mr-auto pl-[70px]
                    mobile:pl-[0px]

                "
        >
          <div className="flex flex-col ">
            <div className="mb-[32px] h-[72px] tablet:mb-[62px] mobile:mb-[92px] ">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.1 }}
                className="text-[32px] font-semibold w-[530px] leading-10 mb-3 "
              >
                Who else might be there?
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                className="text-[18px] text-[#717171]"
              >
                Guests need to know whether they’ll encounter other people during their stay.
              </motion.p>
            </div>
            <div
              className="grid grid-cols-3 gap-[15px] w-[100%] mb-6
                                    laptop:grid-cols-2
                                    tablet:grid-cols-2
                                    mobile:grid-cols-1
                    "
            >
              {categoriesStep8.map((category) => (
                <ChooDesPl
                  title={category.name}
                  icon={category.icon}
                  type={type}
                  selected={selected}
                  setselected={setselected}
                  selectedMany={[]}
                  setselectedMany={() => {}}
                />
              ))}
            </div>
            <div>
              <motion.p
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.7 }}
                className="text-[18px] text-[#717171]"
              >
                We’ll show this information on your listing and in search results.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
