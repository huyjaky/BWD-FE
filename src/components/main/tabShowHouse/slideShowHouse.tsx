import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { EffectCoverflow, Navigation, Pagination } from 'swiper';

import { houseApi } from "@/api-client/houseApi";
import HostUser from "@/components/houseDetail/host/hostUser";
import { filterContext } from "@/contexts/filter";
import { selectPlaceContext } from "@/contexts/selectPlace";
import { house_ } from "@/models/house";
import { userAcc } from "@/models/userAcc";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HouseCard from "../showHouse/componentShowHouse/houseCard";
import MapEach from "../showHouse/mapEach";
import { variants } from "../showHouse/variantsShowHouse";

interface SlideShowHouseProps {
  title: string,
  infShow: 'houseForSale' | 'houseForRent' | 'trending' | 'favoriteHouse',
  keyMapBing: string
}


const SlideShowHouse = ({ title, infShow, keyMapBing }: SlideShowHouseProps) => {
  const arrTemp: number[] = [1, 2, 3, 4, 5, 6, 7];
  const [houseTemp, setHouseTemp] = useState<house_[]>([]);
  const { data: session, status } = useSession();
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
  console.log(keyMapBing);

  const { filterForm, setFilterForm } = useContext(filterContext);
  const { address } = useContext(selectPlaceContext);

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

  const isEmpty = (arr: any) => {
    setHouseTemp(arr.data as house_[]);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      if (houseTemp.length != 0 || status === 'loading') return;
      const temp = await session?.userAcc;
      if (infShow === 'favoriteHouse') {
        const arr = await houseApi['authFavoriteList'](temp.UserId, -1);
        return isEmpty(arr);
      } else if (infShow === 'houseForRent') {
        const tempFilterForm = { ...filterForm, typeHouse: [...filterForm.typeHouse, 'HouseForRent'] };
        const tempSelectPlace = address;
        const arr = await houseApi['noneAuthFilter']({ filter: tempFilterForm, selectPlace: tempSelectPlace }, -1, '');
        return isEmpty(arr);
      } else if (infShow === 'houseForSale') {
        const tempFilterForm = { ...filterForm, typeHouse: [...filterForm.typeHouse, 'HouseForSale'] };
        const tempSelectPlace = address;
        const arr = await houseApi['noneAuthFilter']({ filter: tempFilterForm, selectPlace: tempSelectPlace }, -1, '');
        return isEmpty(arr);
      }
    }
    fetchAPI();
  }, [status])

  useEffect(() => { console.log(houseTemp); }, [houseTemp])

  return (
    <>
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


      <div className="">
        <h1 className="heading">{title}</h1>

        <div className="tablet:hidden mobile:hidden">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
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
            className="swiper_container laptop:hidden desktop:hidden" style={{ width: "calc(100vw-80px)", height: '550px' }} >

            {houseTemp.length === 0 && <SwiperSlide style={{ width: '200px', paddingTop: '20px' }}>No result</SwiperSlide>}

            {houseTemp.length > 0 && houseTemp.map((item: house_, index: number) => {
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

            <div className="slider-controler">
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


        <div className="desktop:hidden laptop:hidden">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            allowTouchMove={true}

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
            className="swiper_container" style={{ width: "calc(100vw-80px)", height: '550px' }} >

            {houseTemp.length === 0 && <SwiperSlide style={{ width: '200px', paddingTop: '20px' }}>No result</SwiperSlide>}

            {houseTemp.length > 0 && houseTemp.map((item: house_, index: number) => {
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

            <div className="slider-controler tablet:hidden mobile:hidden">
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
      <div className="w-full h-[70px] flex hover:border-2 hover:border-red-500
      rounded-2xl transition-all duration-500 mb-[100px]
      ">
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


      </div>
    </>

  );
};

export default SlideShowHouse;

