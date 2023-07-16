import { userAcc } from '@/models/userAcc';
import { motion } from 'framer-motion';
import HostUser from './hostUser';
import { house_ } from '@/models/house';
import FtHouse from './ftHouse';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { AiOutlineAreaChart } from 'react-icons/ai';
import { TbBathFilled } from 'react-icons/tb';
import { BiSolidBed } from 'react-icons/bi';
import { FaCompass } from 'react-icons/fa';
import { BsFillHouseFill } from 'react-icons/bs';

interface HostProps {
  userAcc: userAcc;
  placeOffer: { PlaceOfferId: string; PlaceOffer: string }[];
  link: string;
  description: string;
  houseDetail: house_;
}

const Host = ({ userAcc, placeOffer, link, description, houseDetail }: HostProps) => (
  <div className="flex-[7] flex flex-col">
    <div className="w-full mb-5 ">
      <span className="text-[2rem]">Meet your host</span>
    </div>
    <div className="w-full rounded-2xl h-[34.3rem] bg-[#f0efe9] flex">
      <HostUser phone={userAcc.Phone} description={description} imgPath={userAcc.Image} userName={userAcc.UserName} gmail={userAcc.Gmail} />
    </div>

    <div className="mt-10 border-t-2 border-slate-800">
      <div className="w-full mb-5 mt-5">
        <span className="text-[2rem]">Description</span>
      </div>
      <div className="w-full ">
        {description}
      </div>

    </div>

    <div className="mt-10 border-t-2 border-slate-800">
      <div className="w-full mb-5 mt-5">
        <span className="text-[2rem]">What this Amenities</span>
      </div>
      <div className="w-full grid grid-cols-2">
        {placeOffer.map(
          (
            item: { PlaceOfferId: string; PlaceOffer: string; },
            index: number
          ) => {
            return (
              <motion.div
                whileInView={{ y: [20, 0], opacity: [0, 1] }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="w-full h-fit flex items-center cursor-default"
                key={index}
              >
                <span className="text-[1.5rem] text-ellipsis overflow-hidden whitespace-nowrap">
                  {item.PlaceOffer}
                </span>
              </motion.div>
            );
          }
        )}
      </div>
    </div>

    <div className="mt-10 border-t-2 border-slate-800">
      <div className="w-full mb-5 mt-5">
        <span className="text-[2rem]">House features</span>
      </div>
      <div className="w-full grid grid-cols-2 mobile:grid-cols-1 gap-y-4 ">
        <FtHouse des={houseDetail.Price + ''} title='Price'>
          <MdOutlineAttachMoney />
        </FtHouse>

        <FtHouse des={houseDetail.Capacity + ' m'} title='Area'>
          <AiOutlineAreaChart />
        </FtHouse>

        <FtHouse des={houseDetail.NumsOfBath + ''} title='Baths'>
          <TbBathFilled />
        </FtHouse>

        <FtHouse des={houseDetail.NumsOfBed + ''} title='Beds'>
          <BiSolidBed />
        </FtHouse>

        <FtHouse des={houseDetail.Orientation + ''} title='Orientation'>
          <FaCompass />
        </FtHouse>

        <FtHouse des={houseDetail.Type} title='Type'>
          <BsFillHouseFill />
        </FtHouse>
      </div>
    </div>
  </div>
);
export default Host;
