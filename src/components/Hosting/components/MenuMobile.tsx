import React from 'react';

import { Calendar, CreateList, Inbox, Today } from '../../../../public/Icon_BnB_svg';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
interface MenuMobileProps {
  toggleMenu: boolean;
  active: string;
  setActive: (title: string) => void;
}

const MenuMobile: React.FC<MenuMobileProps> = ({ toggleMenu, active, setActive }) => {
  const router = useRouter();

  const handleCreatehome = () => {
    router.push('/createhome');
  };

  return (
    <div
      className={`z-0 flex-col bg-[rgba(255,255,255,.25)]
                        shadow-shadowHeadhost  rounded-[1rem] absolute
                        right-[1rem] top-[5rem] ${
                          toggleMenu ? 'h-[14.5rem] ease-in-out duration-500' : 'h-0'
                        } tablet:hidden desktop:hidden laptop:hidden`}
    >
      {/* blur: độ đục của màu */}
      {toggleMenu && (
        <ul
          className="flex text-[1rem] font-semibold
            z-50 flex-col bg-[rgba(255,255,255,.25)]
            shadow-shadowHeadhost backdrop-blur-[.25rem] rounded-[1rem]
            right-[9.375rem] w-[12.5rem] h-full
            "
        >
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.1
            }}
            className="relative"
          >
            <button
              onClick={() => setActive('Today')}
              className={`w-[100%] h-[2.4rem] p-[1rem] text-start flex justify-between items-center rounded-b-none rounded-t-[1rem] hover:bg-[#F7F7F7] ${
                active === 'Today' ? 'text-black' : 'text-[#717171]'
              }
                            before:absolute before:content-[""] before:w-0 before:h-[.2rem] before:bg-black before:left-4 before:bottom-0
                            before::ease-in-out before:duration-500
                            hover:before:w-[85%]
                `}
            >
              Today <Today />
            </button>
          </motion.li>
          <motion.li
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2
            }}
          >
            <button
              onClick={() => setActive('Inbox')}
              className={`w-[100%] h-[2.4rem] p-[1rem] text-start flex justify-between items-center rounded-none hover:bg-[#F7F7F7] ${
                active === 'Inbox' ? 'text-black' : 'text-[#717171]'
              }
                            before:absolute before:content-[""] before:w-0 before:h-[.2rem] before:bg-black before:left-4 before:bottom-0
                        before::ease-in-out before:duration-500
                        hover:before:w-[85%]
                 `}
            >
              Inbox
              <Inbox />{' '}
            </button>
          </motion.li>
          <motion.li
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3
            }}
          >
            <button
              onClick={() => setActive('Calendar')}
              className={`w-[100%] h-[2.4rem] p-[1rem] text-start flex justify-between items-center rounded-none hover:bg-[#F7F7F7] ${
                active === 'Calendar' ? 'text-black' : 'text-[#717171]'
              }
                        before:absolute before:content-[""] before:w-0 before:h-[.2rem] before:bg-black before:left-4 before:bottom-0
                        before::ease-in-out before:duration-500
                        hover:before:w-[85%]
                `}
            >
              Calendar
              <Calendar />{' '}
            </button>
          </motion.li>
          <motion.li
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.4
            }}
          >
            <button
              onClick={handleCreatehome}
              className={`w-[100%] h-[3rem] p-[1rem] text-start flex justify-between items-center rounded-t-none rounded-b-[1rem] hover:bg-[#F7F7F7]  text-[#717171]
                        before:absolute before:content-[""] before:w-0 before:h-[.2rem] before:bg-black before:left-4 before:bottom-0
                        before::ease-in-out before:duration-500
                        hover:before:w-[85%]
                `}
            >
              Create a new listing <CreateList className="" />
            </button>
          </motion.li>
        </ul>
      )}
    </div>
  );
};
export default MenuMobile;
