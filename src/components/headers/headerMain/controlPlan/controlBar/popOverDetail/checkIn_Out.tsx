import { useContext, useEffect, useState } from 'react';
import { addDays, setDate } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { selectPopoverContext } from '@/contexts';
const CheckIn_Out = () => {
  const {address, setAddress} = useContext(selectPlaceContext);

  const {selected} = useContext(selectPopoverContext);
  const [date_, setDate_] = useState([
    {
      startDate: address.checkInDay,
      endDate: addDays(address.checkOutDay, 0),
      key: 'selection'
    }
  ]);

  useEffect(() => {}, [selected])

  useEffect(()=>{
    setAddress({...address, checkInDay: date_[0]?.startDate, checkOutDay: date_[0]?.endDate});
  },[date_])

  const handleOnChange = (item: any) => {
    setDate_([item.selection]);
  }

  return (
    <div className="w-full h-full bg-white rounded-2xl pointer-events-auto" id="checkin_out-popup">
      <div className="p-8 w-full h-full flex items-center justify-center ">
        <DateRangePicker
          onChange={(item:any) => handleOnChange(item)}
          showPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={date_}
          direction="horizontal"
          rangeColors={['rgb(239 68 68)']}
          className='w-full h-full font-semibold'
        />
      </div>
    </div>
  );
};

export default CheckIn_Out;
