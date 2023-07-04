import { motion } from 'framer-motion';
import { useState } from 'react';
import { BsListNested } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';

const EditRemoveIcon = () => {
  const [isEdit, setIsEdit] = useState();

  return (
    <>
      {/* edit */}
      <div className='fixed w-screen h-screen bg-[rgba(105,105,105,0.05)] flex top-0 left-0'>
        <div className='w-[800px] h-[calc(100vh-50px)] bg-white m-auto rounded-3xl
        overflow-hidden flex flex-col
        mobile:mt-0 mobile:rounded-none
        mobile:w-screen mobile:h-[calc(100vh-70px)]
        tablet:h-[calc(100vh-90px)] tablet:mt-[10px] z-40 '>
          <div className='w-full h-full relative'>
            <div className='w-full absolute h-[]'>

            </div>
          </div>
        </div>
      </div>

      <div className="w-0 relative">
        <motion.div className="w-[50px] h-[60px] top-0 left-0 absolute z-20 flex " >
          <button className='w-fit h-fit m-auto'>
            <BsListNested className="w-[40px] h-[40px] text-blue-600 " />
          </button>
        </motion.div>

        <motion.div className="w-[50px] h-[60px] top-0 left-[50px] absolute z-20 flex " >
          <button className='w-fit h-fit m-auto'>
            <RiDeleteBin5Line className="w-[40px] h-[40px] text-red-500 " />
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default EditRemoveIcon;
