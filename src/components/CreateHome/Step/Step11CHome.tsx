import React from 'react'
import { motion } from 'framer-motion'
export default function Step11CHome() {
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
                                transition={{ type: "spring", stiffness: 35, delay: 0.1 }}
                                className="text-[32px] font-semibold w-[100%] leading-10 mb-3 
                        "
                            >
                                Add some photos of your cabin
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 35, delay: 0.1 }}
                                className="text-[18px] text-[#717171]">
                                You'll need 5 photos to get started. You can add more or make changes later.
                            </motion.p>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    )
}
