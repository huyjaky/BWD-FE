import { mobileContolPanelContext } from '@/contexts/mobileControlPanel';
import Link from 'next/link';
import { ReactNode, useContext } from 'react';
import { FaAirbnb } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { TbWorld } from 'react-icons/tb';
import ButtonAccount from '../buttonAccount/ButtonAccount';
import { motion } from 'framer-motion';
import ControlPlanMobile from '@/components/main/mobile/controlPlaneMobile';
interface HeaderFormProps {
  children: ReactNode;
}

const HeaderForm = ({ children }: HeaderFormProps) => {
  const { isShow, setIsShow } = useContext(mobileContolPanelContext);
  return (
    <div className="w-full h-[80px] relative bg-white z-30">
      <header
        className="w-full h-[80px] border-b-2 flex justify-center px-[80px]
      tablet:hidden mobile:hidden
      box-border absolute"
      >
        <div className="w-full h-full flex relative">
          {/* logo container */}
          <Link
            href={'/'}
            className="desktop:flex-1 laptop:mr-7  flex items-center text-red-500
            z-30
            "
          >
            <FaAirbnb className="h-[50px] w-[50px] mr-1" />
            <div className="text-[30px] w-0 overflow-hidden desktop:w-fit font-semibold">
              airbnb
            </div>
          </Link>

          {children}

          {/* controlbar */}
          <div className="flex-1 flex items-center justify-end z-30">
            {/* airbnb your home */}
            <Link
              href={''}
              className="rounded-full bg-white h-fit box-content px-4 py-2
            hover:bg-slate-300 tablet:hidden mobile:hidden
          "
            >
              <span className="font-semibold">Airbnb your home</span>
            </Link>
            {/* translate */}
            <Link
              href={''}
              className="rounded-full bg-white box-content p-1 mr-3 hover:bg-slate-300"
            >
              <TbWorld className="w-[30px] h-[30px]" />
            </Link>
            <ButtonAccount />
          </div>
        </div>
      </header>
      <header className="w-full h-[80px] desktop:hidden laptop:hidden  box-border py-3 px-[80px]">
        <motion.div
          className="w-full h-full shadow-xl rounded-full box-border px-4 py-2 flex "
          onClick={(event) => setIsShow(true)}
        >
          <FiSearch className="h-full text-[30px] text-center" />
          <div className="h-full w-fit flex flex-col ml-5 box-border">
            <span className="font-semibold">Anywhere</span>
            <span className="text-[14px]">Anyweek & Addguests</span>
          </div>
        </motion.div>
        <ControlPlanMobile />
      </header>
    </div>
  );
};
export default HeaderForm;
