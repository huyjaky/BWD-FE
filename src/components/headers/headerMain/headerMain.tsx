import Link from 'next/link';
import { FaAirbnb } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import { BsList } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
const HeaderMain = () => {
  return (
    <div className='w-full h-[80px] relative'>
      <header className="w-full h-[80px] border-b-2 flex justify-center px-[80px] box-border absolute">
        <div className="w-full h-full flex">
          {/* logo container */}
          <Link href={'/'} className="flex-1 flex items-center text-red-500">
            <FaAirbnb className="h-[50px] w-[50px] mr-1" />
            <span className="text-[30px] font-semibold">airbnb</span>
          </Link>

          {/* control plan */}
          <div className="w-[400px] box-border p-4">
            <div
              className="rounded-full w-full h-full box-border px-1 flex items-center
            border-2 border-slate-400 hover:shadow-lg transition-all duration-500
          ">
              <button className="flex-1">Anywhere</button>
              <button className="flex-1 border-x-2 border-slate-400">Any week</button>
              <button className="flex-1">Add guests</button>
              <button className="rounded-full w-[30px] h-[30px] bg-red-500 flex">
                <BiSearch className="w-[20px] h-[20px] m-auto text-white" />
              </button>
            </div>
          </div>

          {/* controlbar */}
          <div className="flex-1 flex items-center justify-end">
            {/* airbnb your home */}
            <Link
              href={''}
              className="rounded-full bg-white h-fit box-content px-4 py-2
            hover:bg-slate-300
          ">
              <span className="font-semibold">Airbnb your home</span>
            </Link>
            {/* translate */}
            <Link
              href={''}
              className="rounded-full bg-white box-content p-1 mr-3 hover:bg-slate-300">
              <TbWorld className="w-[30px] h-[30px]" />
            </Link>
            {/* control */}
            <div
              className="w-fit p-1 rounded-full bg-white flex border-2 border-gray-400 hover:shadow-lg
            transition-all duration-500
          ">
              <BsList className="w-[30px] h-[30px]" />
              <HiUserCircle className="w-[40px] h-[30px]" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderMain;
