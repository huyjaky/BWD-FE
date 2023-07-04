import { selectPopoverContext } from '@/contexts';
import { BillContext } from '@/contexts/bill';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { addDays } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { DateRange, DateRangePicker } from 'react-date-range';
interface CheckIn_OutProps {
  styleVerical: string | null;
  styleHorizontal: string | null;
}

const CheckIn_Out = ({ styleVerical, styleHorizontal }: CheckIn_OutProps) => {
  const { address, setAddress } = useContext(selectPlaceContext);
  const { Bill, setBill } = useContext(BillContext);

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
    setBill({ ...Bill, checkInDay: date_[0]?.startDate });
  }, [date_]);

  const handleOnChange = (item: any) => {
    setDate_([item.selection]);
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl pointer-events-auto" id="checkin_out-popup">
      <div className="p-8 w-full h-full flex items-center justify-center mobile:p-0 ">
        <div className={`w-full h-full ${styleHorizontal}`}>
          <DateRangePicker
            onChange={(item: any) => handleOnChange(item)}
            showPreview={true}
            moveRangeOnFirstSelection={false}
            minDate={new Date()}
            months={2}
            ranges={date_}
            direction="horizontal"
            className="w-full h-full font-semibold "
            rangeColors={['rgb(239 68 68)']}
          />
        </div>
        <div
          className={`w-full h-full  flex
        overflow-scroll overflow-x-hidden ${styleVerical}`}
        >
          <DateRange
            onChange={(item: any) => handleOnChange(item)}
            showPreview={true}
            moveRangeOnFirstSelection={false}
            minDate={new Date()}
            months={2}
            ranges={date_}
            direction="vertical"
            rangeColors={['rgb(239 68 68)']}
            className=" font-semibold m-auto mt-0 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckIn_Out;
