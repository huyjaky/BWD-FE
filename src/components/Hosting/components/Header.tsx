import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '../../../../public/assets/Logo.png';
import ButtonRounded from '../ButtonRounded';
import { BsBell } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { motion } from 'framer-motion';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import MenuMobile from './MenuMobile';
import { CreateList } from '../../../../public/Icon_BnB_svg';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Header(): JSX.Element {
  const router = useRouter();

  const handleCreatehome = () => {
    router.push('/createhouse');
  };


  const [active, setActive] = useState('');

  const [activeMenu, setActiveMenu] = useState(false);

  const [toggleMenu, settoggleMenu] = useState(false);

  const handleActive = (title: string) => {
    setActive(title);
  };
  const handleMenu = () => {
    setActiveMenu(!activeMenu);
    settoggleMenu(!toggleMenu);
  };

  return (
    <div className="flex justify-between h-[4.5rem] items-center px-[1rem] border-[1px] border-b-[#e4e4e4]">
      <Link href={'/'}>
        <div>
          <Image width={200} height={0} src={'/icon2.jpg'} alt="Logo" />
        </div>
      </Link>
      <div className="relative">
        {/* blur: độ đục của màu */}
        <div className="">
          <ul
            className="flex gap-3 text-[1rem] font-semibold mobile:hidden
                    "
          >
            <li className="relative">
              <button
                onClick={() => handleActive('Today')}
                className={`py-[.6rem] px-[1rem] rounded-[2rem] hover:bg-[#F7F7F7] ${active === 'Today' ? 'text-black' : 'text-[#717171]'
                  }
                        before:absolute before:content-[""] before:w-0 before:h-[.2rem] before:bg-black before:left-4 before:bottom-2
                        before::ease-in-out before:duration-500
                        hover:before:w-[60%]


                    `}
              >
                Today
              </button>
            </li>
            <li className="relative">
              <button
                onClick={() => {
                  router.push('/chats', undefined, { shallow: true });
                  handleActive('Inbox')
                }}
                className={`py-[.6rem] px-[1rem] rounded-[2rem] hover:bg-[#F7F7F7] ${active === 'Inbox' ? 'text-black' : 'text-[#717171]'
                  }
                        before:absolute before:content-[""] before:w-0 before:h-[.2rem] before:bg-black before:left-4 before:bottom-2
                        before::ease-in-out before:duration-500
                        hover:before:w-[60%]
                    `}
              >
                Inbox
              </button>
            </li>
            <li className="relative">
              <button
                onClick={() => handleActive('Calendar')}
                className={`py-[.6rem] px-[1rem] rounded-[2rem] hover:bg-[#F7F7F7] ${active === 'Calendar' ? 'text-black' : 'text-[#717171]'
                  }
                        before:absolute before:content-[""] before:w-0 before:h-[.2rem] before:bg-black before:left-4 before:bottom-2
                        before::ease-in-out before:duration-500
                        hover:before:w-[60%]
                    `}
              >
                Calendar
              </button>
            </li>
            <li className="relative">
              <button
                onClick={() => handleMenu()}
                className={`py-[.6rem] px-[1rem] rounded-[2rem] hover:bg-[#F7F7F7] ${activeMenu ? 'text-black' : 'text-[#717171]'
                  } flex items-center
                                before:absolute before:content-[""] before:w-0 before:h-[.2rem] before:bg-black before:left-4 before:bottom-2
                                before:ease-in-out before:duration-500
                                hover:before:w-[60%]
                    `}
              >
                Menu <IoIosArrowDown className="ml-1" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`w-[12.5rem] absolute right-[35%] top-[11%] bg-[rgba(255,255,255,.25)]
                shadow-shadowHeadhost  rounded-[1rem] mobile:hidden ${toggleMenu ? 'h-[2.4rem] ease-in-out duration-500' : 'h-0'
          }  `}
      >
        {toggleMenu && (
          <motion.ul className="h-full">
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5
              }}
              className="text-[1rem] h-[0%]"
            >
              <button
                onClick={handleCreatehome}
                className={`w-[100%] h-[100%] p-[20px] text-start flex justify-between items-center rounded-[1rem] hover:bg-[#F7F7F7] ${active === 'Create a new listing' ? 'text-black' : 'text-[#717171]'
                  } flex items-center justify-center
                            `}
              >
                Create House{' '}
                <div className="w-[1rem]">
                  <CreateList className="" />
                </div>
              </button>
            </motion.li>
          </motion.ul>
        )}
      </div>

      <MenuMobile toggleMenu={toggleMenu} active={active} setActive={setActive} />

      <div className="flex gap-4">
        <div
          className="desktop:hidden laptop:hidden tablet:hidden  "
          onClick={() => settoggleMenu(!toggleMenu)}
        >
          <ButtonRounded icon={toggleMenu ? <AiOutlineClose /> : <AiOutlineMenu />} />
        </div>
        <ButtonRounded icon={<BsBell />} />
      </div>
    </div>
  );
}

export default Header;
