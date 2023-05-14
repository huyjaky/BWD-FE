import React, { useEffect, useRef, RefObject } from 'react';
export default function Step8CHome() {
  const videoRef: RefObject<HTMLVideoElement> = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play();
      };
    }
  }, [videoRef]);

  return (
    <div className="mt-[88px] w-[98vw]">
      <div className="w-[80%] ml-auto mr-auto">
        <div
          className="px-[80px] flex  items-center w-[100%]
                    tablet:flex-col-reverse
                    mobile:flex-col-reverse
                "
        >
          <div
            className="w-[70%]
                        tablet:w-[100%]
                        mobile:w-[100%]
                    "
          >
            <h5 className="text-[18px] font-semibold mb-[16px]">Step 2</h5>
            <h1 className="text-[48px] leading-[54px] font-semibold mb-[24px] w-[70%]">
              Make your place stand out
            </h1>
            <p className="font-normal text-[18px] w-[90%]">
              In this step, you’ll add some of the amenities your place offers, plus 5 or more
              photos. Then, you’ll create a title and description.
            </p>
          </div>
          <div
            className="w-[55%] tablet:w-[100%]
                        mobile:w-[100%]"
          >
            <video className='w-fit h-fit' preload='auto' autoPlay={true} muted={true}>
              <source src='./Step2.mp4' className='w-full h-full' />
            </video>

          </div>
        </div>
      </div>
    </div>
  );
}
