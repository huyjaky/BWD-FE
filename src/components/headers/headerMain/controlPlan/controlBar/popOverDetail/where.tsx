import { placeApi } from '@/api-client';
import { placeListContext } from '@/contexts/placeList';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { address } from '@/models/address';
import { useContext, useEffect, useState } from 'react';

const Where = () => {
  const { placeList, isLoading } = useContext(placeListContext);
  const { address, setAddress } = useContext(selectPlaceContext);
  const [placeList_, setPlaceList_] = useState<any>();
  const [address_, setAddress_] = useState<address>();

  useEffect(() => {
    console.log('fetching success', placeList_);
    setPlaceList_([...placeList]);
  }, [placeList, isLoading]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!address_?.formattedAddress) return;
      console.log(address_);
    };
    fetchLocation();
  }, [address_]);

  const handleOnclick = (event: any) => {
    setAddress(JSON.parse(event.target.value));
    setPlaceList_([]);
    setAddress_(JSON.parse(event.target.value));
  };

  return (
    <div>
      {placeList_?.length != 0 && (
        <div
          className="h-fit w-fit bg-white rounded-2xl pointer-events-auto
      box-border p-5
    "
          id="where-popup">
          <div className="h-full w-full flex-col flex">
            {isLoading == false
              ? placeList_?.map((item: any, index: number) => {
                  // comment cho vui
                  const address: address = item.address;
                  return (
                    <button
                      key={index}
                      className="
                mb-3 relative w-full  text-left"
                      onClick={handleOnclick}
                      value={JSON.stringify(address)}>
                      {address.formattedAddress}
                    </button>
                  );
                })
              : 'Loading'}
          </div>
        </div>
      )}
    </div>
  );
};

export default Where;
