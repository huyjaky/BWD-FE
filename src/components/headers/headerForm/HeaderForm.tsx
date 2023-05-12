import Link from 'next/link';
import { ReactNode } from 'react';
import { FaAirbnb } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import ButtonAccount from '../buttonAccount/ButtonAccount';

interface HeaderFormProps {
  children: ReactNode;
}

const HeaderForm = ({ children }: HeaderFormProps) => {
  return (
    <div className="w-full h-[80px] relative bg-white">
      <header className="w-full h-[80px] border-b-2 flex justify-center px-[80px] box-border absolute">
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
    </div>
  );
};
export default HeaderForm;
