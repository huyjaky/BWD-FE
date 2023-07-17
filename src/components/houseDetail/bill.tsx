import { BillContext } from '@/contexts/bill';
import { house_ } from '@/models/house';
import moment from 'moment';
import { useContext, useEffect } from 'react';
import { Calendar } from 'react-date-range';
import Who from '../rootMaskHeader/controlPlan/controlBar/popOverDetail/who';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { title } from 'process';
import { useSession } from 'next-auth/react';
import { userAccContext } from '@/contexts/userAcc';

interface BillProps {
  houseDetail: house_;
}

const Bill = ({ houseDetail }: BillProps) => {
  const { Bill, setBill } = useContext(BillContext);
  const { address } = useContext(selectPlaceContext);
  const {user} = useContext(userAccContext)
  const {data:session, status} = useSession()

  const handleOnChange = (item: any) => {
    setBill({ ...Bill, checkInDay: item });
  };

  useEffect(() => {}, [Bill.checkInDay]);

  useEffect(() => {
    setBill({ ...Bill, guest: { ...Bill.guest, ...address.guest } });
    console.log('bill');
  }, [address]);

  return (
    <div
      className="w-full h-fit bg-white rounded-2xl top-[6rem]
                    shadow-2xl sticky  mb-[17.5rem] transition-all" >
      <div className="w-full h-full box-border p-5">
        <div className="w-full">
          <span className="text-[2.4rem] font-semibold">&#36;{houseDetail.Price}</span>
        </div>

        <div className="dropdown w-full border-2 border-red-500 rounded-xl">
          <label tabIndex={0} className="btn m-1 w-full justify-start text-[2rem]">
            {Bill.checkInDay.getDate() !== new Date().getDate()
              ? moment(Bill.checkInDay).format('MM-DD-YYYY')
              : 'Select date'}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content shadow-xl
                          menu p-2 bg-base-100 rounded-box
                          transition-all duration-500 w-full mt-[9.375rem]
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
          <label tabIndex={0} className="btn m-1 w-full justify-start text-[2rem]">
            {Bill.guest.adults != 0 || Bill.guest.childrens != 0
              ? Bill.guest.adults + Bill.guest.childrens + ' guests'
              : 'Guests '}

            {Bill.guest.infants != 0 && ', ' + Bill.guest.infants + ' infants'}
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
        <Link href={user.UserId === houseDetail.PostBy ? `/house/${houseDetail.HouseId}` : `/confirm/${houseDetail.HouseId}`}>
          <motion.button
            onClick={(event) => {

              if (user.UserId === houseDetail.PostBy) return;
              setBill({
                ...Bill,
                image: houseDetail.arrImg[0].Path,
                title: houseDetail.Title,
                formatedAddress: houseDetail.address.formattedAddress,
                price: houseDetail.Price
              });
            }}
            className="mt-2  w-full h-[3rem] bg-red-500 rounded-xl text-white font-semibold"
          >
            Reverse
          </motion.button>
        </Link>
      </div>
    </div>
  );
};
export default Bill;
