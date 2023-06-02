import { useContext, useEffect } from 'react';
import { placeListContext } from '@/contexts/placeList';
import { selectPlaceContext } from '@/contexts/selectPlace';
import Head from 'next/head';
import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';

interface SearchBoxProps {
  styleBox: string | null;
}


const SearchBox = ({ styleBox }: SearchBoxProps) => {
  const { address, setAddress } = useContext(selectPlaceContext);
  const { setPlaceList, setIsLoading, isFetch, setIsFetch } = useContext(placeListContext);
  const { isShowHeader, setIsShowHeader } = useContext(filterFormAnimateContext)

  useEffect(() => {
    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
      callback: onLoad,
    });

    function onLoad() {
      var options = { maxResults: 5, businessSuggestions: true };
      var manager = new Microsoft.Maps.AutosuggestManager(options);
      manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion);
    }

    function selectedSuggestion(suggestionResult: any) {
      setIsShowHeader(true);
      console.log(suggestionResult);
      setAddress({ ...address, address: {...address.address,...suggestionResult?.address, ...suggestionResult?.location} });
    }
  }, [])
  useEffect(()=>{console.log('address', address);}, [address])

  return (
    <>
      <div id='searchBoxContainer' className=''>
        <input
          type='text'
          name='input-place'
          id='searchBox'
          placeholder='Search your locations'
          onChange={(event: any)=> setAddress({...address, address: {...address.address, formattedAddress: event.target.value}})}
          value={address.address.formattedAddress}
          className={`outline-none focus:border-b-2 focus:border-slate-600 w-[calc(100%-40px)] ${styleBox}
          pointer-events-auto text-ellipsis
          `}
        />
      </div>
    </>
  );
};

export default SearchBox;
