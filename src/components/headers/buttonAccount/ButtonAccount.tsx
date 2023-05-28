import { selectPopoverContext } from '@/contexts';
import { userAccContext } from '@/contexts/userAcc';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsList } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';

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
  const { setIsLoginClick } = useContext(selectPopoverContext);
  const { user, resetDataUser } = useContext(userAccContext);
  const [isClick, setIsClick] = useState(false);
  const controlBar = useRef<HTMLInputElement>(null);

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

  useEffect(() => {}, [user]);
  return (
    <div
      className="w-fit p-1 rounded-full bg-white flex border-gray-400 hover:shadow-lg
            transition-all duration-500 border-2 relative"
      ref={controlBar}
      onClick={() => {
        setIsClick(!isClick);
        console.log('isClick', isClick);
      }}
    >
      <BsList className="w-[30px] h-[30px]" />
      {user.Image ? (
        <img src={user.Image} className="w-[30px] h-[30px] rounded-full" />
      ) : (
        <HiUserCircle className="w-[40px] h-[30px] " />
      )}
      <AnimatePresence initial={false}>
        <motion.div
          variants={variants}
          animate={isClick ? 'show' : 'hidden'}
          transition={{ duration: 0.5 }}
          className="absolute translate-y-16 w-[250px] h-fit shadow-2xl right-0 rounded-2xl bg-white
          overflow-hidden
      "
        >
          <div className="w-full h-fit border-b-2">
            {!user?.UserId ? (
              <>
                <button
                  className="w-full py-4 text-left px-5"
                  onClick={(event) => setIsLoginClick(true)}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <button className="w-full py-4 text-left px-5">Manage listings</button>
                <button className="w-full py-4 text-left px-5">Account</button>
                <button
                  className="w-full py-4 text-left px-5"
                  onClick={async () => {
                    const logout = await signOut({
                      redirect: false
                    });
                    resetDataUser();
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
          <div className="w-full h-fit">
            <button className="w-full py-4 text-left px-5">Airbnb your home</button>
            <button className="w-full py-4 text-left px-5">Help</button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ButtonAccount;
