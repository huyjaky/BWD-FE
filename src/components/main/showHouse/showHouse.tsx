import { houseApi } from '@/api-client/houseApi';
import SkeletonShowHouse from '@/components/skeletonLoading/skletonShowHouse';
import { selectPopoverContext } from '@/contexts';
import { filterContext } from '@/contexts/filter';
import { getHouseContext } from '@/contexts/getHouse';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { userAccContext } from '@/contexts/userAcc';
import { house_ } from '@/models/house';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import InfiniteScroll from 'react-infinite-scroll-component';
import Carousel from './carousel';
import { HiUserCircle } from 'react-icons/hi';
import HostUser from '@/components/houseDetail/host/hostUser';
import { userAcc } from '@/models/userAcc';
import { ImMap } from 'react-icons/im';

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
      '20% 80% 20% 80% / 20% 80% 20% 80%',
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
};

interface ShowHouseProps {
  infShow: 'noneAuthHouseApi' | 'noneAuthFilter';
}

const ShowHouse = ({ infShow }: ShowHouseProps) => {
  const arrTempLoading: number[] = Array.from({ length: 10 }, (_, index) => index);
  const { setIsLoginClick } = useContext(selectPopoverContext);
  const { filterForm } = useContext(filterContext);
  const { user } = useContext(userAccContext);
  const { address } = useContext(selectPlaceContext);
  const { isFilter } = useContext(getHouseContext);
  const [hasMore, setHasMore] = useState(true);
  const [houseTemp, setHouseTemp] = useState<house_[]>([]);
  const maskUser = useRef<HTMLInputElement>(null);
  const [isOpenMask, setIsOpenMask] = useState(false);
  const [selectUser, setSelectUser] = useState<userAcc>();

  const fetchHouseApi = async () => {
    if (houseTemp.length != 0) return;
    if (infShow === 'noneAuthHouseApi') {
      const arr = await houseApi[infShow](1);
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
  }, []);

  // get more house de lay them nha khi scroll xuoong cuoi cung https://www.npmjs.com/package/react-infinite-scroll-component
  const getMoreHouse = async () => {
    try {
      if (infShow === 'noneAuthHouseApi') {
        const moreHouse = await houseApi[infShow](houseTemp.length / 10 + 1);
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

  useEffect(() => { }, [houseTemp, hasMore]);

  useEffect(() => {
    setHouseTemp([]);
    setHasMore(true);
  }, [infShow, isFilter]);

  // them vao danh sach yeu thich
  const handleOnClickFavorite = async (event: any, HouseId: string) => {
    if (!user.UserId) {
      event.preventDefault();
      setIsLoginClick(true);
      return;
    }
    console.log('creaste');
    const addHouseFavorite = await houseApi.authFavoriteHouse(HouseId, user.UserId);
    if (addHouseFavorite.status != 200) {
      console.log('Have err ');
      return;
    } else {
      return;
    }
  };

  // bo khoai danh sahc yeu thich
  const handleOnClickUnFavorite = async (event: any, HouseId: string) => {
    const removeHouseFavorite = await houseApi.authUnFavoriteHouse(HouseId, user.UserId);
    console.log(removeHouseFavorite);
    if (removeHouseFavorite.status != 200) {
      console.log('Have err ');
      return;
    } else {
      return;
    }
  };

  const handleOnClickOutSide = (event: any) => {
    const isClickInSide = maskUser.current?.contains(event.target);
    if (!isClickInSide) {
      setIsOpenMask(false);
      return;
    } else {
      return;
    }
  }

  return (
    <div>
      <AnimatePresence initial={false}>

        <motion.div
          variants={variants}
          animate={isOpenMask ? 'showMask' : 'hiddenMask'}
          onClick={handleOnClickOutSide}
          className='fixed w-screen h-screen bg-mask z-50 top-0 left-0 '>
          <motion.div className='w-fit h-fit bg-[#f0efe9] p-7 m-auto mt-[10%] rounded-2xl'
            ref={maskUser}
          >
            <HostUser imgPath={selectUser?.Image} gmail={selectUser?.Gmail} userName={selectUser?.UserName} />
          </motion.div>
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
          endMessage={<div>No more values</div>}>
          {houseTemp.map((item: house_, index: number) => (
            <motion.div
              key={index}
              whileInView={{ y: [20, 0] }}
              initial={{ opacity: 0, display: 'none' }}
              animate={{ opacity: 1, display: 'block' }}
              transition={{ delay: index * 0.1 }}
              className="w-full h-[400px] ">
              <div className="w-full h-[300px] relative">
                <Carousel arrImg={item.arrImg} houseId={item.HouseId} />

                {/* heart */}
                <label
                  className="swap swap-flip text-[40px] z-10 absolute right-2 top-2
                  text-red-500 ">
                  <input
                    type="checkbox"
                    onClick={(event) => {
                      if (!user.UserId) {
                        event.preventDefault();
                        setIsLoginClick(true);
                        return;
                      }
                      if (event.currentTarget.checked) {
                        handleOnClickFavorite(event, item.HouseId)
                      } else {
                        handleOnClickUnFavorite(event, item.HouseId)
                      }
                    }}
                  />
                  <motion.div
                    whileTap={{ scale: [0.8, 1.3] }}
                    className="swap-on">
                    <AiFillHeart />
                  </motion.div>

                  <motion.div
                    whileTap={{ scale: [0.8, 1.3] }}
                    className="swap-off">
                    <AiOutlineHeart />
                  </motion.div>

                </label>

                <motion.button
                  variants={variants}
                  onClick={() => {
                    setSelectUser(item.useracc);
                    setIsOpenMask(true);
                  }}
                  animate='iconAnimate'
                  className='absolute w-[60px] h-[60px]
                left-3 bottom-3 z-20 rounded-full overflow-hidden
                '>
                  {item.useracc.Image ?
                    <img src={item.useracc.Image} alt="" className='' />
                    : <HiUserCircle />}
                </motion.button>

                <motion.button

                className='absolute top-3 right-16 text-red-500 text-[35px] z-10'>
                  <ImMap/>
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
