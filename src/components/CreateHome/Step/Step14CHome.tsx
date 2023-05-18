import React, { RefObject, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
export default function Step14CHome() {
    const videoRef: RefObject<HTMLVideoElement> = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                videoRef.current?.play();
            };
        }
    }, [videoRef]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="mt-[88px] w-[98vw]">
            <div className="w-[80%] ml-auto mr-auto">
                <div
                    className="px-[80px] flex  items-center w-[100%]
                    tablet:flex-col-reverse
                    mobile:flex-col-reverse
                "
                >
                    <div
                        className="w-[65%]
                        tablet:w-[100%]
                        mobile:w-[100%]
                    "
                    >
                        <h5 className="text-[18px] font-semibold mb-[16px]">Step 3</h5>
                        <h1 className="text-[48px] leading-[54px] font-semibold mb-[24px]">
                            Finish up and publish
                        </h1>
                        <p className="font-normal text-[18px] w-[100%]">
                            Finally, you’ll choose if you'd like to start with an experienced guest, then you'll set your nightly price. Answer a few quick questions and publish when you're ready.
                        </p>
                    </div>
                    <div
                        className="w-[55%] tablet:w-[100%]
                        mobile:w-[100%]"
                    >
                        <video className='w-fit h-fit' preload='auto' autoPlay={true} muted={true}>
                            <source src='./Step3.mp4' className='w-full h-full' />
                        </video>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
