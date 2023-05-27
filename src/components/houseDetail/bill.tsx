import { BillContext } from '@/contexts/bill';
import { house_ } from '@/models/house';
import moment from 'moment';
import { useContext, useEffect } from 'react';
import { Calendar } from 'react-date-range';
import Who from '../rootMaskHeader/controlPlan/controlBar/popOverDetail/who';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { motion } from 'framer-motion';

interface BillProps {
  houseDetail: house_;
}

const Bill = ({ houseDetail }: BillProps) => {
  const { Bill, setBill } = useContext(BillContext);
  const { address } = useContext(selectPlaceContext);

  const handleOnChange = (item: any) => {
    setBill({ ...Bill, checkInDay: item });
  };

  useEffect(() => {}, [Bill.checkInDay]);
  useEffect(() => {
    setBill({ ...Bill, guest: { ...Bill.guest, ...address.guest } });
  }, [address]);


  return (
    <div
      className="w-full h-fit bg-white rounded-2xl
                    shadow-2xl sticky top-4 mb-[280px] transition-all"
    >
      <div className="w-full h-full box-border p-5">
        <div className="w-full">
          <span className="text-[40px] font-semibold">&#36;{houseDetail.Price}</span>
        </div>

        <div className="dropdown w-full border-2 border-red-500 rounded-xl">
          <label tabIndex={0} className="btn m-1 w-full justify-start text-[25px]">
            {Bill.checkInDay.getDate() !== new Date().getDate()
              ? moment(Bill.checkInDay).format('MM-DD-YYYY')
              : 'Select date'}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content shadow-xl
                          menu p-2 bg-base-100 rounded-box
                          transition-all duration-500 w-full mt-[150px]
                          "
          >
            <li>
              <Calendar
                editableDateInputs={true}
                onChange={(item) => handleOnChange(item)}
                minDate={new Date()}
                // moveRangeOnFirstSelection={false}
                date={Bill.checkInDay}
                color="rgb(239 68 68)"
                className=" font-bold m-auto text-3xl"
              />
            </li>
          </ul>
        </div>

        <div className="dropdown w-full border-2 border-red-500 rounded-xl mt-2 ">
          <label tabIndex={0} className="btn m-1 w-full justify-start text-[25px]">
            Guests
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content shadow-xl
                          menu p-2 bg-base-100 rounded-box
                          transition-all duration-500 w-full mt-[85px]
                          "
          >
            <li className="w-full h-fit">
              <Who styleWho={'justify-center  '} />
            </li>
          </ul>
        </div>

        <motion.button className="mt-2  w-full h-[50px] bg-red-500 rounded-xl text-white font-semibold">
          Reverse
        </motion.button>
      </div>
    </div>
  );
};
export default Bill;
