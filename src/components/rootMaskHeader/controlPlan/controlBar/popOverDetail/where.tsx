import { selectPopoverContext } from '@/contexts';
import { placeListContext } from '@/contexts/placeList';
import { selectPlaceContext } from '@/contexts/selectPlace';
import placeSearch from '@/hooks/placeSearch';
import { address } from '@/models/address';
import { addressSearch } from '@/models/addressSearch';
import { useContext, useEffect, useState } from 'react';

const Where = () => {
  const { placeList, setPlaceList, isLoading, setIsFetch } = useContext(placeListContext);
  const { address, setAddress } = useContext(selectPlaceContext);
  const { selected } = useContext(selectPopoverContext);
  const [address_, setAddress_] = useState<addressSearch>();

  useEffect(() => {
    console.log('fetching success', placeList);
  }, [placeList, isLoading]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!address?.address.formattedAddress) return;
      const located = await placeSearch().locationSearch_(address.address);

      if (located) {
        setAddress({ ...address, address: {...address.address, latitude: located.latitude, longitude: located.longitude }});
        console.log(address.address);
      }
    };
    fetchLocation();
  }, [address_]);

  useEffect(() => {}, [selected]);

  // address for use for filter and address_ use for local component
  const handleOnclick = (event: any, item:any) => {
    setAddress({...address, address: {...address.address, ...item.address} });
    setAddress_({...address, address: {...address.address, ...item.address} });
    setPlaceList([]);
    setIsFetch(false);
  };

  return (
    <div>
      {placeList?.length != 0 && address.address.formattedAddress && (
        <div
          className="h-fit w-fit bg-white rounded-2xl pointer-events-auto
      box-border p-5
    "
          id="where-popup"
        >
          <div className="h-full w-full flex-col flex">
            {
              placeList?.map((item: any, index: number) => {
                  const address: address = item.address;
                  return (
                    <button
                      key={index}
                      className="
                mb-3 relative w-full  text-left"
                      onClick={event => handleOnclick(event, item)}
                    >
                      {address.formattedAddress}
                    </button>
                  );
                })
              }
          </div>
        </div>
      )}
    </div>
  );
};

export default Where;
