// import required modules

import HostUser from '@/components/houseDetail/host/hostUser';
import { userAcc } from '@/models/userAcc';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MapEach from '../showHouse/mapEach';
import { variants } from '../showHouse/variantsShowHouse';
import SlideShowHouse from './slideShowHouse';
import { userAccContext } from '@/contexts/userAcc';

interface TabShowHouseProps {
  keyMapBing: string;
}

const TabShowHouse = ({ keyMapBing }: TabShowHouseProps) => {
  const maskUser = useRef<HTMLInputElement>(null);
  const maskMap = useRef<HTMLInputElement>(null);
  const [isOpenMask, setIsOpenMask] = useState(false);
  const [selectUser, setSelectUser] = useState<userAcc>();
  const [selectLocale, setSelectLocale] = useState<{
    longitude: number;
    latitude: number;
    zoom: number;
    formattedAddress: string;
  }>();
  const [isOpenMaskMap, setIsOpenMaskMap] = useState(false);
  const [isHover, setIsHover] = useState<{
    ishover: boolean;
    id: number;
  }>({ ishover: false, id: -1 });
  const { data: session, status } = useSession();
  const { user } = useContext(userAccContext);

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

  useEffect(() => {
    console.log(user);
  }, [user.UserId]);

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
            <div>

              <HostUser
                phone={selectUser?.Phone || 'xxxx-xxxx'}
                description=''
                imgPath={selectUser?.Image}
                gmail={selectUser?.Gmail}
                userName={selectUser?.UserName}
              />
            </div>
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
              formattedAddress={selectLocale?.formattedAddress ? selectLocale.formattedAddress : ''}
              style='h-[32rem]'
              idMap='6'
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="h-fit mt-[4.5rem] tablet:mt-[3rem] mobile:mt-[3rem] relative  bg-[#fffdf8]
      rounded-xl shadow-2xl box-border py-4 mobile:rounded-none tablet:rounded-none
      ">


        <motion.div variants={variants} exit="exitFavor">
          <SlideShowHouse
            setIsOpenMask={setIsOpenMask}
            setIsOpenMaskMap={setIsOpenMaskMap}
            setSelectLocale={setSelectLocale}
            setSelectUser={setSelectUser}
            isHover={isHover}
            setIsHover={setIsHover}
            infShow={'houseForRent'}
            title="House for rent"
            keyMapBing={keyMapBing}
          />
        </motion.div>

        {status === 'authenticated' && (
          <motion.div variants={variants} exit="exitFavor">
            <SlideShowHouse
              setIsOpenMask={setIsOpenMask}
              setIsOpenMaskMap={setIsOpenMaskMap}
              setSelectLocale={setSelectLocale}
              setSelectUser={setSelectUser}
              isHover={isHover}
              setIsHover={setIsHover}
              infShow="favoriteHouse"
              title="Whislist"
              keyMapBing={keyMapBing}
            />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default TabShowHouse;
