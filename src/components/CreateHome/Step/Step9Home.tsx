import React, { useState } from 'react';
import {
  categoriesStep2,
  categoriesStep9,
  safetyitems,
  standoutamenities
} from '../utils/constant';
import ChooDesPl from '../ChooDesPl';

export default function Step9Home() {
  // set Active thì để ngoài như này kh đc để trong lớp con
  // để trong lớp con thì khi render ra mỗi class sẽ có 1 state
  const [selected, setselected] = useState('');

  return (
    <div
      className="w-[98vw] px-[80px] 
                        mobile:px-0
        "
    >
      <div
        className="w-[60%] ml-auto mr-auto pl-[70px]
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
                Tell guests what your place has to offer
              </h1>
              <p className="text-[18px] text-[#717171]">
                You can add more amenities after you publish your listing.
              </p>
            </div>
            <div
              className="grid grid-cols-3 gap-[15px] w-[110%]
                                    laptop:grid-cols-2
                                    tablet:grid-cols-2
                                    mobile:grid-cols-1
                    "
            >
              {categoriesStep9.map((category) => (
                <ChooDesPl
                  title={category.name}
                  icon={category.icon}
                  selected={selected}
                  setselected={setselected}
                />
              ))}
            </div>
          </div>
          <div className="mb-[22px]">
            <div className="h-[24px] mb-[22px] tablet:mb-[62px] mobile:mb-[92px] w-[100%]  ml-auto mr-auto ">
              <p className="text-[18px] text-black font-semibold">
                Do you have any standout amenities?
              </p>
            </div>
            <div
              className="grid grid-cols-3 gap-[15px] w-[110%]
                                    laptop:grid-cols-2
                                    tablet:grid-cols-2
                                    mobile:grid-cols-1
                    "
            >
              {standoutamenities.map((category) => (
                <ChooDesPl
                  title={category.name}
                  icon={category.icon}
                  selected={selected}
                  setselected={setselected}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="h-[24px] mb-[22px] tablet:mb-[62px] mobile:mb-[92px] w-[100%]  ml-auto mr-auto ">
              <p className="text-[18px] text-black font-semibold">
                Do you have any standout amenities?
              </p>
            </div>
            <div
              className="grid grid-cols-3 gap-[15px] w-[110%]
                                    laptop:grid-cols-2
                                    tablet:grid-cols-2
                                    mobile:grid-cols-1
                    "
            >
              {safetyitems.map((category) => (
                <ChooDesPl
                  title={category.name}
                  icon={category.icon}
                  selected={selected}
                  setselected={setselected}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
