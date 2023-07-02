import Link from 'next/link';
import { TbWorld } from 'react-icons/tb';
import { BsList } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';

const HeaderLogin = () => {
  return (
    <header className="w-full h-[80px] border-b-2 flex justify-center">
      <div className="w-[1300px] h-full flex px-10 mobile:hidden">
        {/* logo container */}
        <div className="flex-1 flex items-center text-red-500">
          <span className="text-[30px] font-semibold tablet:hidden">Olympus</span>
        </div>

        {/* controlbar */}
        <div className="flex-1 flex items-center justify-end">
          {/* Olympus your home */}
          <Link
            href={''}
            className="rounded-full bg-white h-fit box-content px-4 py-2
            hover:bg-slate-300
          "
          >
            <span className="font-semibold">Olympus your home</span>
          </Link>
          {/* translate */}
          <Link href={''} className="rounded-full bg-white box-content p-1 mr-3 hover:bg-slate-300">
            <TbWorld className="w-[30px] h-[30px]" />
          </Link>
          {/* control */}
          <div className="w-fit p-1 rounded-full bg-white flex border-2 border-gray-400 ">
            <BsList className="w-[30px] h-[30px]" />
            <HiUserCircle className="w-[40px] h-[30px]" />
          </div>
        </div>
      </div>
      <div className="hidden mobile:flex">
        <span className="text-[25px] font-semibold m-auto">Log in or Sign up</span>
      </div>
    </header>
  );
};

export default HeaderLogin;
