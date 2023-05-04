import { placeApi } from "@/api-client";
import { placeListContext } from "@/contexts/placeList";
import { useContext, useEffect, useState } from "react";

interface SearchBoxProps {
  onSelectAddress: (address: string, latitude: number | null, longitude: number | null) => void;
  defaultValue: string;
}

const SearchBox = ({ onSelectAddress, defaultValue }: SearchBoxProps) => {
  const [typingLocation, setTypingLocation] = useState('');
  const {placeList, setPlaceList} = useContext(placeListContext);

  useEffect(() => {
    const fetchLocation =async () => {
      if (!typingLocation) return;
      const placeList_ = await placeApi.searchPlace({address: typingLocation});
      setPlaceList(placeList_.data.resourceSets[0].resources[0].value);
      console.log(placeList_);
    }
    const debounceFetch = setTimeout(()=> {
      fetchLocation();
    }, 500)
    return () => {
      clearTimeout(debounceFetch);
    }
  }, [typingLocation])


  return (
    <div>
      <input type="text" name="input-place" id="" placeholder={'Search your locations'}
      className="outline-none focus:border-b-2 focus:border-slate-600"
      onChange={event => setTypingLocation(event.target.value)}
      value={typingLocation}
      />
    </div>
  );
};

export default SearchBox;
