import React, { useContext, useState, useEffect } from 'react';
import { newHouseContext } from '../../../contexts/createHome';
import { IoLocationSharp } from 'react-icons/io5';
import SearchBox from '@/components/searchBox/searchBox';
import MapEach from '@/components/main/showHouse/mapEach';
import { selectPlaceContext } from '@/contexts/selectPlace';
import Where from '@/components/rootMaskHeader/controlPlan/controlBar/popOverDetail/where';

interface MapProps{
  keyMapBox: string;
}

const Map: React.FC<MapProps> = ({keyMapBox}: MapProps) => {
  const { state, dispatch } = useContext(newHouseContext);
  const {address , setAddress} = useContext(selectPlaceContext)
  const [address_, setAddress_] = useState(state.address.addressLine);
  function addressValueHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    const addressValue = event.currentTarget.value;
    setAddress_((prev) => addressValue);
  }
  useEffect(() => {
    dispatch({ type: 'STEP4', payload: address.address});
  }, [address]);
  useEffect(()=>{
    // setAddress(state.address)
    console.log(state.address)
  }, [state]);
  return (
    <div className="w-[100%] h-fit overflow-hidden rounded-2xl relative px-3 py-2">
      {/* search box */}
      <div className='w-full h-fit relative'>
        <SearchBox styleBox={'w-full rounded-2xl h-[70px] px-2  shadow-xl'}/>
        <div className='w-full h-fit absolute z-20'>
          <Where />
        </div>
      </div>

      <div className='w-full h-[400px] mt-5'>
        <MapEach keyMapBox={keyMapBox} latitude={address.address.latitude}
        longitude={address.address.longitude} zoom={15}
        />

      </div>
    </div>
  );
};

export default Map;
