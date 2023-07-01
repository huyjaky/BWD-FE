import { userAccContext } from '@/contexts/userAcc';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

const FooterMainRes = () => {
  const { user } = useContext(userAccContext);
  useEffect(() => { }, [user]);
  return (
    <div
      className="laptop:hidden desktop:hidden fixed z-40 bg-white bottom-0 w-full h-[70px]
          flex border-t-2 py-1 box-border justify-center"
    >
      <Link href={'/homepage'}>
        <motion.button className="flex w-fit h-full flex-col box-border ">
          <div className="w-full flex justify-center flex-[4]">
            <BiSearch className="text-[40px] text-slate-500" />
          </div>
          <div className="flex-1 text-slate-500">Explorer</div>
        </motion.button>
      </Link>

      <div className='w-[80px] h-full'>

      </div>

      <motion.button className="flex w-fit h-full flex-col box-border ">
        {user.UserId ?
          <div className="w-full flex justify-center flex-[4]">
            <img src={'/api/img/path/' + user.Image} alt={user.UserId}  className='object-cover
            w-[40px] h-[40px] rounded-full
            '/>
          </div>
          :
          <div className="w-full flex justify-center flex-[4]">
            <AiOutlineUser className="text-[40px] text-slate-500" />
          </div>
        }
        <div className="flex-1 text-slate-500">{user.UserId ? 'Profile' : 'Login'}</div>
      </motion.button>
    </div>
  );
};

export default FooterMainRes;
