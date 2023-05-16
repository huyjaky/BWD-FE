import { getHouseContext } from '@/contexts/getHouse';
import { house_ } from '@/models/house';
import { motion } from 'framer-motion';
import { useContext, useEffect } from 'react';
import Carousel from './carousel';
const ShowHouse = () => {
  const { house, setHouse } = useContext(getHouseContext);
  useEffect(() => {}, [house]);
  return (
    <div>
      <motion.div className="w-full h-fit">
        <motion.div className='w-full grid grid-cols-houseBox h-fit'>
          {house.map((item: house_, index: number) => {
            return <motion.div key={index} className='w-[300px] h-[400px]'>
              <div className='w-full h-[400px] bg-slate-500'>
                <Carousel arrImg={item.arrImg}/>
              </div>
              <div className='h-auto w-full bg-emerald-300'>

              </div>
            </motion.div>;
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};
export default ShowHouse;
