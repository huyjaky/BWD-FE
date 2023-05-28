import React, { useContext } from 'react';
import Signature from '../../../../public/assets/signature.jpg';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { newHouseContext } from '../../../contexts/createHome';
import { useRouter } from 'next/router';

export default function StepCongratulation() {
    const { state } = useContext(newHouseContext);
    console.log(state)
    const router = useRouter();

    const handleClick = () => {
        router.push('/hosting');
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-[100%] h-screen bg-[#1B191B] text-white flex items-center justify-center "
        >
            <div className="bg-[#1B191B] flex items-center mobile:flex-col tablet:flex-col">
                <div className="w-[50%] mobile:mt-[200px]">
                    <video className="w-[100%] h-fit" loop={true} preload="auto" autoPlay={true} muted={true}>
                        <source src="./ShakeHands.mp4" className="w-full h-full" />
                    </video>
                </div>





                <div className='w-[50%]'>
                    <div className='w-[100%]'>
                        <div className='w-[50%] mobile:w-[100%] h-fit flex mobile:flex-col mobile:justify-center mobile:items-center'>
                            <h1 className='text-[48px] z-10 tablet:text-[36px] mobile:text-[36px] '>Congratulations, Minh!</h1>
                            <video className='z-0 w-[70%] mobile:w-[286px] tablet:w-[286px]  ' loop={true} preload='auto' autoPlay={true} muted={true}>
                                <source src='./Congratulation.mp4' className='w-fit h-full' />
                            </video>
                        </div>
                        <p className='text-[14px] z-10 relative tablet:text-[13px] mobile:text-[13px]  mt-[12px]'>From one Host to another—welcome aboard. Thank you for sharing your home and helping to create incredible experiences for our guests.</p>
                    </div>
                    <div className='w-[100%] flex flex-col items-center'>
                        <div>
                            <Image className='w-[455px] mobile:w-[100%] h-[150px] mt-3' src={Signature} alt='Signature' />
                        </div>
                        <div className='mt-[22px] mobile:mb-[22px]'>
                            <button
                                onClick={handleClick}
                                // style={{ transition: "2s" }}
                                className='transition ease-in-out delay-150 rounded-[10px] w-[200px] h-[48px] bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 '>
                                Let's get started
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </motion.div>
    )
}
