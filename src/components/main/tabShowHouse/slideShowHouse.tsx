import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { EffectCoverflow, Navigation, Pagination } from 'swiper';

import { houseApi } from "@/api-client/houseApi";
import SkeletonShowHouse from "@/components/skeletonLoading/skletonShowHouse";
import { filterContext } from "@/contexts/filter";
import { selectPlaceContext } from "@/contexts/selectPlace";
import { house_ } from "@/models/house";
import { userAcc } from "@/models/userAcc";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HouseCard from "../showHouse/componentShowHouse/houseCard";
import { userAccContext } from "@/contexts/userAcc";
import { getHouseContext } from "@/contexts/getHouse";

interface SlideShowHouseProps {
  title: string,
  infShow: 'houseForSale' | 'houseForRent' | 'trending' | 'favoriteHouse',
  keyMapBing: string,
  setSelectUser: Dispatch<SetStateAction<userAcc | undefined>>,
  setSelectLocale: Dispatch<SetStateAction<{
    longitude: number;
    latitude: number;
    zoom: number;
  } | undefined>>,
  setIsOpenMaskMap: Dispatch<SetStateAction<boolean>>,
  setIsOpenMask: Dispatch<SetStateAction<boolean>>,
  isHover: {
    ishover: boolean;
    id: number;
  },
  setIsHover: Dispatch<SetStateAction<{
    ishover: boolean;
    id: number;
  }>>
}


const SlideShowHouse = ({ title, infShow, keyMapBing, setSelectUser, setSelectLocale, setIsOpenMaskMap, setIsOpenMask, isHover, setIsHover }: SlideShowHouseProps) => {
  const arrEmpty = [1, 2, 3, 4, 5, 6, 7];
  const [houseTemp, setHouseTemp] = useState<house_[]>([]);
  const { data: session, status } = useSession();
  const { filterForm, setFilterForm } = useContext(filterContext);
  const { address, setAddress } = useContext(selectPlaceContext);
  const { user } = useContext(userAccContext);
  const { isFilter, setIsFilter } = useContext(getHouseContext)

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
      const tempFilterForm = { ...filterForm, typeHouse: [...filterForm.typeHouse, 'HouseForRent'] };
      const tempSelectPlace = address;
      const arr = await houseApi['noneAuthFilter']({ filter: tempFilterForm, selectPlace: tempSelectPlace }, -1, status === 'authenticated' ? temp.UserId : '');
      console.log('rent fetch');
      return isEmpty(arr);
    } else if (infShow === 'houseForSale') {
      const tempFilterForm = { ...filterForm, typeHouse: [...filterForm.typeHouse, 'HouseForSale'] };
      const tempSelectPlace = address;
      const arr = await houseApi['noneAuthFilter']({ filter: tempFilterForm, selectPlace: tempSelectPlace }, -1, status === 'authenticated' ? temp.UserId : '');
      return isEmpty(arr);
    }
  }

  useEffect(() => {
    fetchAPI();
  }, [status])

  useEffect(() => { }, [houseTemp])
  return (
    <>



      <div className="">
        <h1 className="heading text-[2.5rem] tablet:text-[2rem] mobile:text-[1.5rem]">{title}</h1>

        <div className="">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            initialSlide={3}
            allowTouchMove={false}

            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              enabled: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container laptop:hidden desktop:hidden
            desktop:h-[550px] laptop:h-[550px] mobile:h-[450px] tablet:h-[450px]
            " style={{ width: "calc(100vw-80px)" }} >

            {houseTemp && houseTemp.length === 0 &&
              arrEmpty.map((item: number, index: number) => {
                return (
                  <SwiperSlide key={index} style={{ width: '400px', paddingTop: '20px' }}>
                    <SkeletonShowHouse />
                  </SwiperSlide>
                )
              })
            }

            {houseTemp && houseTemp.length > 0 && houseTemp.map((item: house_, index: number) => {
              return (
                <SwiperSlide key={index} style={{ width: '400px', paddingTop: '20px' }}>
                  <HouseCard index={index} infShow={infShow}
                    isHover={{ ishover: false, id: index }} item={item}
                    setIsHover={setIsHover} setIsOpenMask={setIsOpenMask} setIsOpenMaskMap={setIsOpenMaskMap}
                    setSelectLocale={setSelectLocale} setSelectUser={setSelectUser} key={index}
                  />
                </SwiperSlide>
              )
            })}

            <div className="slider-controler mobile:hidden tablet:hidden">
              <div className="swiper-button-prev slider-arrow">
                <GrLinkPrevious />
              </div>
              <div className="swiper-button-next slider-arrow rounded-full">
                <GrLinkNext />
              </div>
              <div className="swiper-pagination" style={{ position: 'relative', bottom: '-10px' }}></div>
            </div>
          </Swiper>
        </div>


      </div>
      <button className="w-full h-[70px] flex hover:border-2 hover:border-red-500
      rounded-2xl transition-all duration-500 mb-[100px]
      "
        onClick={(event) => {
          if (infShow === 'houseForRent') {
            const temp = filterForm.typeHouse.filter((item: string) => item != 'HouseForSale')
            temp.push('HouseForRent')
            setFilterForm({ ...filterForm, typeHouse: temp })
            setIsFilter('noneAuthFilter')
          } else if (infShow === 'houseForSale') {
            const temp = filterForm.typeHouse.filter((item: string) => item != 'HouseForRent')
            temp.push('HouseForSale')
            setFilterForm({ ...filterForm, typeHouse: temp })
            setIsFilter('noneAuthFilter')
          } else if (infShow === 'favoriteHouse') {
            setIsFilter(infShow);
          }
        }}
      >
        <div className="w-fit h-fit m-auto flex flex-col">
          <motion.div
            className="m-auto relative w-[30px] h-[30px]">

            <motion.div
              animate={{ y: [-10, 0, -10] }}
              transition={{ repeat: Infinity }}
              className="absolute left-0">
              <BsChevronDoubleDown className="text-[30px]" />
            </motion.div>

          </motion.div>
          <span className="font-semibold">Show more</span>
        </div>


      </button>
    </>

  );
};

export default SlideShowHouse;

