import { selectPopoverContext } from '@/contexts';
import { getHouseContext } from '@/contexts/getHouse';
import { userAccContext } from '@/contexts/userAcc';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsList } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';
import ListButton from './listButton';

const variants: Variants = {
  show: {
    maxHeight: ['0px', '500px'],
    // border: ['none', '3px solid grey'],
    display: 'block'
  },
  hidden: {
    maxHeight: ['500px', '0px'],
    // border: ['3px solid grey', 'none'],
    transitionEnd: {
      display: 'none'
    }
  }
};

const ButtonAccount = () => {
  const { user, resetDataUser } = useContext(userAccContext);
  const [isClick, setIsClick] = useState(false);
  const controlBar = useRef<HTMLInputElement>(null);
  const { status } = useSession();

  useEffect(() => {
    // animation close control panel
    const handleControlPanel = (event: any) => {
      const isClick = controlBar.current?.contains(event.target);
      if (!isClick) {
        setIsClick(false);
      }
    };
    document.addEventListener('mousedown', handleControlPanel);
    document.addEventListener('scroll', handleControlPanel);
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user, status]);
  return (
    <div
      className="w-fit p-1 rounded-full bg-white flex border-gray-400 hover:shadow-lg
            transition-all duration-500 border-2 relative"
      ref={controlBar}
      onClick={() => {
        setIsClick(!isClick);
      }}
    >
      <BsList className="w-[30px] h-[30px]" />
      {user?.Image ? (

        <img src={'/api/img/path/'+user.Image} className="w-[30px] h-[30px] rounded-full" />
      ) : (
        <HiUserCircle className="w-[40px] h-[30px] " />
      )}
      {/* <HiUserCircle className="w-[40px] h-[30px] " /> */}
      <AnimatePresence initial={false}>
        <motion.div
          variants={variants}
          animate={isClick ? 'show' : 'hidden'}
          transition={{ duration: 0.5 }}
          className="absolute translate-y-16 w-[250px] h-fit shadow-2xl right-0 rounded-2xl bg-white
          overflow-hidden
      "
        >
          <ListButton />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ButtonAccount;
