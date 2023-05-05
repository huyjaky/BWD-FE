import { placeListContext } from '@/contexts/placeList';
import { useContext, useEffect, useState } from 'react';

const Where = () => {
  const { placeList, isLoading } = useContext(placeListContext);
  const [placeList_, setPlaceList_] = useState<any>();

  useEffect(() => {
    console.log('fetching success', placeList_);
    setPlaceList_([...placeList]);
  }, [placeList, isLoading]);

  return (
    <div className="h-fit w-[500px] bg-white rounded-2xl pointer-events-auto
      box-border p-5
    " id="where-popup">
      <div className="h-full w-full ">
        {isLoading == false
          ? placeList_?.map((item: any, index: number) => {
              // comment cho vui
              return <div key={index} className='
                mb-3 relative
              '>{item.address.formattedAddress}</div>;
            })
          : 'Loading'}
      </div>
    </div>
  );
};

export default Where;
