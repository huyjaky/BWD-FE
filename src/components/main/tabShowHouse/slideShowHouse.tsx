import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { EffectCoverflow, Navigation, Pagination } from 'swiper';

import { houseApi } from '@/api-client/houseApi';
import SkeletonShowHouse from '@/components/skeletonLoading/skletonShowHouse';
import { filterContext } from '@/contexts/filter';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { house_ } from '@/models/house';
import { userAcc } from '@/models/userAcc';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { BsChevronDoubleDown } from 'react-icons/bs';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HouseCard from '../showHouse/componentShowHouse/houseCard';
import { userAccContext } from '@/contexts/userAcc';
import { getHouseContext } from '@/contexts/getHouse';

interface SlideShowHouseProps {
  title: string;
  infShow: 'houseForSale' | 'houseForRent' | 'trending' | 'favoriteHouse';
  keyMapBing: string;
  setSelectUser: Dispatch<SetStateAction<userAcc | undefined>>;
  setSelectLocale: Dispatch<
    SetStateAction<
      | {
        longitude: number;
        latitude: number;
        zoom: number;
        formattedAddress: string
      }
      | undefined
    >
  >;
  setIsOpenMaskMap: Dispatch<SetStateAction<boolean>>;
  setIsOpenMask: Dispatch<SetStateAction<boolean>>;
  isHover: {
    ishover: boolean;
    id: number;
  };
  setIsHover: Dispatch<
    SetStateAction<{
      ishover: boolean;
      id: number;
    }>
  >;
}

const SlideShowHouse = ({
  title,
  infShow,
  keyMapBing,
  setSelectUser,
  setSelectLocale,
  setIsOpenMaskMap,
  setIsOpenMask,
  isHover,
  setIsHover
}: SlideShowHouseProps) => {
  const arrEmpty = [1, 2, 3, 4, 5, 6, 7];
  const [houseTemp, setHouseTemp] = useState<house_[]>([]);
  const { data: session, status } = useSession();
  const { filterForm, setFilterForm, emptyFilterForm } = useContext(filterContext)
  const { address, setAddress, emptyAddress } = useContext(selectPlaceContext);
  const { user } = useContext(userAccContext);
  const { isFilter, setIsFilter } = useContext(getHouseContext);

  const isEmpty = (arr: any) => {
    setHouseTemp(arr?.data as house_[]);
  };

  const fetchAPI = async () => {
    if (status === 'loading') return;
    const temp = await session?.userAcc;
    if (infShow === 'favoriteHouse') {
      const arr = await houseApi['authFavoriteList'](temp.UserId, -1);
      return isEmpty(arr);
    } else if (infShow === 'houseForRent') {
      const tempFilterForm = {
        ...emptyFilterForm,
        typeHouse: [...emptyFilterForm.typeHouse, 'HouseForRent']
      };
      const tempSelectPlace = emptyAddress;
      const arr = await houseApi['noneAuthFilter'](
        { filter: tempFilterForm, selectPlace: tempSelectPlace },
        -1,
        status === 'authenticated' ? temp.UserId : ''
      );

      return isEmpty(arr);
    } else if (infShow === 'houseForSale') {

      const tempFilterForm = {
        ...emptyFilterForm,
        typeHouse: [...emptyFilterForm.typeHouse, 'HouseForSale']
      };
      const tempSelectPlace = emptyAddress;
      const arr = await houseApi['noneAuthFilter'](
        { filter: tempFilterForm, selectPlace: tempSelectPlace },
        -1,
        status === 'authenticated' ? temp.UserId : ''
      );
      return isEmpty(arr);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [status]);

  useEffect(() => { }, [houseTemp]);
  return (
    <>
      <div className="">
        <div className="w-full h-[6.25rem]
        relative z-10 text-center flex
        text-[2.5rem] tablet:text-[2rem] mobile:text-[1.5rem] ">
          <div className='w-fit h-fit m-auto '>
            {title}
          </div>
        </div>
        <div className="">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            initialSlide={3}
            allowTouchMove={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              enabled: true
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container laptop:hidden desktop:hidden
            desktop:h-[34.3rem] laptop:h-[34.3rem] mobile:h-[28rem] tablet:h-[28rem]
            "
            style={{ width: 'calc(100vw-5rem)' }}
          >
            {!houseTemp || houseTemp.length === 0 &&
              arrEmpty.map((item: number, index: number) => {
                return (
                  <SwiperSlide key={index} style={{ width: '25rem', paddingTop: '1rem' }}>
                    <SkeletonShowHouse />
                  </SwiperSlide>
                );
              })}

            {houseTemp &&
              houseTemp.length > 0 &&
              houseTemp.map((item: house_, index: number) => {
                return (
                  <SwiperSlide key={index} style={{ width: '25rem', paddingTop: '1rem' }}>
                    <HouseCard
                      index={index}
                      keyMapBing={keyMapBing}
                      infShow={infShow}
                      isHover={{ ishover: false, id: index }}
                      item={item}
                      setIsHover={setIsHover}
                      setIsOpenMask={setIsOpenMask}
                      setIsOpenMaskMap={setIsOpenMaskMap}
                      setSelectLocale={setSelectLocale}
                      setSelectUser={setSelectUser}
                      isEdit={null} setIsEdit={null}
                      key={index}
                      isRemoveReq={undefined}
                      setIsRemoveReq={() => { }}
                    />
                  </SwiperSlide>
                );
              })}

            <div className="slider-controler mobile:hidden tablet:hidden">
              <div className="swiper-button-prev slider-arrow">
                <GrLinkPrevious />
              </div>
              <div className="swiper-button-next slider-arrow rounded-full">
                <GrLinkNext />
              </div>
              <div
                className="swiper-pagination"
                style={{ position: 'relative', bottom: '-.6rem' }}
              ></div>
            </div>
          </Swiper>
        </div>
      </div>
      <motion.button
        whileHover={{ backgroundColor: 'rgba(239,68,68,1)', color: 'white' }}
        className="w-[80%] m-auto h-[4.5rem] flex border-2 border-red-500
      rounded-2xl transition-all duration-500 mb-[6.25rem]
      "
        onClick={(event) => {

          const element = document.getElementById('slideShowHouse');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth'});
          }

          if (infShow === 'houseForRent') {
            const temp = filterForm.typeHouse.filter((item: string) => item != 'HouseForSale');
            temp.push('HouseForRent');
            setFilterForm({ ...filterForm, typeHouse: temp });
            setIsFilter('houseForRent');

          } else if (infShow === 'houseForSale') {
            const temp = filterForm.typeHouse.filter((item: string) => item != 'HouseForRent');
            temp.push('HouseForSale');
            setFilterForm({ ...filterForm, typeHouse: temp });
            setIsFilter('houseForSale');

          } else if (infShow === 'favoriteHouse') {
            setIsFilter(infShow);
          }
        }}
      >
        <div className="w-fit h-fit m-auto flex flex-col">
          <motion.div className="m-auto relative w-[2rem] h-[2rem]">
            <motion.div
              animate={{ y: [-10, 0, -10] }}
              transition={{ repeat: Infinity }}
              className="absolute left-0"
            >
              <BsChevronDoubleDown className="text-[2rem]" />
            </motion.div>
          </motion.div>
          <span className="font-semibold">Show more</span>
        </div>
      </motion.button>
    </>
  );
};

export default SlideShowHouse;
