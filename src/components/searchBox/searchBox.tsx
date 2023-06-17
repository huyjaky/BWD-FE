import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { placeListContext } from '@/contexts/placeList';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { whenLoaded } from 'bing-maps-loader';
import 'bingmaps'; // <--  Microsoft supported types library for Microsoft.Maps
import { useContext, useEffect, useRef } from 'react';

interface SearchBoxProps {
  styleBox: string | null;
}

const SearchBox = ({ styleBox }: SearchBoxProps) => {
  const { address, setAddress } = useContext(selectPlaceContext);
  const { isShowHeader, setIsShowHeader } = useContext(filterFormAnimateContext);
  const inputBox = useRef<HTMLInputElement>(null);

  // luu y la chi cho nhung doan code ve map vao useEffect con nhung doan code ve input nhap lieu thi
  // khong duoc cho vao useEffect
  whenLoaded.then(() => {
    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
      callback: onLoad
    });
  });

  function onLoad() {
    var options = { maxResults: 5, businessSuggestions: true };
    var manager = new Microsoft.Maps.AutosuggestManager(options);
    manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion);
  }

  function selectedSuggestion(suggestionResult: any) {
    setIsShowHeader(true);
    setAddress({
      ...address,
      address: { ...address.address, ...suggestionResult?.address, ...suggestionResult?.location }
    });
  }

  useEffect(() => {
    const temp = document.getElementById('searchBox');
    temp?.addEventListener('change', (event: any) => {
      setAddress({
        ...address,
        address: { ...address.address, formattedAddress: event.target.value }
      });
    });
  }, []);

  return (
    <>
      <div id="searchBoxContainer" className="">
        <input
          type="text"
          name="input-place"
          id="searchBox"
          ref={inputBox}
          placeholder="Search your locations"
          className={`outline-none focus:border-b-2 focus:border-slate-600 w-[calc(100%-40px)] ${styleBox} pointer-events-auto text-ellipsis `}
        />
      </div>
    </>
  );
};

export default SearchBox;
