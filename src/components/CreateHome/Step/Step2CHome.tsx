import React, { useState } from 'react';
import { categoriesStep2 } from '../utils/constant';
import ChooDesPl from '../ChooDesPl';
import { motion } from 'framer-motion';
export default function Step2CHome() {
  // set Active thì để ngoài như này kh đc để trong lớp con
  // để trong lớp con thì khi render ra mỗi class sẽ có 1 state
  const [selected, setselected] = useState('');

  const type = 'select1';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-[98vw] px-[80px] h-[800px]"
    >
      <div className="w-[60%] ml-auto mr-auto pl-[70px] ">
        <div className="flex flex-col px-10">
          <motion.div
            className="mb-[32px] h-[72px] "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 35 }}
          >
            <h1 className="text-[32px] font-semibold w-[530px] leading-10 ">
              Which of these best describes &nbsp; &nbsp;your place?
            </h1>
          </motion.div>
          <div
            className="grid grid-cols-3 gap-[15px] w-[100%]
                                    laptop:grid-cols-2
                                    tablet:grid-cols-2
                                    mobile:grid-cols-1
                    "
          >
            {categoriesStep2.map((category, index) => (
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.1 * index }}
              >
                <ChooDesPl
                  title={category.name}
                  icon={category.icon}
                  selected={selected}
                  setselected={setselected}
                  type={type}
                  selectedMany={[]}
                  setselectedMany={() => {}}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
