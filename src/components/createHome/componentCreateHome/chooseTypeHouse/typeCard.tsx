import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { TbKey } from 'react-icons/tb';
interface TypeCardProps {
  children: ReactNode;
  title: string;
}

const TypeCard = ({ children, title }: TypeCardProps) => {
  return (
    <div className="w-full h-fit flex ">
      <div className="w-[60%] h-[25rem] m-auto bg-emerald-400 flex rounded-2xl text-center
      flex-col">
        <motion.div
          className='m-auto rounded-full p-5 text-[15rem]' >
          {children}
        </motion.div>
        <div className='text-[25px] box-border py-4'>
          {title}
        </div>
      </div>
    </div>
  )
}

export default TypeCard;