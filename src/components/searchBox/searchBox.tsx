import { placeApi } from "@/api-client";
import { placeListContext } from "@/contexts/placeList";
import { selectPlaceContext } from "@/contexts/selectPlace";
import { useContext, useEffect, useState } from "react";

interface SearchBoxProps {
  onSelectAddress: (address: string, latitude: number | null, longitude: number | null) => void;
  defaultValue: string;
}

const SearchBox = ({ onSelectAddress, defaultValue }: SearchBoxProps) => {
  const {address, setAddress} = useContext(selectPlaceContext);
  const {placeList, setPlaceList, isLoading, setIsLoading, isFetch, setIsFetch} = useContext(placeListContext);


  useEffect(() => {
    const fetchLocation =async () => {

      // return while address null while select one in spaceList suggest
      if (!address.formattedAddress || !isFetch) return;

      // loading is running while fetching api
      setIsLoading(true);
      const placeList_ = await placeApi.searchPlace({address: address.formattedAddress});
      if (placeList_?.data?.statusCode == 200) {
        setIsLoading(false);
        setPlaceList(placeList_.data.resourceSets[0].resources[0].value);
        return;
      }
      console.log('Something went wrong searchBox');
    }

    // auto getAPI after .3s user typed
    const debounceFetch = setTimeout(()=> {
      fetchLocation();
    }, 500)
    return () => {
      clearTimeout(debounceFetch);
    }
  }, [address.formattedAddress])

  return (
    <div>
      <input type="text" name="input-place" id="" placeholder={'Search your locations'}
      className="outline-none focus:border-b-2 focus:border-slate-600 w-[calc(100%-40px)]"
      onChange={event => {setAddress({...address, formattedAddress: event.target.value}); setIsFetch(true)}}
      value={address.formattedAddress}
      />
    </div>
  );
};

export default SearchBox;
