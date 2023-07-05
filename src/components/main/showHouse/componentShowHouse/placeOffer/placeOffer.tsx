

import { filterContext } from '@/contexts/filter';
import { amenities } from '@/models/filter';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { arrAmenities } from '../../../filter/formFilter/filterFormComponent/amenities/arrAmenities';
import CheckBox from '../../../filter/formFilter/filterFormComponent/amenities/checkBox/checkBox';
import { selectHouseContext } from '@/contexts/selectHouse';
import { house_ } from '@/models/house';

interface TempHouseProps {
  typeAmenities: 'essentials' | 'features' | 'location' | 'safety';
  tempHouse: house_ | undefined;
  setTempHouse: Dispatch<SetStateAction<house_ | undefined>>
}

const PlaceOffer = ({ typeAmenities, tempHouse, setTempHouse }: TempHouseProps) => {
  const arrAmenities_: amenities = arrAmenities;
  const { filterForm, setFilterForm } = useContext(filterContext);
  const { selectHouse, setSelectHouse } = useContext(selectHouseContext)
  let arrPlaceOffer:string[];

  useEffect(() => { setTempHouse(selectHouse) }, [selectHouse])
  useEffect(()=>{
    const arrPlaceOfferConvert = () => {
      const emptyArr: string[] = [];
      if (!selectHouse) return emptyArr;
      for (let index = 0; index < selectHouse?.placeOffer.length; index++) {
        emptyArr.push(selectHouse.placeOffer[index].PlaceOffer);
      }
      return emptyArr;
    }
    arrPlaceOffer = arrPlaceOfferConvert();
  }, [selectHouse?.placeOffer])

  useEffect(() => { }, [filterForm.amenities[typeAmenities]]);

  const handleOnClick = (event: any, item: string) => {
    const arrTemp = selectHouse?.placeOffer;
    if (arrTemp.includes(item)) {
      const updateArrTemp: string[] = arrTemp.filter((item_: string) => {
        return item_ !== item;
      });
      setFilterForm({
        ...filterForm,
        amenities: { ...filterForm.amenities, [typeAmenities]: updateArrTemp }
      });
      return;
    }
    arrTemp.push(item);
    setFilterForm({
      ...filterForm,
      amenities: { ...filterForm.amenities, [typeAmenities]: arrTemp }
    });
  };

  return (
    <div className="w-full mb-14">
      <span className="w-full font-semibold">{typeAmenities.toLocaleUpperCase()}</span>

      <div className="w-full h-fit grid grid-cols-2 gap-y-5 mt-3">
        {arrAmenities_[typeAmenities].map((item: string, index: number) => {
          return (
            <div
              className="w-full cursor-pointer"
              key={index}
              onClick={(event) => handleOnClick(event, item)}
            >
              <div className="w-full flex h-full box-border overflow-hidden">
                <div className='my-auto'>
                  <CheckBox
                    isCheckedProps={filterForm.amenities[typeAmenities].includes(item) ? true : false}
                  />{' '}
                </div>
                <span
                  className="h-full flex items-center
                  ml-5 text-[19px]
                "
                >
                  {item}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PlaceOffer;

