import React from 'react';
import Map from '../Map/Map';

function Step4CHome(): JSX.Element {
  return (
    <div className="flex justify-start md:justify-center w-full h-screen">
      <div className="">
        <div className="">
          <h1 className="font-sans text-2xl ml-2 md:ml-0 md:text-4xl font-semibold text-[#222222] mb-4">
            Where's your place located?
          </h1>
          <p className="font-sans text-sm ml-2 md:ml-0 md:text-lg text-[#717171]">
            Your address is only shared with guests after they’ve made a reservation.
          </p>
        </div>
        <Map />
      </div>
    </div>
  );
}

export default Step4CHome;
