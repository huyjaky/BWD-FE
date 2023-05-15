import React, { useState } from 'react';
import ChooTypeHo from '../ChooTypeHo';
import { categoriesStep3 } from '../utils/constant';

export default function Step3CHome() {
  const [selected, setselected] = useState('');
  return (
    <div
      className="w-full h-screen flex justify-center mt-7 
                        mobile:px-[24px]
        "
    >
      <div className="w-[630px]">
        <div className="mb-7">
          <h1
            className="text-[30px] font-semibold
                                    mobile:text-[20px]
                    "
          >
            What type of place will guests have?
          </h1>
        </div>
        <div className="">
          {categoriesStep3.map((categorie, index) => (
            <ChooTypeHo
              key={index}
              selected={selected}
              setselected={setselected}
              name={categorie.name}
              icon={categorie.icon}
              description={categorie.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
