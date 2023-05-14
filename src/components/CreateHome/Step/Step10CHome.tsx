import React from 'react'

export default function Step10CHome() {
    return (
        <div
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
                            <h1
                                className="text-[32px] font-semibold w-[100%] leading-10 mb-3 
                        "
                            >
                                Add some photos of your cabin
                            </h1>
                            <p className="text-[18px] text-[#717171]">
                                You'll need 5 photos to get started. You can add more or make changes later.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
