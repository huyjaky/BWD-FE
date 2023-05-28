import { userAcc } from '@/models/userAcc';
import { motion } from 'framer-motion';
import HostUser from './hostUser';

interface HostProps {
  userAcc: userAcc;
  placeOffer: { PlaceOfferId: string; PlaceOffer: string; PathIcon: string }[];
}

const Host = ({ userAcc, placeOffer }: HostProps) => {
  return (
    <div className="flex-[7] flex flex-col">
      <div className="w-full mb-5 ">
        <span className="text-[30px]">Meet your host</span>
      </div>
      <div className="w-full rounded-2xl h-[550px] bg-[#f0efe9] flex">
        <HostUser imgPath={userAcc.Image} userName={userAcc.UserName} gmail={userAcc.Gmail} />
      </div>

      <div className="mt-10 border-t-2 border-slate-800">
        <div className="w-full mb-5 mt-5">
          <span className="text-[30px]">What this place offers</span>
        </div>
        <div className="w-full grid grid-cols-2">
          {placeOffer.map(
            (
              item: { PlaceOfferId: string; PlaceOffer: string; PathIcon: string },
              index: number
            ) => {
              return (
                <motion.div
                  whileInView={{ y: [20, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  className="w-full h-fit flex items-center"
                  key={index}
                >
                  <img src={item.PathIcon} alt="" className="w-[35px] h-[35px]" />
                  <span className="text-[25px]">{item.PlaceOffer}</span>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
export default Host;
