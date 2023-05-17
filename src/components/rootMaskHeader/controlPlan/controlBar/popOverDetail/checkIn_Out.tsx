import { selectPopoverContext } from '@/contexts';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { addDays } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
const CheckIn_Out = () => {
  const { address, setAddress } = useContext(selectPlaceContext);

  const { selected } = useContext(selectPopoverContext);
  const [date_, setDate_] = useState([
    {
      startDate: address.checkInDay,
      endDate: addDays(address.checkOutDay, 0),
      key: 'selection'
    }
  ]);

  useEffect(() => {}, [selected]);

  useEffect(() => {
    setAddress({ ...address, checkInDay: date_[0]?.startDate, checkOutDay: date_[0]?.endDate });
  }, [date_]);

  const handleOnChange = (item: any) => {
    setDate_([item.selection]);
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl pointer-events-auto" id="checkin_out-popup">
      <div className="p-8 w-full h-full flex items-center justify-center ">
        <div className="w-full h-full tablet:hidden mobile:hidden">
          <DateRangePicker
            onChange={(item: any) => handleOnChange(item)}
            showPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={date_}
            direction="horizontal"
            rangeColors={['rgb(239 68 68)']}
            className="w-full h-full font-semibold "
          />
        </div>
        <div className="w-full h-full laptop:hidden desktop:hidden flex overflow-scroll overflow-x-hidden">
          <DateRangePicker
            onChange={(item: any) => handleOnChange(item)}
            showPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={date_}
            direction="vertical"
            rangeColors={['rgb(239 68 68)']}
            className=" font-semibold m-auto mt-0"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckIn_Out;
