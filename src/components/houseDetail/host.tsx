import { userAcc } from '@/models/userAcc';
import { Variants, motion } from 'framer-motion';
import { TbBrandGmail } from 'react-icons/tb';

interface HostProps {
  userAcc: userAcc;
}

const variants: Variants = {
  inView: {
    x: [-200, 0]
  }
};

const Host = ({ userAcc }: HostProps) => {
  console.log(userAcc.Image);
  return (
    <div className="flex-[7] flex flex-col">
      <div className="w-full mb-5 ">
        <span className="text-[30px]">Meet your host</span>
      </div>
      <div className="w-full rounded-2xl h-[550px] bg-[#f0efe9] flex">
        <motion.div variants={variants} whileInView="inView" className="w-fit h-fit m-auto">
          {/* host card */}
          <div className="w-[400px] h-[250px] bg-white rounded-2xl flex flex-col shadow-2xl">
            <div className="w-fit h-fit m-auto text-center">
              <img src={userAcc.Image} alt="" className="w-[120px] h-[120px] rounded-full" />
              <span className="font-semibold text-[30px]">{userAcc.UserName}</span>
              <br />
            </div>
          </div>
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
        <div className="w-full mb-5">
          <span className="text-[30px]">What this place offers</span>
        </div>
      </div>
    </div>
  );
};
export default Host;
