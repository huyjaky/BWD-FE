import {Variants, motion} from 'framer-motion';
import { TbBrandGmail } from 'react-icons/tb';

interface HostUserProps {
  imgPath: string;
  userName: string;
  gmail: string
}

const variants: Variants = {
  inView: {
    x: [-200, 0]
  }
};

const HostUser = ({imgPath, userName, gmail}: HostUserProps) => {
  return (
    <motion.div variants={variants} whileInView="inView" className="w-fit h-fit m-auto">
      {/* host card */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="w-[400px] h-[250px] bg-white rounded-2xl flex flex-col shadow-2xl">
        <div className="w-fit h-fit m-auto text-center">
          <img src={imgPath} alt="" className="w-[120px] h-[120px] rounded-full" />
          <span className="font-semibold text-[30px]">{userName}</span>
          <br />
        </div>
      </motion.div>
      <div className="flex flex-col w-full h-fit items-center text-[30px] divide-y-2 divide-red-500 mt-5">
        <span>Contact me</span>
        <div className="flex items-center">
          <TbBrandGmail />
          &#58; &#160;<span>{gmail}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default HostUser;
