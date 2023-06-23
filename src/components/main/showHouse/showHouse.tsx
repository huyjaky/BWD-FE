import { houseApi } from '@/api-client/houseApi';
import HostUser from '@/components/houseDetail/host/hostUser';
import SkeletonShowHouse from '@/components/skeletonLoading/skletonShowHouse';
import { filterContext } from '@/contexts/filter';
import { getHouseContext } from '@/contexts/getHouse';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { userAccContext } from '@/contexts/userAcc';
import { house_ } from '@/models/house';
import { userAcc } from '@/models/userAcc';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { MdOutlineNearbyError } from 'react-icons/md';
import { ImMap } from 'react-icons/im';
import InfiniteScroll from 'react-infinite-scroll-component';
import Carousel from './carousel';
import Heart from './heart';
import MapEach from './mapEach';
import { AmountTabHostingContext } from '@/contexts/amountTabHosting';
import Image from 'next/image';

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
  iconAnimateBg: {
    borderRadius: [
      '60% 40% 30% 70% / 60% 30% 70% 40%',
      '30% 60% 70% 40% / 50% 60% 30% 60%',
      '60% 40% 30% 70% / 60% 30% 70% 40%'
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
  },
  hoverItem: {
    scale: 1.03,
    boxShadow:
      'rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px',
    transition: {
      delay: 0,
      type: 'spring'
    }
  }
};

interface ShowHouseProps {
  infShow: 'noneAuthHouseApi' | 'noneAuthFilter' | 'authListHouse' | 'favoriteHouse';
  keyMapBing: string;
}

const ShowHouse = ({ infShow, keyMapBing }: ShowHouseProps) => {
  const arrTempLoading: number[] = Array.from({ length: 10 }, (_, index) => index);
  const { filterForm } = useContext(filterContext);
  const { address } = useContext(selectPlaceContext);
  const { setCurrentHosting } = useContext(AmountTabHostingContext);
  const { data: session, status } = useSession();
  const { user, setUser } = useContext(userAccContext);
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
    if (houseTemp.length != 0 || status === 'loading') return;
    const temp = await session?.userAcc;
    console.log(status, infShow);
    // neu user login thi userid se thay doi nen phai chia ra nhieu truong hop
    if (infShow === 'noneAuthHouseApi' && status === 'authenticated') {
      const arr = await houseApi['noneAuthHouseApi'](1, temp.UserId);
      if (arr.data.length == 0) {
        setHasMore(false); // neu nhu du lieu tra ve la khong co lan dau tien thi khong xuat hien nx
        return;
      }
      setHouseTemp(arr.data as house_[]);
    } else if (infShow === 'noneAuthHouseApi' && status === 'unauthenticated') {
      console.log('check un');
      const arr = await houseApi[infShow](1, '');
      if (arr.data.length == 0) {
        setHasMore(false); // neu nhu du lieu tra ve la khong co lan dau tien thi khong xuat hien nx
        return;
      }
      setHouseTemp(arr.data as house_[]);
    } else if (infShow === 'noneAuthFilter' && status === 'unauthenticated') {
      const arr = await houseApi[infShow]({ filter: filterForm, selectPlace: address }, 1, '');
      if (arr.data.length == 0) {
        setHasMore(false);
        return;
      }
      setHouseTemp(arr.data as house_[]);
    } else if (infShow === 'noneAuthFilter' && status === 'authenticated') {
      const arr = await houseApi[infShow](
        { filter: filterForm, selectPlace: address },
        1,
        temp.UserId
      );
      if (arr.data.length == 0) {
        setHasMore(false);
        return;
      }
      setHouseTemp(arr.data as house_[]);
    } else if (infShow === 'authListHouse' && status === 'authenticated') {
      const arr = await houseApi[infShow](temp.UserId);
      console.log('auth authlisthouse', arr);
      if (arr.data.length == 0) {
        setHasMore(false);
        return;
      }
      setHouseTemp(arr.data as house_[]);
    } else if (infShow === 'favoriteHouse' && status === 'authenticated') {
      const arr = await houseApi['authFavoriteList'](temp.UserId);
      if (arr.data?.length == 0) {
        setHasMore(false);
        return;
      }
      setHouseTemp(arr.data as house_[]);
    }
  };

  useEffect(() => {
    setHouseTemp([]);
    setHasMore(true);
    console.log('showhouse1');
  }, [infShow, isFilter, status]);

  useEffect(() => {
    fetchHouseApi();
  }, [houseTemp]);

  // get more house de lay them nha khi scroll xuoong cuoi cung https://www.npmjs.com/package/react-infinite-scroll-component
  const getMoreHouse = async () => {
    if (infShow === 'favoriteHouse' || infShow == 'authListHouse') {
      setHasMore(false);
      return;
    }
    try {
      if (infShow === 'noneAuthHouseApi') {
        console.log('get more house ');
        const moreHouse = await houseApi[infShow](houseTemp.length / 10 + 1, user.UserId);
        if (Array.isArray(moreHouse.data) && moreHouse.data.length != 0) {
          setHouseTemp((prevHouse) => [...prevHouse, ...moreHouse.data]);
        } else {
          setHasMore(false); // cai nay de kiem tra xem da fetch het du lieu hay chua
        }
      } else if (infShow === 'noneAuthFilter') {
        const moreHouse = await houseApi[infShow](
          { filter: filterForm, selectPlace: address },
          houseTemp.length / 10 + 1,
          user.UserId
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

  useEffect(() => {
    setCurrentHosting(houseTemp.length);
  }, [houseTemp, hasMore]);

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
              keyMapBing={keyMapBing}
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
          className="w-full h-fit grid grid-cols-houseBox gap-x-9 gap-y-8 px-7 py-8"
          endMessage={<div className='w-full h-[400px]'>
            <div className='m-auto flex'>
              <MdOutlineNearbyError className='w-[50px] h-[50px] text-center' />
              <span className='m-auto ml-0 text-[24px]'> No results invalid </span>
            </div>
          </div>}
        >
          {houseTemp.map((item: house_, index: number) => {
            return (
              <motion.div
                initial={{ opacity: 0, display: 'none' }}
                animate={{ opacity: 1, display: 'block' }}
                transition={{ type: 'tween', delay: index * 0.1 }}
                key={index}
              >
                <motion.div
                  // whileInView={{ x: [-10, 0] }}
                  variants={variants}
                  whileHover="hoverItem"
                  transition={{ type: 'spring' }}
                  className="w-full h-[400px] rounded-2xl box-border"
                >
                  <div className="w-full h-[300px] relative">
                    <Carousel arrImg={item.arrImg} houseId={item.HouseId} />

                    {/* heart */}
                    {infShow !== 'authListHouse' && (
                      <Heart HouseId={item.HouseId} IsFavorite={item.IsFavorite} />
                    )}

                    <div className='absolute left-2 top-2 z-10'>
                      <Image className='fill-white' width={50} height={50} src={'/x2click.svg'} alt='' />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      onClick={() => {
                        setIsOpenMaskMap(true);
                        setSelectLocale({
                          latitude: item.address.latitude,
                          longitude: item.address.longitude,
                          zoom: 18
                        });
                      }}
                      className={`absolute top-3 right-12 ${infShow === 'authListHouse' ? 'right-2' : ''
                        } text-red-500 text-[25px] z-10`}
                    >
                      <ImMap />
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        setSelectUser(item.useracc);
                        setIsOpenMask(true);
                      }}
                      className="absolute w-[60px] h-[60px] transition-all
                left-3 bottom-3 z-10 rounded-full overflow-hidden shadow-2xl
                "
                    >
                      {item.useracc.Image ? (
                        <img
                          src={'/api/img/path/' + item.useracc.Image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
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
              </motion.div>
            );
          })}

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
