import { userAccContext } from '@/contexts/userAcc';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BiSearch, BiUser } from 'react-icons/bi';
import ListButton from '../headers/buttonAccount/listButton';
import { BsHouses } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { selectPopoverContext } from '@/contexts';

const FooterMainRes = () => {
  const { user } = useContext(userAccContext);
  const { setIsLoginClick } = useContext(selectPopoverContext);
  const [isClickProfile, setIsClickProfile] = useState<boolean>(false);
  const profileTab = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => { }, [user]);

  useEffect(() => {
    const handeOnClick = (event: any) => {
      const isClick = profileTab.current?.contains(event.target);
      if (!isClick) {
        setIsClickProfile(false);
        console.log('check');
        return;
      }
    };
    document.addEventListener('click', handeOnClick);
  }, []);

  return (
    <>
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


        <motion.button
          className="flex w-fit h-full flex-col box-border mx-[70px]"
          ref={profileTab}
          onClick={(event) => {
            if (user.UserId) {
              setIsClickProfile(!isClickProfile);
            }
          }}
        >
          {user.UserId !== 'none user' ? (
            <div className="w-full flex justify-center flex-[4]">
              <img
                src={'/api/img/path/' + user.Image}
                alt={user.UserId}
                className="object-cover
            w-[40px] h-[40px] rounded-full
            "
              />
            </div>
          ) : (
            <div className="w-full flex justify-center flex-[4]">
              <BiUser className="text-[40px] text-slate-500" />
            </div>
          )}
          <div className="flex-1 text-slate-500">{user.UserId ? 'Profile' : 'Login'}</div>
        </motion.button>

        <motion.button
          onClick={() => {
            if (user.UserId !== 'none user') {
              router.push('/hosting', undefined, { shallow: true });
              return;
            }
            setIsLoginClick(true);
          }}
          className="flex w-fit h-full flex-col box-border ">
          <div className="w-full flex justify-center flex-[4]">
            <BsHouses className="text-[40px] text-slate-500" />
          </div>
          <div className="flex-1 text-slate-500">Manage</div>
        </motion.button>

        <motion.div
          animate={isClickProfile ? {} : { height: 0 }}
          className="fixed bottom-[70px] w-full bg-white overflow-hidden"
        >
          <ListButton />
        </motion.div>
      </div>
    </>
  );
};

export default FooterMainRes;
