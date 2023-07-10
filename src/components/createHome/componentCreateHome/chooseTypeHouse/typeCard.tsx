import { createHouseFormContext } from '@/contexts/createHouseForm';
import { StepCreateHomeContext } from '@/contexts/stepCreate';
import { motion } from 'framer-motion';
import { ReactNode, useContext, useEffect } from 'react';
import { TbKey } from 'react-icons/tb';
interface TypeCardProps {
  children: ReactNode;
  title: string;
}

const TypeCard = ({ children, title }: TypeCardProps) => {
  const { typeHouseId, setTypeHouseId } = useContext(createHouseFormContext)
  const { setStepCreate } = useContext(StepCreateHomeContext)

  const handleOnClick = (event: any) => {
    const updatedTypeHouseId = [...typeHouseId];
    // Kiểm tra xem item.title đã tồn tại trong mảng hay chưa
    if (title === 'House For Rent') {
      const index = updatedTypeHouseId.indexOf('4');
      updatedTypeHouseId.splice(index, 1); // Loại bỏ phần tử nếu đã tồn tại
      updatedTypeHouseId.push('5'); // Thêm phần tử nếu chưa tồn tại
    } else {
      const index = updatedTypeHouseId.indexOf('5');
      updatedTypeHouseId.splice(index, 1); // Loại bỏ phần tử nếu đã tồn tại
      updatedTypeHouseId.push('4'); // Thêm phần tử nếu chưa tồn tại
    }

    // Cập nhật giá trị mới của typeHouseId
    setTypeHouseId(updatedTypeHouseId);
    setStepCreate(2);
  }

  return (
    <div className="w-full h-fit flex ">
      <div
        onClick={handleOnClick}
        className="w-[60%] h-[25rem] m-auto bg-emerald-400 flex rounded-2xl text-center
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