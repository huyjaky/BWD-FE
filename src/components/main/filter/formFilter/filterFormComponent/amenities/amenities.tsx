import { filterContext } from '@/contexts/filter';
import { amenities } from '@/models/filter';
import { useContext, useEffect } from 'react';
import { arrAmenities } from './arrAmenities';
import CheckBox from './checkBox/checkBox';

interface AmenitiesProps {
  typeAmenities: 'essentials' | 'features' | 'location' | 'safety';
}

const Amenities = ({ typeAmenities }: AmenitiesProps) => {
  const arrAmenities_: amenities = arrAmenities;
  const { filterForm, setFilterForm } = useContext(filterContext);

  useEffect(() => {
  }, [filterForm.amenities[typeAmenities]]);

  const handleOnClick = (event: any, item: string) => {
    const arrTemp = filterForm.amenities[typeAmenities];
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
              <div className="w-full flex h-full box-border">
                <CheckBox
                  isCheckedProps={filterForm.amenities[typeAmenities].includes(item) ? true : false}
                />{' '}
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
export default Amenities;
