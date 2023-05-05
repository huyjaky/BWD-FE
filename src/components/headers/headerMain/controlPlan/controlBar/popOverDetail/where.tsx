import { placeApi } from '@/api-client';
import { placeListContext } from '@/contexts/placeList';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { address } from '@/models/address';
import { useContext, useEffect, useState } from 'react';

const Where = () => {
  const { placeList, setPlaceList, isLoading, setIsFetch } = useContext(placeListContext);
  const { address, setAddress } = useContext(selectPlaceContext);
  const [address_, setAddress_] = useState<address>();

  useEffect(() => {
    console.log('fetching success', placeList);
  }, [placeList, isLoading]);


  useEffect(() => {
    const fetchLocation = async () => {
      if (!address?.formattedAddress) return;
      const located= await placeApi.searchLocation(address);
      if (located?.data?.statusCode == 200) {

        console.log(located);
        const latitude = located.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0];
        const longitude = located.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1];
        console.log(latitude, longitude);
        setAddress({...address, latitude: latitude, longitude: longitude});

      }
    };
    fetchLocation();
  }, [address_]);

  // address for use for filter and address_ use for local component
  const handleOnclick = (event: any) => {
    setAddress(JSON.parse(event.target.value));
    setAddress_(JSON.parse(event.target.value));
    setPlaceList([]);
    setIsFetch(false);
  };

  return (
    <div>
      {placeList?.length != 0 && (
        <div
          className="h-fit w-fit bg-white rounded-2xl pointer-events-auto
      box-border p-5
    "
          id="where-popup">
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
