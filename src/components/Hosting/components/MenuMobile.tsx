import React from 'react';

import { Calendar, CreateList, Inbox, Today } from '../../../../Icon_BnB_svg';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
interface MenuMobileProps {
  toggleMenu: boolean;
  activeInbox: boolean;
  activeCalendar: boolean;
  activeMenu: boolean;
  activeToday: boolean;
}

const MenuMobile: React.FC<MenuMobileProps> = ({
  toggleMenu,
  activeInbox,
  activeCalendar,
  activeMenu,
  activeToday
}) => {
  return (
    <div
      className={`z-0 flex-col bg-[rgba(255,255,255,.25)]
                        shadow-shadowHeadhost  rounded-[13px] absolute
                        right-[20px] top-[80px] ${
                          !toggleMenu ? 'hidden' : ''
                        } tablet:hidden desktop:hidden laptop:hidden`}
    >
      {/* blur: độ đục của màu */}
      <ul
        className="flex text-[14px] font-semibold
                z-50 flex-col bg-[rgba(255,255,255,.25)]
                shadow-shadowHeadhost backdrop-blur-[4px] rounded-[13px]
                right-[150px] w-[200px] h-[165px]
                "
      >
        <li className="relative">
          <button
            className={`w-[100%] h-[40px] p-[20px] text-start flex justify-between items-center rounded-b-none rounded-t-[13px] hover:bg-[#F7F7F7] ${
              activeToday ? 'text-black' : 'text-[#717171]'
            }
                    `}
          >
            Today <Today />
          </button>
          <div className='after:absolute after:content-[""] after:w-[30px] after:h-[1.5px] after:bg-black after:left-7 after:top-8'></div>
        </li>
        <li>
          <button
            className={`w-[100%] h-[40px] p-[20px] text-start flex justify-between items-center rounded-none hover:bg-[#F7F7F7] ${
              activeInbox ? 'text-black' : 'text-[#717171]'
            }
                    `}
          >
            Inbox
            <Inbox />{' '}
          </button>
        </li>
        <li>
          <button
            className={`w-[100%] h-[40px] p-[20px] text-start flex justify-between items-center rounded-none hover:bg-[#F7F7F7] ${
              activeCalendar ? 'text-black' : 'text-[#717171]'
            }
                    `}
          >
            Calendar
            <Calendar />{' '}
          </button>
        </li>
        <li>
          <button
            className={`w-[100%] h-[44px] p-[20px] text-start flex justify-between items-center rounded-t-none rounded-b-[13px] hover:bg-[#F7F7F7] ${
              activeMenu ? 'text-black' : 'text-[#717171]'
            } flex items-center justify-center
                    `}
          >
            Create a new listing <CreateList className="" />
          </button>
        </li>
      </ul>
    </div>
  );
};
export default MenuMobile;
