import { userAccContext } from '@/contexts/userAcc';
import axios from 'axios';
import { Variants, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
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
  const router = useRouter();
  const { user } = useContext(userAccContext);


  const ChangeRouter = async () => {
    if (user.UserName === userName) return;
    await axios.put('https://api.chatengine.io/chats/',
      {
        username: [user.UserName, userName],
        title: "Chat with " + userName,
        is_direct_chat: true
      },
      { headers: { "Private-key": '659aed62-8471-4685-beb3-d0209645877a' } }
    )
    router.push('/chats', undefined, { shallow: true });
  }

  return (
    <motion.div variants={variants} whileInView="inView" className="w-fit h-fit m-auto ">
      {/* host card */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="w-[25rem] mobile:w-full h-[16rem] bg-white rounded-2xl flex flex-col shadow-2xl"
      >
        <div className="w-fit h-fit m-auto text-center">
          <motion.img
            variants={variants}
            animate="iconAnimate"
            src={'/api/img/path/' + imgPath}
            alt=""
            className="w-[7.5rem] h-[7.5rem] rounded-full"
          />
          <span className="font-semibold text-[2rem]">{userName}</span>
          <br />
          {userName === user.UserName ? <></> :
            <motion.button onClick={ChangeRouter}
              whileHover={{ backgroundColor: 'red', color: 'white' }}
              transition={{ duration: .5, type: 'tween' }}
              className='w-full h-[3rem] bg-emerald-300 rounded-2xl flex'>
              <AiOutlineMessage className='text-[2rem] m-auto mr-0' />
              <span className=' font-semibold m-auto ml-0 text-[1.5rem]'>
                Chat
              </span>
            </motion.button>
          }
        </div>
      </motion.div>
      <div className="flex flex-col w-full h-fit items-center text-[2rem] divide-y-2 divide-red-500 mt-5">
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
