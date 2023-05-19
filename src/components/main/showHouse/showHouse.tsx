import { houseApi } from '@/api-client/houseApi';
import SkeletonShowHouse from '@/components/skeletonLoading/skletonShowHouse';
import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { getHouseContext } from '@/contexts/getHouse';
import { house_ } from '@/models/house';
import { Variants, motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Carousel from './carousel';

const variants: Variants = {
  show: {
    opacity: [0, 1]
  },
  hidden: {
    opacity: [1, 0],
    transition: {
      delay: 0.1
    },
    transitionEnd: {
      display: 'none'
    }
  }
};

const ShowHouse = () => {
  const arrTempLoading: number[] = Array.from({ length: 10 }, (_, index) => index);
  const { house, setHouse, isLoading, setIsLoading } = useContext(getHouseContext);
  const { isShow, setIsShow } = useContext(filterFormAnimateContext);
  const [hasMore, setHasMore] = useState(true);
  const [houseTemp, setHouseTemp] = useState<house_[]>([]);

  // cai nay lam truoc khi hoc framer motion nen khong dung framer ma dung
  // animation chay bang com
  const handleScroll = () => {
    const mask: HTMLElement | null = document.getElementById('mask');
    const scaleUp: HTMLElement | null = document.getElementById('scaleUp');

    const ControlHeader: HTMLElement | null = document.getElementById('ControlHeader');
    const link: HTMLElement | null = document.getElementById('link');
    const controlBar: HTMLElement | null = document.getElementById('controlBar');
    const where: HTMLElement | null = document.getElementById('where-popup');
    const checkIn_Out: HTMLElement | null = document.getElementById('checkin_out-popup');
    const who: HTMLElement | null = document.getElementById('who-popup');

    // -------------------------------------------------------------------
    if (isShow) {
      scaleUp?.classList.remove('animate-slideDownHeader');
      link?.classList.remove('animate-slideDownControl');
      ControlHeader?.classList.remove('animate-slideDownControl');
      mask?.classList.remove('animate-transparentAnimate');
      controlBar?.classList.remove('animate-showAnimate');

      where?.classList.remove('animate-transparentAnimate');
      checkIn_Out?.classList.remove('animate-transparentAnimate');
      who?.classList.remove('animate-transparentAnimate');
      // -------------------------------------------------------------------
      scaleUp?.classList.add('animate-slideUpHeader');
      link?.classList.add('animate-slideUpControl');
      ControlHeader?.classList.add('animate-slideUpControl');
      mask?.classList.add('animate-transparentAnimateReverse');
      controlBar?.classList.add('animate-hiddenAnimate');

      where?.classList.add('animate-transparentAnimateReverse');
      checkIn_Out?.classList.add('animate-transparentAnimateReverse');
      who?.classList.add('animate-transparentAnimateReverse');
      setIsShow(false);
    }
  };
  // bat su kien cho animation tren
  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
  }, [isShow]);

  // khi house duoc fetch lan dau pages/index
  useEffect(() => {
    setHouseTemp([...house]);
  }, [house]);

  const getMoreHouse = async () => {
    try {
      const moreHouse = await houseApi.noneAuthHouseApi(houseTemp.length / 10 + 1);
      if (Array.isArray(moreHouse.data) && moreHouse.data.length != 0) {
        setHouseTemp((prevHouse) => [...prevHouse, ...moreHouse.data]);
      } else {
        setHasMore(false); // cai nay de kiem tra xem da fetch het du lieu hay chua
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (houseTemp.length > 0 && isLoading == true) {
      console.log('check');
      setIsLoading(false);
    }
  }, [houseTemp]);

  useEffect(() => {}, [setIsLoading, hasMore]);

  return (
    <div>
      <motion.div className="w-full h-fit py-20 pb-28" id="scroll-inf">
        <InfiniteScroll
          dataLength={houseTemp.length}
          next={getMoreHouse}
          hasMore={hasMore}
          loader={
            <motion.div transition={{ delay: 0.3 }}>
              <SkeletonShowHouse />
            </motion.div>
          }
          className="w-full h-fit grid grid-cols-houseBox gap-x-5 gap-y-8"
          endMessage={<div></div>}>
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

          {isLoading &&
            arrTempLoading.map((item: number, index: number) => (
              <motion.div variants={variants} animate={isLoading ? 'show' : 'hidden'} key={index}>
                <SkeletonShowHouse />
              </motion.div>
            ))}
        </InfiniteScroll>
      </motion.div>
    </div>
  );
};

export default ShowHouse;
