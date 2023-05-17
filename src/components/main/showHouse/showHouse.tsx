import SkeletonShowHouse from '@/components/skeletonLoading/skletonShowHouse';
import { getHouseContext } from '@/contexts/getHouse';
import { motion } from 'framer-motion';
import { useContext, useEffect } from 'react';
import Carousel from './carousel';
import { house_ } from '@/models/house';
const ShowHouse = () => {
  const arrTempLoading:number[] = []
  for (let index = 0; index < 10; index++) {arrTempLoading.push(index)}
  const { house, setHouse } = useContext(getHouseContext);
  useEffect(() => {}, [house]);
  return (
    <div>
      <motion.div className="w-full h-fit">
        <motion.div className="w-full h-fit grid grid-cols-houseBox gap-x-5 gap-y-8 ">


          { house && house.length == 0 ?
            arrTempLoading.map((item:number, index:number)=>{
              return (
                <div key={index}>
                  <SkeletonShowHouse/>
                </div>
              )
            })
          :
          house?.map((item: house_, index: number) => {
            return (
              <motion.div key={index} className="w-full h-[400px] ">
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
                    <span className="font-semibold">&#36;{item.Price}</span> night
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
