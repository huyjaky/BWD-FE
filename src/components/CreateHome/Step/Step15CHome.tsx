import React, { ChangeEvent, useState } from 'react';

export default function Step15CHome() {
  const [selectedOption, setSelectedOption] = useState<string>();

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption((prevState) => event.target.value);
  };
  return (
    <div
      className="w-[98vw] px-[80px] 
                        mobile:px-0
                        mobile:pb-20
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
            <div className="mb-[62px] h-[82px] tablet:mb-[62px] laptop:mb-[22px] mobile:mb-[152px] w-[100%] ml-auto mr-auto ">
              <h1
                className="text-[32px] font-semibold w-[100%] leading-10 mb-3 
                        "
              >
                Choose who to welcome for your first reservation
              </h1>
              <p className="text-[18px] text-[#717171] ">
                After your first guest, anyone can book your place.{' '}
                <span className="underline">Learn more</span>
              </p>
            </div>
            <div className="">
              <div
                className={`flex flex-col my-[16px] p-[24px] border 
                            ${
                              selectedOption === 'AnyAirbnbguest'
                                ? 'bg-[#F7F7F7] border-[2px] hover:border-black border-black'
                                : 'border-gray-200 border-[2px] hover:border-black'
                            } 
                             rounded-[14px] hover:border-black cursor-pointer
                            `}
              >
                <div className="flex items-center justify-center cursor-pointer">
                  <div>
                    <input
                      value="AnyAirbnbguest"
                      onChange={handleRadioChange}
                      id="bordered-radio-1"
                      type="radio"
                      name="bordered-radio"
                      checked={selectedOption === 'AnyAirbnbguest'}
                      className="w-4 h-4 
                                        text-blue-600 
                                        bg-gray-100 
                                        border-gray-300 
                                        focus:ring-black 
                                        dark:focus:ring-blue-600
                                        dark:ring-offset-gray-800 
                                        focus:ring-2
                                        dark:bg-gray-700
                                        dark:border-gray-600 
                                        cursor-pointer
                                       "
                    />
                  </div>
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full cursor-pointer ml-2 text-[18px] font-semibold text-black "
                  >
                    Any Airbnb guest
                  </label>
                </div>
                <div className="flex justify-start">
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full ml-6 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Get reservations faster when you welcome anyone from the Airbnb community.
                  </label>
                </div>
              </div>
              <div
                className={`flex flex-col p-[24px] rounded-[14px] cursor-pointer  ${
                  selectedOption === 'AnExperiancedguest'
                    ? 'bg-[#F7F7F7] border-[2px] hover:border-black border-black'
                    : 'border-gray-200 border-[2px] hover:border-black'
                }`}
              >
                <div className="flex justify-center items-center cursor-pointer">
                  <div className="cursor-pointer">
                    <input
                      value="AnExperiancedguest"
                      onChange={handleRadioChange}
                      checked={selectedOption === 'AnExperiancedguest'}
                      id="bordered-radio-2"
                      type="radio"
                      name="bordered-radio"
                      className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <label
                    htmlFor="bordered-radio-2"
                    className="w-full ml-2 text-[18px] font-semibold text-gray-900 cursor-pointer"
                  >
                    An experienced guest
                  </label>
                </div>
                <div className="ml-6 flex justify-start cursor-pointer">
                  <label
                    htmlFor="bordered-radio-2"
                    className="w-full text-sm cursor-pointer font-medium text-gray-900 dark:text-gray-300"
                  >
                    For your first guest, welcome someone with a good track record on Airbnb who can
                    offer tips for how to be a great Host.
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
