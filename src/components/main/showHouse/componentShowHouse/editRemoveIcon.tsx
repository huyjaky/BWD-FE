import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import { BsListNested } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';

interface EditRemoveIconProps {
  isEdit: boolean | null;
  setIsEdit: Dispatch<SetStateAction<boolean>> | null;
}

const EditRemoveIcon = ({isEdit, setIsEdit}: EditRemoveIconProps) => {

  return (
    <>

      <div className="w-0 relative">
        <motion.div className="w-[50px] h-[60px] top-0 left-0 absolute z-20 flex " >
          <button
          onClick={(event)=>{if (setIsEdit && isEdit != null) {setIsEdit(!isEdit)}}}
           className='w-fit h-fit m-auto'>
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
