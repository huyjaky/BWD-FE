import { ReactElement, useContext } from 'react';
import { imgArr } from '../imgArr';
import { filterContext } from '@/contexts/filter';
import { getHouseContext } from '@/contexts/getHouse';

const TabletMobile = () => {
  const { filterForm, setFilterForm } = useContext(filterContext);
  const { isFilter, setIsFilter } = useContext(getHouseContext);
  return (
    <div className="w-full h-[100px] mobile:h-fit  flex">
      <div
        className="m-auto grid tablet:grid-cols-4 mobile:grid-cols-2 mobile:grid-rows-2
      gap-7 gap-x-12
      "
      >
        {imgArr.map(
          (
            item: { title: string; path: (type: string) => ReactElement<any, any> },
            index: number
          ) => {
            return (
              <div
                onClick={(event) => {
                  if (item.title === 'House for rent') {
                    const temp = filterForm.typeHouse.filter(
                      (item: string) => item != 'HouseForSale'
                    );
                    temp.push('HouseForRent');
                    setFilterForm({ ...filterForm, typeHouse: temp });
                    setIsFilter('houseForRent');
                  } else if (item.title === 'House for sale') {
                    const temp = filterForm.typeHouse.filter(
                      (item: string) => item != 'HouseForRent'
                    );
                    temp.push('HouseForSale');
                    setFilterForm({ ...filterForm, typeHouse: temp });
                    setIsFilter('houseForSale');
                  } else if (item.title === 'Whislist') {
                    setIsFilter('favoriteHouse');
                  }
                }}
                key={index}
                className="w-full h-full flex flex-col "
              >
                <span className="m-auto">{item.path(' text-[55px] ')}</span>
                <div className="w-fit h-fit overflow-hidden m-auto">{item.title}</div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default TabletMobile;
