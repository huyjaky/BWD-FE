import { house_ } from "@/models/house";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { arrEditAmeneties } from "./arrEditAmenities";
import CheckBox from "@/components/main/filter/formFilter/filterFormComponent/amenities/checkBox/checkBox";

interface EditAmenitiesProps {
  tempHouse: house_ | undefined;
  setTempHouse: Dispatch<SetStateAction<house_ | undefined>>;
}


const EditAmenities = ({ tempHouse, setTempHouse }: EditAmenitiesProps) => {
  // const arrAmenities_: string[] = arrAmenities;
  const [arrAmenities_, setArrAmenities] = useState<{ PlaceOffer: string; PlaceOfferId: string }[]>(arrEditAmeneties);

  useEffect(() => {
    console.log(tempHouse?.placeOffer);
  }, [tempHouse])

  const isCheck = (item_: { PlaceOffer: string; PlaceOfferId: string }, arr: { PlaceOffer: string; PlaceOfferId: string }[]):boolean =>{
    let result: boolean = false
    for (let index = 0; index < arr.length; index++) {
      result = arr.some(item => item.PlaceOffer === item_.PlaceOffer);
      if (result == true) return true
    }
    return result;
  }

  const handleOnClick = (event: any, item: { PlaceOffer: string; PlaceOfferId: string }) => {
    if (!tempHouse) return;
    const arrTemp: { PlaceOffer: string; PlaceOfferId: string }[] = Array.isArray(tempHouse?.placeOffer) ? tempHouse?.placeOffer : [];

    if (tempHouse.placeOffer.some(item_ => item_.PlaceOffer === item.PlaceOffer)) {
      console.log('exist');
      const updateArrTemp: { PlaceOffer: string; PlaceOfferId: string }[] = arrTemp.filter((item_: { PlaceOffer: string; PlaceOfferId: string }) => {
        return item_.PlaceOffer !== item.PlaceOffer;
      });

      setTempHouse({
        ...tempHouse,
        placeOffer: updateArrTemp
      });
      return;
    }

    arrTemp.push(item);
    setTempHouse({
      ...tempHouse,
      placeOffer: arrTemp
    });
  };


  return (
    <div className="w-full mb-14">

      <div className="w-full h-fit grid grid-cols-2 gap-y-5 mt-3">
        {arrAmenities_.map((item: { PlaceOffer: string; PlaceOfferId: string }, index: number) => {

          return (
            <div
              className="w-full cursor-pointer"
              key={index}
              onClick={(event) => handleOnClick(event, item)}
            >
              <div className="w-full flex h-full box-border overflow-hidden">
                <div className='my-auto'>
                  <CheckBox
                    // filterForm.amenities.includes(item) ? true : false

                    isCheckedProps={
                      tempHouse?.placeOffer ?
                      // isCheck(item, tempHouse?.placeOffer)
                      tempHouse.placeOffer.some(item_ => item_.PlaceOffer === item.PlaceOffer)
                      :
                      false
                    }
                  />{' '}
                </div>
                <span
                  className="h-full flex items-center
                  ml-5 text-[19px]
                "
                >
                  {item.PlaceOffer}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EditAmenities;