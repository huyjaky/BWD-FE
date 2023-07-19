import { filterContext } from '@/contexts/filter';
import { amenities } from '@/models/filter';
import { useContext, useEffect } from 'react';
import { arrAmenities } from './arrAmenities';
import CheckBox from './checkBox/checkBox';


const Amenities = () => {
  const arrAmenities_: string[] = arrAmenities;
  const { filterForm, setFilterForm } = useContext(filterContext);

  useEffect(() => { }, [filterForm]);

  const handleOnClick = (event: any, item: string) => {
    const arrTemp: string[] = Array.isArray(filterForm.amenities) ? filterForm.amenities : [];

    if (arrTemp.includes(item)) {
      const updateArrTemp: string[] = arrTemp.filter((item_: string) => {
        return item_ !== item;
      });
      setFilterForm({
        ...filterForm,
        amenities: updateArrTemp
      });
      return;
    }
    arrTemp.push(item);
    setFilterForm({
      ...filterForm,
      amenities: arrTemp
    });
  };

  return (
    <div className="w-full mb-14">

      <div className="w-full h-fit grid grid-cols-2 gap-y-5 mt-3">
        {arrAmenities_.map((item: string, index: number) => {
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
                      Array.isArray(filterForm.amenities) ?
                        filterForm.amenities.includes(item) ? true : false
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
