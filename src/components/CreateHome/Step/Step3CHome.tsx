import React, { useState } from 'react'
import ChooTypeHo from '../ChooTypeHo'
import { categoriesStep3 } from '../utils/constant'
import { motion } from 'framer-motion';
export default function Step3CHome() {

    const [selected, setselected] = useState('');
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className='w-full h-screen flex justify-center mt-7 
                        mobile:px-[24px]
        '>
            <div className='w-[630px]'>
                <motion.div className='mb-7'
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 35 }}
                >
                    <h1 className='text-[30px] font-semibold
                                    mobile:text-[20px]
                    '>
                        What type of place will guests have?</h1>
                </motion.div>
                <div className=''
                >
                    {categoriesStep3.map((categorie, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: "0.5" }}
                        >
                            <ChooTypeHo selected={selected}
                                setselected={setselected}
                                name={categorie.name}
                                icon={categorie.icon}
                                description={categorie.description} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
