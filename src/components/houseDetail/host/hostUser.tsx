import { Variants, motion } from 'framer-motion';
import { TbBrandGmail } from 'react-icons/tb';

interface HostUserProps {
  imgPath: string | undefined;
  userName: string | undefined;
  gmail: string | undefined;
  description: string
}

const variants: Variants = {
  inView: {
    x: [-200, 0]
  },
  iconAnimate: {
    borderRadius: [
      '50% 50% 20% 80% / 25% 80% 20% 75%',
      '67% 33% 47% 53% / 37% 20% 80% 63%',
      '39% 61% 47% 53% / 37% 40% 60% 63%',
      '39% 61% 82% 18% / 74% 40% 60% 26%',
      '50% 50% 53% 47% / 26% 22% 78% 74%',
      '50% 50% 20% 80% / 25% 80% 20% 75%',
      '30% 70% 70% 30% / 30% 52% 48% 70%',
      '20% 80% 20% 80% / 20% 80% 20% 80%'
    ],
    transition: {
      duration: 10,
      repeat: Infinity,
      type: 'tween'
    }
  }
};

const HostUser = ({ imgPath, userName, gmail, description }: HostUserProps) => {
  return (
    <motion.div variants={variants} whileInView="inView" className="w-fit h-fit m-auto ">
      {/* host card */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="w-[400px] mobile:w-full h-[250px] bg-white rounded-2xl flex flex-col shadow-2xl"
      >
        <div className="w-fit h-fit m-auto text-center">
          <motion.img
            variants={variants}
            animate="iconAnimate"
            src={'/api/img/path/' + imgPath}
            alt=""
            className="w-[120px] h-[120px] rounded-full"
          />
          <span className="font-semibold text-[30px]">{userName}</span>
          <div className='w-full h-fit text-justify text-[20px]'>
            {description}
          </div>
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
