import React from 'react';

import { Calendar, CreateList, Inbox, Today } from '../../../../Icon_BnB_svg';
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
                        shadow-shadowHeadhost  rounded-[13px] absolute
                        right-[20px] top-[80px] ${
                          toggleMenu ? 'h-[170px] ease-in-out duration-500' : 'h-0'
                        } tablet:hidden desktop:hidden laptop:hidden`}
    >
      {/* blur: độ đục của màu */}
      {toggleMenu && (
        <ul
          className="flex text-[14px] font-semibold 
            z-50 flex-col bg-[rgba(255,255,255,.25)]
            shadow-shadowHeadhost backdrop-blur-[4px] rounded-[13px]
            right-[150px] w-[200px] h-full
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
              className={`w-[100%] h-[40px] p-[20px] text-start flex justify-between items-center rounded-b-none rounded-t-[13px] hover:bg-[#F7F7F7] ${
                active === 'Today' ? 'text-black' : 'text-[#717171]'
              }                      
                            before:absolute before:content-[""] before:w-0 before:h-[2px] before:bg-black before:left-4 before:bottom-0
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
              className={`w-[100%] h-[40px] p-[20px] text-start flex justify-between items-center rounded-none hover:bg-[#F7F7F7] ${
                active === 'Inbox' ? 'text-black' : 'text-[#717171]'
              }
                            before:absolute before:content-[""] before:w-0 before:h-[2px] before:bg-black before:left-4 before:bottom-0
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
              className={`w-[100%] h-[40px] p-[20px] text-start flex justify-between items-center rounded-none hover:bg-[#F7F7F7] ${
                active === 'Calendar' ? 'text-black' : 'text-[#717171]'
              }
                        before:absolute before:content-[""] before:w-0 before:h-[2px] before:bg-black before:left-4 before:bottom-0
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
              className={`w-[100%] h-[44px] p-[20px] text-start flex justify-between items-center rounded-t-none rounded-b-[13px] hover:bg-[#F7F7F7]  text-[#717171]
                        before:absolute before:content-[""] before:w-0 before:h-[2px] before:bg-black before:left-4 before:bottom-0
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
