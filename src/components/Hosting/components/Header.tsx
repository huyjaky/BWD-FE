import React, { useState } from 'react'
import Image from 'next/image'
import Logo from '../../../../public/assets/Logo.png'
import ButtonRounded from '../ButtonRounded'
import { BsBell } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'
import { motion } from 'framer-motion'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import MenuMobile from './MenuMobile'

function Header(): JSX.Element {

    const [activeToday, setActiveToday] = useState(true);

    const [activeInbox, setActiveInbox] = useState(false);

    const [activeCalendar, setActiveCalendar] = useState(false);

    const [activeMenu, setActiveMenu] = useState(false);

    const [toggleMenu, settoggleMenu] = useState(false);

    return (
        <div className='flex justify-between h-[70px] items-center px-[20px] border-[1px] border-b-[#e4e4e4] overflow-hidden'>
            <div>
                <Image width={70} height={70} src={Logo} alt='Logo' />
            </div>
            <div className=''>
                <div className='desktop:hidden laptop:hidden tablet:hidden absolute right-[145px] top-[12.5px] ' onClick={() => settoggleMenu(!toggleMenu)}>
                    <ButtonRounded icon={toggleMenu ? <AiOutlineClose /> : < AiOutlineMenu />} />
                </div>
                {/* blur: độ đục của màu */}
                <div className=''>
                    <ul className='flex gap-3 text-[14px] font-semibold mobile:hidden
                '>
                        <li className='relative'><button className={`py-[10px] px-[16px] rounded-[30px] hover:bg-[#F7F7F7] ${activeToday ? 'text-black' : 'text-[#717171]'}                       
                    `}>Today</button>
                            <div className='after:absolute after:content-[""] after:w-[30px] after:h-[1.5px] after:bg-black after:left-5 after:top-8' ></div>
                        </li>
                        <li><button className={`py-[10px] px-[16px] rounded-[30px] hover:bg-[#F7F7F7] ${activeInbox ? 'text-black' : 'text-[#717171]'}
                    `}>Inbox</button></li>
                        <li><button className={`py-[10px] px-[16px] rounded-[30px] hover:bg-[#F7F7F7] ${activeCalendar ? 'text-black' : 'text-[#717171]'}
                    `}>Calendar</button></li>
                        <li><button className={`py-[10px] px-[16px] rounded-[30px] hover:bg-[#F7F7F7] ${activeMenu ? 'text-black' : 'text-[#717171]'} flex items-center
                    `}>Menu <IoIosArrowDown className='ml-1' /></button></li>
                    </ul>

                </div>
            </div>
            <MenuMobile
                toggleMenu={toggleMenu}
                activeInbox={activeInbox}
                activeCalendar={activeCalendar}
                activeMenu={activeMenu}
                activeToday={activeToday}
            />

            <div className='flex gap-4'>
                <ButtonRounded icon={<BsBell />} />
                <ButtonRounded image={Logo} />
            </div>
        </div>
    )
}

export default Header;
