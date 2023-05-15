import React, { ChangeEvent, useState } from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'

export default function Step13CHome() {
    const [character, setCharacter] = useState("You'll have a great time at this comfortable place to stay.")

    const [warning, setWarning] = useState(false)


    let lengthChar = character.length;

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {

        if (character.length < 500) {
            setWarning(false)
        } else {
            setWarning(true)
        }
        setCharacter(event.target.value);
    };

    const characterCount = character.length;

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
                                Create your description
                            </h1>
                            <p className="text-[18px] text-[#717171]">
                                Share what makes your place special.
                            </p>
                        </div>
                        <div>
                            <textarea
                                value={character}
                                onChange={handleChange}
                                id="message"
                                rows={7}
                                className="block p-6 text-[20px] w-full h-[300px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>
                            <div className='mt-2'>
                                <span className='text-gray-400 '>{characterCount}/500</span>
                            </div>
                            {warning &&
                                <div>
                                    <span className='flex items-center text-red-500 text-[12px]'><RiErrorWarningFill /> The maximum number of characters allowed is 32.</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
