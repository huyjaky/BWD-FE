import React, { useState } from 'react';
import ChooTypeHo from '../ChooTypeHo';
import { categoriesStep3 } from '../utils/constant';
import { motion } from 'framer-motion';

export default function Step3CHome() {
  const [selected, setselected] = useState('');
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full h-[100vh -56px] flex justify-center mt-7
                        mobile:px-[24px]
        "
    >
      <div className="w-[630px]">
        <div className="mb-7">
          <h1
            className="text-[30px] font-semibold
                                    mobile:text-[20px]
                    "
          >
            What type of place will guests have?
          </h1>
        </div>
        <div className="">
          {categoriesStep3.map((categorie, index) => (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 35, delay: 0.3 * index }}
            >
              <ChooTypeHo
                key={index}
                selected={selected}
                setselected={setselected}
                name={categorie.name}
                icon={categorie.icon}
                description={categorie.description}
                type=""
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
