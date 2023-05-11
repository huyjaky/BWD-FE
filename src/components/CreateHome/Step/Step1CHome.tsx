import React, { RefObject, useEffect, useRef } from 'react'
import Step1Video from "../Video/Step1.mp4"

export default function Step1CHome() {



    const videoRef: RefObject<HTMLVideoElement> = useRef(null);


    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                videoRef.current?.play();
            };
        }
    }, [videoRef]);

    return (
        <div className='mt-[88px] w-[98vw]'>
            <div className='w-[80%] ml-auto mr-auto'>
                <div className='px-[80px] flex  items-center w-[100%] 
                    tablet:flex-col-reverse
                    mobile:flex-col-reverse
                '>
                    <div className='w-[50%]
                        tablet:w-[100%]
                        mobile:w-[100%]
                    '>
                        <h5 className='text-[18px] font-semibold mb-[16px]'>Step 1</h5>
                        <h1 className='text-[48px] leading-[54px] font-semibold mb-[24px]'>Tell us about your place</h1>
                        <p className='font-normal text-[18px]'>In this step, we'll ask you which type of property you have
                            and if guests will book the entire place or just a room.
                            Then let us know the location and how many guests can stay.
                        </p>
                    </div>
                    <div className='w-[50%] tablet:w-[100%]
                        mobile:w-[100%]'>
                        <video ref={videoRef} crossOrigin='anonymous' width="100%" height="421" autoPlay="" className='object-cover' preload='auto' webkit-playsinline="true"
                            playsinline="true" muted>
                            <source src={Step1Video} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </div >
    )
}
