import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '../../../../public/assets/Logo.png';
import ButtonRounded from '../ButtonRounded';
import { BsBell } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { motion } from 'framer-motion';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import MenuMobile from './MenuMobile';
import { CreateList } from '../../../../Icon_BnB_svg';
import { useRouter } from 'next/router';

function Header(): JSX.Element {
  const router = useRouter();

  const handleCreatehome = () => {
    router.push('/createhome');
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
    <div className="flex justify-between h-[70px] items-center px-[20px] border-[1px] border-b-[#e4e4e4]">
      <div>
        <Image width={70} height={70} src={Logo} alt="Logo" />
      </div>
      <div className="relative">
        {/* blur: độ đục của màu */}
        <div className="">
          <ul
            className="flex gap-3 text-[14px] font-semibold mobile:hidden
                    "
          >
            <li className="relative">
              <button
                onClick={() => handleActive('Today')}
                className={`py-[10px] px-[16px] rounded-[30px] hover:bg-[#F7F7F7] ${
                  active === 'Today' ? 'text-black' : 'text-[#717171]'
                }
                        before:absolute before:content-[""] before:w-0 before:h-[2px] before:bg-black before:left-4 before:bottom-2
                        before::ease-in-out before:duration-500
                        hover:before:w-[60%]

                        
                    `}
              >
                Today
              </button>
            </li>
            <li className="relative">
              <button
                onClick={() => handleActive('Inbox')}
                className={`py-[10px] px-[16px] rounded-[30px] hover:bg-[#F7F7F7] ${
                  active === 'Inbox' ? 'text-black' : 'text-[#717171]'
                }
                        before:absolute before:content-[""] before:w-0 before:h-[2px] before:bg-black before:left-4 before:bottom-2
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
                className={`py-[10px] px-[16px] rounded-[30px] hover:bg-[#F7F7F7] ${
                  active === 'Calendar' ? 'text-black' : 'text-[#717171]'
                }
                        before:absolute before:content-[""] before:w-0 before:h-[2px] before:bg-black before:left-4 before:bottom-2
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
                className={`py-[10px] px-[16px] rounded-[30px] hover:bg-[#F7F7F7] ${
                  activeMenu ? 'text-black' : 'text-[#717171]'
                } flex items-center
                                before:absolute before:content-[""] before:w-0 before:h-[2px] before:bg-black before:left-4 before:bottom-2
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
        className={`w-[200px] absolute right-[35%] top-[11%] bg-[rgba(255,255,255,.25)]
                shadow-shadowHeadhost  rounded-[13px] mobile:hidden ${
                  toggleMenu ? 'h-[40px] ease-in-out duration-500' : 'h-0'
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
              className="text-[12px] h-[0%]"
            >
              <button
                onClick={handleCreatehome}
                className={`w-[100%] h-[100%] p-[20px] text-start flex justify-between items-center rounded-[13px] hover:bg-[#F7F7F7] ${
                  active === 'Create a new listing' ? 'text-black' : 'text-[#717171]'
                } flex items-center justify-center
                            `}
              >
                Create a new listing{' '}
                <div className="w-[20px]">
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
        <ButtonRounded image={Logo} />
      </div>
    </div>
  );
}

export default Header;
