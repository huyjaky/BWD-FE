import SkeletonShowHouse from '@/components/skeletonLoading/skletonShowHouse';
import { getHouseContext } from '@/contexts/getHouse';
import { house_ } from '@/models/house';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useContext, useEffect } from 'react';
import Carousel from './carousel';

const variants: Variants = {
  hiddenLoading: {
    opacity: 0,
    transitionEnd: {
      display: 'none'
    }
  },
  showLoading: {
    visibility: 'visible',
    opacity: 1
  }
};





const ShowHouse = () => {
  const arrTempLoading: number[] = Array.from({ length: 13 }, (_, index) => index);

  const { house, setHouse, isLoading, setIsLoading } = useContext(getHouseContext);
  useEffect(() => {
    setIsLoading(false);
  }, [house]);
  return (
    <div>
      <motion.div className="w-full h-fit">
        <motion.div className="w-full h-fit grid grid-cols-houseBox gap-x-5 gap-y-8 ">
          {house?.map((item: house_, index: number) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0,  display: 'none' }}
                animate={{ opacity: 1, display: 'block'}}
                transition={{ delay: (index + 1) * 0.3 }}
                className="w-full h-[400px] ">
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

          {arrTempLoading.map((item: number, index: number) => {
            return (
              <motion.div
                variants={variants}
                animate={isLoading ? 'showLoading' : 'hiddenLoading'}
                transition={{ delay: (index + 1) * 0.3 }}
                key={index}>
                <SkeletonShowHouse />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};
export default ShowHouse;
