import { houseApi } from '@/api-client/houseApi';
import HostUser from '@/components/houseDetail/host/hostUser';
import SkeletonShowHouse from '@/components/skeletonLoading/skletonShowHouse';
import { AmountTabHostingContext } from '@/contexts/amountTabHosting';
import { filterContext } from '@/contexts/filter';
import { getHouseContext } from '@/contexts/getHouse';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { userAccContext } from '@/contexts/userAcc';
import { house_ } from '@/models/house';
import { userAcc } from '@/models/userAcc';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { ImMap } from 'react-icons/im';
import InfiniteScroll from 'react-infinite-scroll-component';
import Carousel from './carousel';
import EditRemoveIcon from './componentShowHouse/editRemoveIcon';
import EndMessage from './componentShowHouse/endMessage';
import Heart from './heart';
import MapEach from './mapEach';
import { variants } from './variantsShowHouse';
import HouseCard from './componentShowHouse/houseCard';

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
  const [isHover, setIsHover] = useState<{
    ishover: boolean;
    id: number;
  }>({ ishover: false, id: -1 });
  const [selectLocale, setSelectLocale] = useState<{
    longitude: number;
    latitude: number;
    zoom: number;
  }>();
  const [isOpenMaskMap, setIsOpenMaskMap] = useState(false);

  // thuc hien hanh dong khi kiem tra xem arr co ton tai hay khong
  const isEmpty = (arr: any) => {
    if (arr.data.length == 0) {
      setHasMore(false); // neu nhu du lieu tra ve la khong co lan dau tien thi khong xuat hien nx
      return;
    }
    setHouseTemp(arr.data as house_[]);
  };

  const fetchHouseApi = async () => {
    if (houseTemp.length != 0 || status === 'loading') return;
    const temp = await session?.userAcc;
    // neu user login thi userid se thay doi nen phai chia ra nhieu truong hop
    if (infShow === 'noneAuthHouseApi' && status === 'authenticated') {
      const arr = await houseApi['noneAuthHouseApi'](1, temp.UserId);
      return isEmpty(arr);
    } else if (infShow === 'noneAuthHouseApi' && status === 'unauthenticated') {
      const arr = await houseApi[infShow](1, '');
      return isEmpty(arr);
    } else if (infShow === 'noneAuthFilter' && status === 'unauthenticated') {
      const arr = await houseApi[infShow]({ filter: filterForm, selectPlace: address }, 1, '');
      return isEmpty(arr);
    } else if (infShow === 'noneAuthFilter' && status === 'authenticated') {
      const arr = await houseApi[infShow](
        { filter: filterForm, selectPlace: address },
        1,
        temp.UserId
      );
      return isEmpty(arr);
    } else if (infShow === 'authListHouse' && status === 'authenticated') {
      const arr = await houseApi[infShow](temp.UserId);
      return isEmpty(arr);
    } else if (infShow === 'favoriteHouse' && status === 'authenticated') {
      const arr = await houseApi['authFavoriteList'](temp.UserId);
      return isEmpty(arr);
    }
  };

  useEffect(() => {
    setHouseTemp([]);
    setHasMore(true);
  }, [infShow, isFilter, status]);

  useEffect(() => {
    fetchHouseApi();
  }, [houseTemp]);

  const isExist = (moreHouse: any) => {
    if (Array.isArray(moreHouse.data) && moreHouse.data.length != 0) {
      setHouseTemp((prevHouse) => [...prevHouse, ...moreHouse.data]);
    } else {
      setHasMore(false); // cai nay de kiem tra xem da fetch het du lieu hay chua
    }
  };

  const getMoreHouse = async () => {
    if (infShow === 'favoriteHouse' || infShow == 'authListHouse') {
      setHasMore(false);
      return;
    }
    try {

      // get more house de lay them nha khi scroll xuoong cuoi cung https://www.npmjs.com/package/react-infinite-scroll-component
      // noi get more them du lieu khi dung infinite
      if (infShow === 'noneAuthHouseApi') {
        const moreHouse = await houseApi[infShow](houseTemp.length / 10 + 1, user.UserId);
        isExist(moreHouse);
      } else if (infShow === 'noneAuthFilter') {
        const moreHouse = await houseApi[infShow]( { filter: filterForm, selectPlace: address }, houseTemp.length / 10 + 1, user.UserId);
        isExist(moreHouse);
      }

    } catch (error) {
      console.log(error);
      return;
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

      <motion.div className="w-full h-fit py-4 pb-28" id="scroll-inf">
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
          endMessage={<EndMessage />}
        >
          {houseTemp.map((item: house_, index: number) => {
            return (
              <HouseCard index={index} isHover={isHover}
              infShow={infShow} item={item} setIsHover={setIsHover}
              setIsOpenMask={setIsOpenMask} setIsOpenMaskMap={setIsOpenMaskMap}
              setSelectLocale={setSelectLocale} setSelectUser={setSelectUser}/>
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
