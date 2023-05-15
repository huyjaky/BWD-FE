import React, { useState } from 'react';
import ChooDesPl from '../ChooDesPl';
import { categoriesStep8 } from '../utils/constant';

export default function Step8CHome() {
  const [selected, setselected] = useState('');

  const type = 'select1';
  return (
    <div>
      <div className="w-[98vw] px-[80px] mt-10">
        <div
          className="w-[60%] ml-auto mr-auto pl-[70px] 
                    mobile:pl-[0px] 

                "
        >
          <div className="flex flex-col ">
            <div className="mb-[32px] h-[72px] tablet:mb-[62px] mobile:mb-[92px] ">
              <h1 className="text-[32px] font-semibold w-[530px] leading-10 mb-3 ">
                Who else might be there?
              </h1>
              <p className="text-[18px] text-[#717171]">
                Guests need to know whether they’ll encounter other people during their stay.
              </p>
            </div>
            <div
              className="grid grid-cols-3 gap-[15px] w-[100%] mb-6
                                    laptop:grid-cols-2
                                    tablet:grid-cols-2
                                    mobile:grid-cols-1
                    "
            >
              {categoriesStep8.map((category) => (
                <ChooDesPl
                  title={category.name}
                  icon={category.icon}
                  type={type}
                  selected={selected}
                  setselected={setselected}
                />
              ))}
            </div>
            <div>
              <p className="text-[18px] text-[#717171]">
                We’ll show this information on your listing and in search results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
