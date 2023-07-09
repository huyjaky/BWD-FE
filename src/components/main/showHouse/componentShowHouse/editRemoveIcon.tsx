import { selectHouseContext } from '@/contexts/selectHouse';
import { house_ } from '@/models/house';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { BsListNested } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';

interface EditRemoveIconProps {
  isEdit: boolean | null;
  item: house_;
  setIsEdit: Dispatch<SetStateAction<boolean>> | null;
  isRemoveReq: boolean | undefined;
  setIsRemoveReq: Dispatch<SetStateAction<boolean | undefined>>
}

const EditRemoveIcon = ({ isEdit, setIsEdit, item, isRemoveReq, setIsRemoveReq }: EditRemoveIconProps) => {
  const { selectHouse, setSelectHouse } = useContext(selectHouseContext)


  return (
    <>
      <div className="w-0 relative">
        <motion.div className="w-[3rem] h-[4rem] top-0 left-0 absolute z-20 flex " >
          <button
            onClick={(event) => {
              if (setIsEdit && isEdit != null) {
                setIsEdit(!isEdit)
              }
              setSelectHouse({ ...selectHouse, ...item });
            }}
            className='w-fit h-fit m-auto'>
            <BsListNested className="w-[2.4rem] h-[2.4rem] text-blue-600 " />
          </button>
        </motion.div>

        <motion.div className="w-[3rem] h-[4rem] top-0 left-[3rem] absolute z-20 flex " >
          <button
            onClick={()=>{setIsRemoveReq(true)}}
           className='w-fit h-fit m-auto'>
            <RiDeleteBin5Line className="w-[2.4rem] h-[2.4rem] text-red-500 " />
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default EditRemoveIcon;
