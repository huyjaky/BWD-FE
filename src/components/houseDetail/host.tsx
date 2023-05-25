import { userAcc } from '@/models/userAcc';
import { Variants, motion } from 'framer-motion';
import { TbBrandGmail } from 'react-icons/tb';

interface HostProps {
  userAcc: userAcc;
  placeOffer: {PlaceOfferId: string, PlaceOffer: string, PathIcon: string}[]
}

const variants: Variants = {
  inView: {
    x: [-200, 0]
  }
};

const Host = ({ userAcc, placeOffer }: HostProps) => {
  return (
    <div className="flex-[7] flex flex-col">
      <div className="w-full mb-5 ">
        <span className="text-[30px]">Meet your host</span>
      </div>
      <div className="w-full rounded-2xl h-[550px] bg-[#f0efe9] flex">
        <motion.div variants={variants} whileInView="inView" className="w-fit h-fit m-auto">
          {/* host card */}
          <motion.div
          whileHover={{scale: 1.1}}
          className="w-[400px] h-[250px] bg-white rounded-2xl flex flex-col shadow-2xl">
            <div className="w-fit h-fit m-auto text-center">
              <img src={userAcc.Image} alt="" className="w-[120px] h-[120px] rounded-full" />
              <span className="font-semibold text-[30px]">{userAcc.UserName}</span>
              <br />
            </div>
          </motion.div>
          <div className="flex flex-col w-full h-fit items-center text-[30px] divide-y-2 divide-red-500 mt-5">
            <span>Contact me</span>
            <div className="flex items-center">
              <TbBrandGmail />
              &#58; &#160;<span>{userAcc.Gmail}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 border-t-2 border-slate-800">
        <div className="w-full mb-5 mt-5">
          <span className="text-[30px]">What this place offers</span>
        </div>
        <div className='w-full grid grid-cols-2'>
          {placeOffer.map((item: {PlaceOfferId: string, PlaceOffer: string, PathIcon: string}, index: number)=>{
            return (
              <motion.div
              whileInView={{y:[20, 0], opacity: [0, 1]}}
              transition={{duration: .6, delay: .2 * index}}
              className='w-full h-fit flex items-center' key={index} >
                <img src={item.PathIcon} alt="" className='w-[35px] h-[35px]'/>
                <span className='text-[25px]'>{item.PlaceOffer}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
};
export default Host;
