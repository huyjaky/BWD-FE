import React from 'react';
import { BsHouseDoorFill } from 'react-icons/bs';

function MapLocate(): JSX.Element {
  const map =
    'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/105.804817,21.028509,11,5/700x700?access_token=pk.eyJ1IjoiamFqYWphamF1IiwiYSI6ImNsaDJyNzUydjAzazgzcnFtc3R5enE4eXgifQ.FmwGbD5cLVub495LlJUlbw';

  return (
    <div className="w-[100%] h-[279px] overflow-hidden rounded-2xl relative">
      <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
        <div className="w-[120px] h-[120px] bg-[#db0c63] rounded-[50%] bg-opacity-30 flex items-center justify-center">
          <div className="w-[60px] h-[60px] rounded-[50%] bg-[#db0c63] flex items-center justify-center">
            <BsHouseDoorFill size={25} color="white" />
          </div>
        </div>
      </div>
      <img src={map} alt="Map" />
    </div>
  );
}

export default MapLocate;
