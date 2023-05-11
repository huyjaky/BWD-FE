import { imgPathContext } from '@/contexts/imgPath';
import { useContext, useEffect } from 'react';
import { Tropical } from '../../../Icon_BnB_svg';


const TypeHouse = () => {
  const { imgPath } = useContext(imgPathContext);

  useEffect(() => {
    // Thực hiện các xử lý liên quan đến imgPath (nếu cần)
  }, [imgPath]);

  return (
    <div className="w-full h-full overflow-scroll flex">
   
    </div>
  );
};

export default TypeHouse;


