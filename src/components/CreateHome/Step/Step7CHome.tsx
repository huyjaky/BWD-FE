import React, { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { FiMinus } from 'react-icons/fi';
export default function Step7CHome() {
  const [privateCount, setprivateCount] = useState(0);

  const [DedicatedCount, setDedicatedCount] = useState(0);

  const [SharedCount, setSharedCount] = useState(0);

  return (
    <div className="w-[98vw] px-[80px]">
      <div className="w-[52%] ml-auto mr-auto pl-[60px] mt-[80px]">
        <div>
          <h1
            className="text-[32px] font-semibold leading-8 mb-6
                        mobile:text-[26px]
                        "
          >
            What kind of bathrooms are available to guests?
          </h1>
          <div>
            <div className="flex flex-col justify-between">
              <div className="flex justify-between py-[24px] border-b-[1px]">
                <div>
                  <h1 className="text-[18px] font-semibold">Private and attached</h1>
                  <p className="text-[#717171]">
                    It’s connected to the guest’s room and is just for them.
                  </p>
                </div>
                <div className="flex justify-between gap-3 items-center">
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={(e) => setprivateCount((prev) => prev - 0.5)}
                  >
                    <FiMinus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                  <span className="text-[16px] w-[16px]">{privateCount}</span>
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                  >
                    <BsPlus
                      className="w-[32px] h-[32px] p-[5px]"
                      onClick={(e) => setprivateCount((prev) => prev + 0.5)}
                    />
                  </button>
                </div>
              </div>
              <div className="flex justify-between py-[24px] border-b-[1px]">
                <div>
                  <h1 className="text-[18px] font-semibold ">Dedicated</h1>
                  <p className="text-[#717171]">
                    It’s private, but accessed via a shared space, like a hallway.
                  </p>
                </div>
                <div className="flex justify-between gap-3 items-center">
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={(e) => setDedicatedCount((prev) => prev - 0.5)}
                  >
                    <FiMinus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                  <span className="text-[16px] w-[16px]">{DedicatedCount}</span>
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={(e) => setDedicatedCount((prev) => prev + 0.5)}
                  >
                    <BsPlus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between py-[24px]">
                <div>
                  <h1 className="text-[18px] font-semibold ">Shared</h1>
                  <p className="text-[#717171]">It’s shared with other people.</p>
                </div>
                <div className="flex justify-between gap-3 items-center">
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={(e) => setSharedCount((prev) => prev - 0.5)}
                  >
                    <FiMinus className="w-[32px] h-[32px] p-[5px] " />
                  </button>
                  <span className="text-[16px] w-[16px]">{SharedCount}</span>
                  <button
                    className="border-[1px] rounded-[50%] border-[#b0b0b0] ease-in duration-300
                                                        hover:border-black"
                    onClick={(e) => setSharedCount((prev) => prev + 0.5)}
                  >
                    <BsPlus className="w-[32px] h-[32px] p-[5px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
