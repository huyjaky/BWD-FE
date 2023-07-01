import { motion } from 'framer-motion';
import { BsListNested } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';

const EditRemoveIcon = () => {
  return (
    <div className="w-0 relative">
      <motion.div
        className="w-[50px] h-[60px] top-0 left-0
                        absolute z-20 flex
                        "
      >
        <BsListNested
          className="w-[40px] h-[40px] m-auto
                          text-blue-600
                          "
        />
      </motion.div>

      <motion.div
        className="w-[50px] h-[60px] top-0 left-[50px]
                        absolute z-20 flex
                        "
      >
        <RiDeleteBin5Line
          className="w-[40px] h-[40px] m-auto
                          text-red-500
                          "
        />
      </motion.div>
    </div>
  );
};

export default EditRemoveIcon;