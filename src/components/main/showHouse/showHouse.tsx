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
        <motion.div className="w-full grid grid-cols-houseBox h-fit">
          {house.map((item: house_, index: number) => {
            return (
              <motion.div key={index} className="w-[300px] h-[400px] ">
                <div className="w-full h-[300px]">
                  <Carousel arrImg={item.arrImg} />
                </div>
                <div className="h-[100px] w-full box-border p-4">
                  <div className="w-full h-fit flex font-semibold">
                    <div className="flex-[2]">
                      <span>
                        {item.address.adminDistrict2}, {item.address.countryRegion}
                      </span>
                    </div>
                    <div className="flex-1 flex justify-end">star</div>
                  </div>
                  <div className="w-full h-fit mt-1">{item.useracc.UserName}</div>
                  <div className="w-full h-fit mt-1 ">
                    <span className='font-semibold'>&#36;{item.Price}</span> night
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};
export default ShowHouse;
