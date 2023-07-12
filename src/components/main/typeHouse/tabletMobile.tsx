import { ReactElement, useContext } from 'react';
import { imgArr } from '../imgArr';
import { filterContext } from '@/contexts/filter';
import { getHouseContext } from '@/contexts/getHouse';
import { useSession } from 'next-auth/react';
import { selectPopoverContext } from '@/contexts';

const TabletMobile = () => {
  const { filterForm, setFilterForm } = useContext(filterContext);
  const { isFilter, setIsFilter } = useContext(getHouseContext);
  const { data: session, status } = useSession()
  const { setIsLoginClick } = useContext(selectPopoverContext);
  return (
    <div className="w-full h-[6.25rem] mobile:h-fit  flex bg-white box-border pt-3">
      <div
        className="m-auto grid tablet:grid-cols-3 mobile:grid-cols-3 mobile:mb-5
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
                    if (status === 'authenticated') {
                      setIsFilter('favoriteHouse')
                    } else if (status === 'unauthenticated') {
                                  setIsLoginClick(true);
                    };

                  }
                }}
                key={index}
                className="w-full h-full flex flex-col "
              >
                <span className="m-auto">{item.path(' text-[55px] ')}</span>
                <div className="w-fit h-fit overflow-hidden m-auto whitespace-nowrap">{item.title}</div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default TabletMobile;
