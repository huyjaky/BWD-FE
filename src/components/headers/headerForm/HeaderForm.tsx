import Filter from '@/components/main/filter/filter';
import ControlPlanMobile from '@/components/main/mobile/controlPlaneMobile';
import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { mobileContolPanelContext } from '@/contexts/mobileControlPanel';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode, useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import { TbWorld } from 'react-icons/tb';
import ButtonAccount from '../buttonAccount/ButtonAccount';
import { getHouseContext } from '@/contexts/getHouse';
import { filterContext } from '@/contexts/filter';
import Image from 'next/image';
import { userAccContext } from '@/contexts/userAcc';
import { useRouter } from 'next/router';
import { selectPopoverContext } from '@/contexts';
interface HeaderFormProps {
  children: ReactNode;
}

const HeaderForm = ({ children }: HeaderFormProps) => {
  const { isShow, setIsShow } = useContext(mobileContolPanelContext);
  const { setIsShowHeader } = useContext(filterFormAnimateContext);
  const { user, resetDataUser } = useContext(userAccContext);
  const { isFilter, setIsFilter } = useContext(getHouseContext);
  const { resetFilterForm } = useContext(filterContext);
  const { setIsLoginClick } = useContext(selectPopoverContext);
  const router = useRouter();
  return (
    <div className="w-full h-[80px] relative bg-white z-30" id="header-root">
      <header
        className="w-full h-[80px] border-b-2 flex justify-center px-[80px]
      tablet:hidden mobile:hidden
      box-border absolute"
      >
        <div className="w-full h-full flex relative">
          {/* logo container */}
          <Link
            href={'/homepage'}
            onClick={() => {
              setIsShowHeader(false);
              setIsFilter(0);
              resetFilterForm();
            }}
            className="desktop:flex-1 laptop:mr-7  flex items-center text-red-500
            z-30
            "
          >
            <Image src="/icon.png" alt="" width={50} height={50} />
            <div className="text-[30px] w-0 overflow-hidden desktop:w-fit font-semibold">
              olympus
            </div>
          </Link>

          {children}

          {/* controlbar */}
          <div className="flex-1 flex items-center justify-end z-30">
            {/* olympus your home */}
            <div
              onClick={() => {
                if (user.UserId !== 'none user') {
                  router.push('/hosting', undefined, { shallow: true });
                  return;
                }
                setIsLoginClick(true);
              }}
              className="rounded-full bg-white h-fit box-content px-4 py-2
            hover:bg-slate-300 tablet:hidden mobile:hidden cursor-pointer">
              <span className="font-semibold">olympus your home</span>
            </div>
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
      <header
        className="w-full h-[80px] desktop:hidden laptop:hidden  box-border py-3 tablet:px-[80px]
      mobile:px-[20px] mobile:relative tablet:relative
      "
      >
        <motion.div
          className="w-full h-full shadow-xl rounded-full box-border px-4 py-2 flex cursor-pointer"
          onClick={(event) => setIsShow(true)}
        >
          <FiSearch className="h-full text-[30px] text-center" />
          <div className="h-full w-fit flex flex-col ml-5 box-border">
            <span className="font-semibold">Anywhere</span>
            <span className="text-[14px]">Anyweek & Addguests</span>
          </div>
          <div className="flex-1"></div>
        </motion.div>
        <div
          className="w-fit h-full
          mobile:absolute mobile:top-0 mobile:right-0
          tablet:absolute tablet:top-0 tablet:right-0
          "
        >
          <Filter isInvisible={''} />
        </div>
        <ControlPlanMobile />
      </header>
    </div>
  );
};
export default HeaderForm;
