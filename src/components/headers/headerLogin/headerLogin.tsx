import Link from 'next/link';
import { TbWorld } from 'react-icons/tb';
import { BsList } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';

const HeaderLogin = () => {
  return (
    <header className="w-full h-[5rem] border-b-2 flex justify-center">
      <div className="w-[81.25rem] h-full flex px-10 mobile:hidden">
        {/* logo container */}
        <div className="flex-1 flex items-center text-red-500">
          <span className="text-[2rem] font-semibold tablet:hidden">Candy</span>
        </div>

        {/* controlbar */}
        <div className="flex-1 flex items-center justify-end">
          {/* Candy your home */}
          <Link
            href={''}
            className="rounded-full bg-white h-fit box-content px-4 py-2
            hover:bg-slate-300
          "
          >
            <span className="font-semibold">Candy your home</span>
          </Link>
          {/* translate */}
          <Link href={''} className="rounded-full bg-white box-content p-1 mr-3 hover:bg-slate-300">
            <TbWorld className="w-[2rem] h-[2rem]" />
          </Link>
          {/* control */}
          <div className="w-fit p-1 rounded-full bg-white flex border-2 border-gray-400 ">
            <BsList className="w-[2rem] h-[2rem]" />
            <HiUserCircle className="w-[2.4rem] h-[2rem]" />
          </div>
        </div>
      </div>
      <div className="hidden mobile:flex">
        <span className="text-[2rem] font-semibold m-auto">Log in or Sign up</span>
      </div>
    </header>
  );
};

export default HeaderLogin;
