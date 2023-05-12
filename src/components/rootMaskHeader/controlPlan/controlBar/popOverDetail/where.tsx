import { placeApi } from '@/api-client';
import { selectPopoverContext } from '@/contexts';
import { placeListContext } from '@/contexts/placeList';
import { selectPlaceContext } from '@/contexts/selectPlace';
import placeSearch from '@/hooks/placeSearch';
import { address } from '@/models/address';
import { useContext, useEffect, useState } from 'react';

const Where = () => {
  const { placeList, setPlaceList, isLoading, setIsFetch } = useContext(placeListContext);
  const { address, setAddress } = useContext(selectPlaceContext);
  const { selected } = useContext(selectPopoverContext);
  const [address_, setAddress_] = useState<address>();

  useEffect(() => {
    console.log('fetching success', placeList);
  }, [placeList, isLoading]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!address?.formattedAddress) return;
      const located = await placeSearch().locationSearch_(address);

      if (located) {
        setAddress({ ...address, latitude: located.latitude, longitude: located.longitude });
      }
    };
    fetchLocation();
  }, [address_]);

  useEffect(() => {}, [selected]);

  // address for use for filter and address_ use for local component
  const handleOnclick = (event: any) => {
    setAddress(JSON.parse(event.target.value));
    setAddress_(JSON.parse(event.target.value));
    setPlaceList([]);
    setIsFetch(false);
  };

  return (
    <div>
      {placeList?.length != 0 && address.formattedAddress && (
        <div
          className="h-fit w-fit bg-white rounded-2xl pointer-events-auto
      box-border p-5
    "
          id="where-popup"
        >
          <div className="h-full w-full flex-col flex">
            {isLoading == false
              ? placeList?.map((item: any, index: number) => {
                  const address: address = item.address;
                  return (
                    <button
                      key={index}
                      className="
                mb-3 relative w-full  text-left"
                      onClick={handleOnclick}
                      value={JSON.stringify(address)}
                    >
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
