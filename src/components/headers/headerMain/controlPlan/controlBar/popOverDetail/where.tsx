import { placeListContext } from "@/contexts/placeList";
import { useContext, useEffect, useState } from "react";


const Where = () => {
  const [check, setCheck] = useState(false);
  const {placeList} = useContext(placeListContext);
  const [placeList_, setPlaceList_] = useState<any>();

  useEffect(() => {
    console.log('fetching success', placeList_);
    setPlaceList_([...placeList]);
  }, [placeList])

  return (
    <div className="h-fit w-[500px] bg-white rounded-2xl pointer-events-auto" id="where-popup">
      {placeList_?.map((item:any, index:number) => {
        return (
          <div key={index}>
            {item.address.formattedAddress}
          </div>
        )
      })}
    </div>
  )
}

export default Where ;