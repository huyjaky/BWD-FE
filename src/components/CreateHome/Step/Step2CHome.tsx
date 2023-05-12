import React, { useState } from 'react';
import { categoriesStep2 } from '../utils/constant';
import ChooDesPl from '../ChooDesPl';
import { House } from '../../../../Icon_BnB_svg';
export default function Step2CHome() {
  // set Active thì để ngoài như này kh đc để trong lớp con
  // để trong lớp con thì khi render ra mỗi class sẽ có 1 state
  const [selected, setselected] = useState('');

  return (
    <div className="w-[98vw] px-[80px]">
      <div className="w-[60%] ml-auto mr-auto pl-[70px] ">
        <div className="flex flex-col px-10">
          <div className="mb-[32px] h-[72px] ">
            <h1 className="text-[32px] font-semibold w-[530px] leading-10 ">
              Which of these best describes &nbsp; &nbsp;your place?
            </h1>
          </div>
          <div
            className="grid grid-cols-3 gap-[15px] w-[100%]
                                    laptop:grid-cols-2
                                    tablet:grid-cols-2
                                    mobile:grid-cols-1
                    "
          >
            {/* {categoriesStep2.map((category) => (
              <ChooDesPl
                title={category.name}
                icon={category.icon}
                selected={selected}
                setselected={setselected}
              />

            ))} */}
            <House/>
          </div>
        </div>
      </div>
    </div>
  );
}
