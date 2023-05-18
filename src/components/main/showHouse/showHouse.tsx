import { houseApi } from '@/api-client/houseApi';
import SkeletonShowHouse from '@/components/skeletonLoading/skletonShowHouse';
import { getHouseContext } from '@/contexts/getHouse';
import { house_ } from '@/models/house';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Carousel from './carousel';
import { array } from 'yup';

const ShowHouse = () => {
  const arrTempLoading: number[] = Array.from({ length: 10 }, (_, index) => index);
  const { house, setHouse, isLoading, setIsLoading } = useContext(getHouseContext);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [houseTemp, setHouseTemp] = useState<house_[]>([]);

  useEffect(() => {
    setHouseTemp([...house]);
  }, [house]);

  const getMoreHouse = async () => {
    try {
      const moreHouse = await houseApi.noneAuthHouseApi(houseTemp.length/10 + 1);
      if (Array.isArray(moreHouse.data) && moreHouse.data.length != 0) {
        setHouseTemp((prevHouse) => [...prevHouse, ...moreHouse.data]);
      } else {
        console.log('has more');
        setHasMore(false)
      }

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{}, [hasMore])

  useEffect(() => {
    console.log(houseTemp);
    setIsLoading(false);
  }, [houseTemp, setIsLoading]);

  return (
    <div>
      <motion.div className="w-full h-fit py-20" id='scroll-inf'>
        <InfiniteScroll
          dataLength={houseTemp.length}
          next={getMoreHouse}
          hasMore={hasMore}
          loader={
            <motion.div
              transition={{ delay: 0.1 }}
              >
              <SkeletonShowHouse />
            </motion.div>
          }
          className="w-full h-fit grid grid-cols-houseBox gap-x-5 gap-y-8"
          endMessage={<span>Nothing more to show</span>}>
          {houseTemp.map((item: house_, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, display: 'none' }}
              animate={{ opacity: 1, display: 'block' }}
              transition={{ delay: (index + 1) * 0.1 }}
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
          ))}

          {arrTempLoading.map((item: number, index: number) => (
            <motion.div
              initial={!isLoading ? { opacity: 1, display: 'block' } : {}}
              animate={!isLoading ? { opacity: 0, display: 'none' } : {}}
              transition={{ delay: (index + 1) * 0.1 }}
              key={index}>
              <SkeletonShowHouse />
            </motion.div>
          ))}
        </InfiniteScroll>
      </motion.div>
    </div>
  );
};

export default ShowHouse;
