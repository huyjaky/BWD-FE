import { houseApi } from '@/api-client/houseApi';
import HostUser from '@/components/houseDetail/host/hostUser';
import SkeletonShowHouse from '@/components/skeletonLoading/skletonShowHouse';
import { filterContext } from '@/contexts/filter';
import { getHouseContext } from '@/contexts/getHouse';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { house_ } from '@/models/house';
import { userAcc } from '@/models/userAcc';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import Link from 'next/link';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { ImMap } from 'react-icons/im';
import InfiniteScroll from 'react-infinite-scroll-component';
import Carousel from './carousel';
import Heart from './heart';
import MapEach from './mapEach';
import { userAccContext } from '@/contexts/userAcc';
import { useSession } from 'next-auth/react';

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
  },
  iconAnimate: {
    borderRadius: [
      '50% 50% 20% 80% / 25% 80% 20% 75%',
      '67% 33% 47% 53% / 37% 20% 80% 63%',
      '39% 61% 47% 53% / 37% 40% 60% 63%',
      '39% 61% 82% 18% / 74% 40% 60% 26%',
      '50% 50% 53% 47% / 26% 22% 78% 74%',
      '50% 50% 20% 80% / 25% 80% 20% 75%',
      '30% 70% 70% 30% / 30% 52% 48% 70%',
      '20% 80% 20% 80% / 20% 80% 20% 80%'
    ],
    transition: {
      duration: 10,
      repeat: Infinity,
      type: 'tween'
    }
  },

  showMask: {
    display: 'flex',
    opacity: [0, 1]
  },
  hiddenMask: {
    opacity: [1, 0],
    transitionEnd: {
      display: 'none'
    }
  },

  showMaskMap: {
    visibility: 'visible',
    opacity: [0, 1]
  },
  hiddenMaskMap: {
    opacity: [1, 0],
    transitionEnd: {
      visibility: 'hidden'
    }
  }
};

interface ShowHouseProps {
  infShow: 'noneAuthHouseApi' | 'noneAuthFilter';
  keyMapBox: string;
}

const ShowHouse = ({ infShow, keyMapBox }: ShowHouseProps) => {
  const arrTempLoading: number[] = Array.from({ length: 10 }, (_, index) => index);
  const { filterForm } = useContext(filterContext);
  const { address } = useContext(selectPlaceContext);
  const {user, setUser} = useContext(userAccContext);
  const { isFilter } = useContext(getHouseContext);
  const [hasMore, setHasMore] = useState(true);
  const [houseTemp, setHouseTemp] = useState<house_[]>([]);
  const maskUser = useRef<HTMLInputElement>(null);
  const maskMap = useRef<HTMLInputElement>(null);
  const [isOpenMask, setIsOpenMask] = useState(false);
  const [selectUser, setSelectUser] = useState<userAcc>();
  const [selectLocale, setSelectLocale] = useState<{
    longitude: number;
    latitude: number;
    zoom: number;
  }>();
  const [isOpenMaskMap, setIsOpenMaskMap] = useState(false);

  const fetchHouseApi = async () => {
    if (houseTemp.length != 0 || !user.UserId) return;
    if (infShow === 'noneAuthHouseApi') {
      const arr = await houseApi[infShow](1, user.UserId);
      if (arr.data.length == 0) {
        setHasMore(false); // neu nhu du lieu tra ve la khong co lan dau tien thi khong xuat hien nx
        return;
      }
      setHouseTemp(arr.data as house_[]);
    } else if (infShow === 'noneAuthFilter') {
      const arr = await houseApi[infShow]({ filter: filterForm, selectPlace: address }, 1);
      if (arr.data.length == 0) {
        setHasMore(false);
        return;
      }
      setHouseTemp(arr.data as house_[]);
    }
  };
  useEffect(() => {
    fetchHouseApi();
  }, [houseTemp, user]);

  // get more house de lay them nha khi scroll xuoong cuoi cung https://www.npmjs.com/package/react-infinite-scroll-component
  const getMoreHouse = async () => {
    try {
      if (infShow === 'noneAuthHouseApi') {
        const moreHouse = await houseApi[infShow](houseTemp.length / 10 + 1, user.UserId);
        if (Array.isArray(moreHouse.data) && moreHouse.data.length != 0) {
          setHouseTemp((prevHouse) => [...prevHouse, ...moreHouse.data]);
        } else {
          setHasMore(false); // cai nay de kiem tra xem da fetch het du lieu hay chua
        }
      } else if (infShow === 'noneAuthFilter') {
        const moreHouse = await houseApi[infShow](
          { filter: filterForm, selectPlace: address },
          houseTemp.length / 10 + 1
        );
        if (Array.isArray(moreHouse.data) && moreHouse.data.length != 0) {
          setHouseTemp((prevHouse) => [...prevHouse, ...moreHouse.data]);
        } else {
          setHasMore(false); // cai nay de kiem tra xem da fetch het du lieu hay chua
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [houseTemp, hasMore]);

  useEffect(() => {
    setHouseTemp([]);
    setHasMore(true);
  }, [infShow, isFilter]);

  const handleOnClickOutSideMaskUser = (event: any) => {
    const isClickInSide = maskUser.current?.contains(event.target);
    if (!isClickInSide) {
      setIsOpenMask(false);
      return;
    } else {
      return;
    }
  };

  const handleOnClickOutSideMaskMap = (event: any) => {
    const isClickInSide = maskMap.current?.contains(event.target);
    console.log(isClickInSide);
    if (!isClickInSide) {
      setIsOpenMaskMap(false);
      return;
    } else {
      return;
    }
  };

  return (
    <div>
      <AnimatePresence initial={false}>
        <motion.div
          variants={variants}
          animate={isOpenMask ? 'showMask' : 'hiddenMask'}
          onClick={handleOnClickOutSideMaskUser}
          className="fixed w-screen h-screen bg-mask z-50 top-0 left-0 "
        >
          <motion.div
            className="w-fit h-fit bg-[#f0efe9] p-7 m-auto mt-[10%] rounded-2xl"
            ref={maskUser}
          >
            <HostUser
              imgPath={selectUser?.Image}
              gmail={selectUser?.Gmail}
              userName={selectUser?.UserName}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        <motion.div
          variants={variants}
          animate={isOpenMaskMap ? 'showMaskMap' : 'hiddenMaskMap'}
          onClick={handleOnClickOutSideMaskMap}
          className="fixed w-screen h-screen bg-mask z-50 top-0 left-0 flex "
        >
          <div ref={maskMap} className="w-[50%] h-fit bg-[#f0efe9] p-7 m-auto rounded-2xl">
            <MapEach
              longitude={selectLocale?.longitude ? selectLocale.longitude : 1}
              latitude={selectLocale?.latitude ? selectLocale?.latitude : 1}
              zoom={selectLocale?.zoom ? selectLocale.zoom : 15}
              keyMapBox={keyMapBox}
            />
          </div>
        </motion.div>
      </AnimatePresence>

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
          style={{ overflow: 'hidden' }}
          className="w-full h-fit grid grid-cols-houseBox gap-x-5 gap-y-8 "
          endMessage={<div>No more values</div>}
        >
          {houseTemp.map((item: house_, index: number) => (
            <motion.div
              key={index}
              whileInView={{ y: [20, 0] }}
              initial={{ opacity: 0, display: 'none' }}
              animate={{ opacity: 1, display: 'block' }}
              transition={{ delay: index * 0.1 }}
              className="w-full h-[400px] "
            >
              <div className="w-full h-[300px] relative">
                <Carousel arrImg={item.arrImg} houseId={item.HouseId} />

                {/* heart */}
                <Heart HouseId={item.HouseId} IsFavorite={item.IsFavorite}/>

                <motion.button
                  whileHover={{ scale: 1.2 }}
                  onClick={() => {
                    setIsOpenMaskMap(true);
                    setSelectLocale({
                      latitude: item.address.latitude,
                      longitude: item.address.longitude,
                      zoom: 15
                    });
                  }}
                  className="absolute top-3 right-12 text-red-500 text-[25px] z-10"
                >
                  <ImMap />
                </motion.button>

                <motion.button
                  variants={variants}
                  onClick={() => {
                    setSelectUser(item.useracc);
                    setIsOpenMask(true);
                  }}
                  animate="iconAnimate"
                  className="absolute w-[60px] h-[60px]
                left-3 bottom-3 z-10 rounded-full overflow-hidden
                "
                >
                  {item.useracc.Image ? (
                    <img src={item.useracc.Image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <HiUserCircle className="w-full h-full" />
                  )}
                </motion.button>
              </div>
              <Link href={`/house/${item.HouseId}`}>
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
              </Link>
            </motion.div>
          ))}

          {houseTemp.length == 0 &&
            hasMore == true &&
            arrTempLoading.map((item: number, index: number) => (
              <motion.div
                variants={variants}
                animate={houseTemp.length == 0 ? 'show' : 'hidden'}
                key={index}
              >
                <SkeletonShowHouse />
              </motion.div>
            ))}
        </InfiniteScroll>
      </motion.div>
    </div>
  );
};

export default ShowHouse;
