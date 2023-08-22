import Filter from '@/components/main/filter/filter';
import ControlPlanMobile from '@/components/main/mobile/controlPlaneMobile';
import { filterContext } from '@/contexts/filter';
import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { getHouseContext } from '@/contexts/getHouse';
import { mobileContolPanelContext } from '@/contexts/mobileControlPanel';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode, useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import { TbWorld } from 'react-icons/tb';
import ButtonAccount from '../buttonAccount/ButtonAccount';
// import Image from 'next/image';
import { selectPopoverContext } from '@/contexts';
import { userAccContext } from '@/contexts/userAcc';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
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

  const { t } = useTranslation(['common']);


  const router = useRouter();
  return (
    <>
      <div className="w-full h-[5rem]"></div>
      <div className="w-full h-[5rem]  bg-white z-30 fixed top-0" id="header-root">
        <header
          className="w-full h-[5rem] border-b-2 flex justify-center px-[5rem]
      tablet:hidden mobile:hidden
      box-border absolute"
        >
          <div className="w-full h-full flex relative">
            {/* logo container */}
            <Link
              href={'/homepage'}
              onClick={() => {
                setIsShowHeader(false);
                setIsFilter('main');
                resetFilterForm();
              }}
              className="desktop:flex-1 laptop:mr-7  flex items-center text-red-500
            z-30
            "
            >
              <img src="/icon.png" alt="" width={50} height={50} />
              <div className="text-[2rem] w-0 overflow-hidden desktop:w-fit font-semibold">
                {/* Olympus */}

                {t('teamName')}

              </div>
            </Link>

            {children}

            {/* controlbar */}
            <div className="flex-1 flex items-center justify-end z-30">
              {/* Olympus your home */}
              <div
                onClick={() => {
                  if (user.UserId !== 'none user') {
                    router.push('/hosting', undefined, { shallow: true });
                    return;
                  }
                  setIsLoginClick(true);
                }}
                className="rounded-full bg-white h-fit box-content px-4 py-2
            hover:bg-slate-300 tablet:hidden mobile:hidden cursor-pointer"
              >
                <span className="font-semibold">Olympus your home</span>
              </div>
              {/* translate */}
              <Link
                href={''}
                className="rounded-full bg-white box-content p-1 mr-3 hover:bg-slate-300"
              >
                <TbWorld className="w-[2rem] h-[2rem]" />
              </Link>
              <ButtonAccount />
            </div>
          </div>
        </header>
        <header
          className="w-full h-fit desktop:hidden laptop:hidden  box-border py-5 tablet:px-[5rem]
      mobile:px-[1rem] mobile:relative tablet:relative
      "
        >
          <motion.div
            className="w-full h-full shadow-xl rounded-full box-border px-4 py-2 flex cursor-pointer"
            onClick={(event) => setIsShow(true)}
          >
            <FiSearch className="h-full text-[2rem] m-auto" />
            <div className="h-full w-fit flex flex-col ml-5 box-border">
              <span className="font-semibold">Anywhere</span>
              <span className="text-[1rem]">Anyweek & Addguests</span>
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
    </>
  );
};
export default HeaderForm;
