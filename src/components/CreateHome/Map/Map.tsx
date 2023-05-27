import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';

const Map: React.FC = () => {
  const map =
    'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/105.804817,21.028509,11,5/700x700?access_token=pk.eyJ1IjoiamFqYWphamF1IiwiYSI6ImNsaDJyNzUydjAzazgzcnFtc3R5enE4eXgifQ.FmwGbD5cLVub495LlJUlbw';
  return (
    <div className="w-[100%] h-[279px] overflow-hidden rounded-2xl relative">
      {/* search input */}
      <div className="absolute w-full flex justify-center top-6">
        <div className="w-[85%] relative">
          <input
            className="w-full h-16 outline-none border-none rounded-[2.5rem] shadow-md focus:ring-0 indent-12 font-bold text-lg text-[#222]"
            type="text"
            placeholder="Enter your address"
          />
          <IoLocationSharp size={25} className="absolute left-5 top-5" color="#222222" />
        </div>
      </div>
      <img src={map} alt="Map" />;
    </div>
  );
};

export default Map;
