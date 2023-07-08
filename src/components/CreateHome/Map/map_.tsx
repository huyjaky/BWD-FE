import React, { useContext, useState, useEffect } from 'react';
import { newHouseContext } from '../../../contexts/createHome';
import { IoLocationSharp } from 'react-icons/io5';
import SearchBox from '@/components/searchBox/searchBox';
import MapEach from '@/components/main/showHouse/mapEach';
import { selectPlaceContext } from '@/contexts/selectPlace';

interface MapProps {
  keyMapBing: string;
}

const Map: React.FC<MapProps> = ({ keyMapBing }: MapProps) => {
  const { state, dispatch } = useContext(newHouseContext);
  const { address, setAddress } = useContext(selectPlaceContext);
  const [address_, setAddress_] = useState(state.address.addressLine);
  function addressValueHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    const addressValue = event.currentTarget.value;
    setAddress_((prev) => addressValue);
  }
  useEffect(() => {
    dispatch({ type: 'STEP4', payload: address.address });
  }, [address]);
  useEffect(() => {
    // setAddress(state.address)
    console.log(state.address);
  }, [state]);
  return (
    <div className="w-[100%] h-fit overflow-hidden rounded-2xl relative px-3 py-2">
      {/* search box */}
      <div className="w-full h-fit relative">
        <SearchBox styleBox={'w-full rounded-2xl h-[70px] px-2 shadow-xl'} />
      </div>

      <div className="w-full h-[400px] mt-5">
        <MapEach
          keyMapBing={keyMapBing}
          latitude={address.address.latitude}
          longitude={address.address.longitude}
          zoom={address.address.formattedAddress ? 15 : 0}
          idMap='2'
          formattedAddress={address.address.formattedAddress}
          style='h-[500px]'
        />
      </div>
    </div>
  );
};

export default Map;
