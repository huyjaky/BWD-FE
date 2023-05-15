import React, { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { FiMinus } from 'react-icons/fi';
export default function Step6CHome() {
  // const [buttonBorder, setButtonBorder] = useState("");
  // const [colorIcon, setColorIcon] = useState("black");

  const [guestCount, setguestCount] = useState(1);

  const handelguestCount = () => {
    if (guestCount > 1) {
      setguestCount((prev) => prev - 1);
      // setButtonBorder("border-black");
      // setColorIcon("black")
    } else {
      // setButtonBorder("")
      // setColorIcon("#b0b0b0")
    }
  };

  const [BedroomCount, setBedroomCount] = useState(1);

  const [BedsCount, setBedsCount] = useState(1);

  const [showExtraRow, setShowExtraRow] = useState(true);

  return (
    <div className="w-[98vw] px-[80px]">
      <div className="w-[60%] ml-auto mr-auto pl-[70px] ">
        <div>
          <div>
            <h1
              className="text-[32px] font-semibold
                        mobile:text-[26px]
                        "
            >
              Let's start with the basics
            </h1>
            <h2 className="text-[18px] font-semibold py-[18px]">How many people can stay here</h2>
            <div className="flex flex-col justify-between">
              <div className="flex justify-between py-[24px] border-b-[1px]">
                <div>
                  <h1 className="text-[18px] ">Guests</h1>
                </div>
                <div className="flex justify-between gap-3 items-center">
                  <button
                    className={`border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300 hover:border-black `}
                    style={{}}
                    onClick={handelguestCount}
                  >
                    <FiMinus className={`w-[32px] h-[32px] p-[5px] `} />
                  </button>
                  <span className="text-[16px] w-[16px]">{guestCount}</span>
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                  >
                    <BsPlus
                      className="w-[32px] h-[32px] p-[5px]"
                      onClick={() => setguestCount((prev) => prev + 1)}
                    />
                  </button>
                </div>
              </div>
              <div className="flex justify-between py-[24px] border-b-[1px]">
                <div>
                  <h1 className="text-[18px] ">Bedrooms</h1>
                </div>
                <div className="flex justify-between gap-3 items-center">
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={(e) => setBedroomCount((prev) => prev - 1)}
                  >
                    <FiMinus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                  <span className="text-[16px] w-[16px]">{BedroomCount}</span>
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={(e) => setBedroomCount((prev) => prev + 1)}
                  >
                    <BsPlus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between py-[24px]">
                <div>
                  <h1 className="text-[18px] ">Beds</h1>
                </div>
                <div className="flex justify-between gap-3 items-center">
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={(e) => setBedsCount((prev) => prev - 1)}
                  >
                    <FiMinus className="w-[32px] h-[32px] p-[5px] " />
                  </button>
                  <span className="text-[16px] w-[16px]">{BedsCount}</span>
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={(e) => setBedsCount((prev) => prev + 1)}
                  >
                    <BsPlus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h2 className="text-[18px] font-semibold py-[18px]">
                  Does every bedroom have a lock?
                </h2>
                <div>
                  <div className="flex items-center mb-5">
                    <input
                      onClick={() => setShowExtraRow(false)}
                      id="default-radio-1"
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-5 h-5 text-black bg-gray-100 border-gray-300 focus:ring-black dark:focus:ring-black dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ml-3 text-[16px]  text-gray-900 dark:text-gray-300"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex">
                      <input
                        onClick={() => setShowExtraRow(true)}
                        id="default-radio-2"
                        type="radio"
                        value=""
                        name="default-radio"
                        className="w-5 h-5 text-black bg-gray-100 border-gray-300 focus:ring-black dark:focus:ring-black dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-3 text-[16px] text-gray-900 dark:text-gray-300"
                      >
                        No
                      </label>
                    </div>
                    {showExtraRow && (
                      <label className="ml-8 text-[14px] text-[#717171]">
                        Guests expect a lock for their room. We strongly recommend adding one.&nbsp;
                        <span className="text-black font-semibold underline">Learn more</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
