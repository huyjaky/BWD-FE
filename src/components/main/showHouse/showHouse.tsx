import { houseApi } from '@/api-client/houseApi';
import HostUser from '@/components/houseDetail/host/hostUser';
import SkeletonShowHouse from '@/components/skeletonLoading/skletonShowHouse';
import { AmountTabHostingContext } from '@/contexts/amountTabHosting';
import { filterContext } from '@/contexts/filter';
import { getHouseContext, isFilter_ } from '@/contexts/getHouse';
import { houseTempContext } from '@/contexts/houseTemp';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { userAccContext } from '@/contexts/userAcc';
import { house_ } from '@/models/house';
import { userAcc } from '@/models/userAcc';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import nProgress from 'nprogress';
import { useContext, useEffect, useRef, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import InfiniteScroll from 'react-infinite-scroll-component';
import AnimateTitle from './animateTitle';
import EditForm from './componentShowHouse/editForm';
import EndMessage from './componentShowHouse/endMessage';
import HouseCard from './componentShowHouse/houseCard';
import RemoveReq from './componentShowHouse/inputForm/removeReq';
import MapEach from './mapEach';
import { variants } from './variantsShowHouse';

interface ShowHouseProps {
  infShow: isFilter_['isFilter_'];
  keyMapBing: string;
  api_url_path: string | undefined;
}

const ShowHouse = ({ infShow, keyMapBing, api_url_path }: ShowHouseProps) => {
  const arrTempLoading: number[] = Array.from({ length: 10 }, (_, index) => index);
  const { filterForm } = useContext(filterContext);
  const { address } = useContext(selectPlaceContext);
  const { setCurrentHosting } = useContext(AmountTabHostingContext);
  const { data: session, status } = useSession();
  const { user, setUser } = useContext(userAccContext);
  const { isFilter, setIsFilter, reRenderFilter } = useContext(getHouseContext);
  // const [houseTemp, setHouseTemp] = useState<house_[]>([]);
  const {houseTemp, setHouseTemp} = useContext(houseTempContext);
  const maskUser = useRef<HTMLInputElement>(null);
  const maskMap = useRef<HTMLInputElement>(null);
  const editPanel = useRef<HTMLDivElement>(null);
  const removeReqPanel = useRef<HTMLDivElement>(null);
  const [isOpenMask, setIsOpenMask] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<userAcc>();
  const [isRemoveReq, setIsRemoveReq] = useState<boolean | undefined>(false);

  const [isHover, setIsHover] = useState<{
    ishover: boolean;
    id: number;
  }>({ ishover: false, id: -1 });
  const [selectLocale, setSelectLocale] = useState<{
    longitude: number;
    latitude: number;
    zoom: number;
    formattedAddress: string;
  }>();
  const [isOpenMaskMap, setIsOpenMaskMap] = useState(false);

  // thuc hien hanh dong khi kiem tra xem arr co ton tai hay khong
  const isEmpty = (arr: any) => {
    if (arr.data.length == 0) {
      setHasMore(false); // neu nhu du lieu tra ve la khong co lan dau tien thi khong xuat hien nx
      nProgress.done();
      return;
    }
    setHouseTemp(arr.data as house_[]);
    nProgress.done();
  };

  const fetchHouseApi = async () => {
    if (houseTemp.length != 0 || status === 'loading') return;
    const temp = await session?.userAcc;
    // neu user login thi userid se thay doi nen phai chia ra nhieu truong hop
    nProgress.set(0.6);
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
      console.log('noneauthlist', arr);
      return isEmpty(arr);
    } else if (infShow === 'favoriteHouse' && status === 'authenticated') {
      const arr = await houseApi['authFavoriteList'](temp.UserId, 0);
      return isEmpty(arr);
    }

  };

  useEffect(() => {
    setHouseTemp([]);
    setHasMore(true);
  }, [infShow, isFilter, status, reRenderFilter]);

  useEffect(() => {
    fetchHouseApi();
  }, [houseTemp]);

  useEffect(()=>{}, [houseTemp]);

  const isExist = (moreHouse: any) => {
    if (Array.isArray(moreHouse.data) && moreHouse.data.length != 0 && moreHouse.data.length >= 10) {
      console.log(moreHouse);
      setHouseTemp([...houseTemp, ...moreHouse.data]);
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
        const moreHouse = await houseApi[infShow](
          { filter: filterForm, selectPlace: address },
          houseTemp.length / 10 + 1,
          user.UserId
        );
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

  const handleOnClickOutSideEditPanel = (event: any) => {
    const isClickInSide = editPanel.current?.contains(event.target);
    if (!isClickInSide) {
      setIsEdit(false);
      return;
    } else {
      return;
    }
  };

const handleOnClickOutSideRemoveReqPanel = (event: any) => {
    const isClickInSide = removeReqPanel.current?.contains(event.target);
    if (!isClickInSide) {
      setIsRemoveReq(false);
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
          animate={isRemoveReq ? 'showMask' : 'hiddenMask'}
          onClick={handleOnClickOutSideRemoveReqPanel}
          className="fixed w-screen h-screen bg-mask z-50 top-0 left-0" >
          <div className='w-fit h-fit m-auto' ref={removeReqPanel}>
            <RemoveReq setIsRemoveReq={setIsRemoveReq} isRemoveReq={isRemoveReq}/>
          </div>
        </motion.div>
      </AnimatePresence>


      {/* edit */}
      <AnimatePresence initial={false}>
        <motion.div
          variants={variants}
          animate={isEdit ? 'showMask' : 'hiddenMask'}
          onClick={handleOnClickOutSideEditPanel}
          className="fixed w-screen h-screen bg-mask z-50 top-0 left-0 flex" >
          <div className='w-fit h-fit m-auto' ref={editPanel}>
            <EditForm keyMapBing={keyMapBing} api_url_path={api_url_path} setIsEdit={setIsEdit} />
          </div>
        </motion.div>
      </AnimatePresence>

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
          <div ref={maskMap} className="w-[50%] h-fit bg-[#f0efe9] p-7 m-auto rounded-2xl
      mobile:w-full mobile:h-full
      tablet:w-full tablet:h-full
      relative
          ">
            <motion.button
              className="absolute w-[70px] h-[70px] flex desktop:hidden laptop:hidden z-20
              top-0 left-0
              "
              onClick={(event) => {
                  setIsOpenMaskMap(false)
              }}
            >
              <div className="w-fit h-full m-auto">
                <GrClose className="text-[30px]" />
              </div>
            </motion.button>

            <MapEach
              longitude={selectLocale?.longitude ? selectLocale.longitude : 1}
              latitude={selectLocale?.latitude ? selectLocale?.latitude : 1}
              zoom={selectLocale?.zoom ? selectLocale.zoom : 15}
              formattedAddress={selectLocale?.formattedAddress ? selectLocale.formattedAddress : ''}
              keyMapBing={keyMapBing}
              style='h-[500px] mobile:h-[calc(100%-50px)] tablet:h-[calc(100%-50px)]'
              idMap='4'
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div className="w-full h-fit py-4 pb-28" id="scroll-inf">
        {/* <motion.div
          variants={staggerContainer(null, null)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={` mx-auto flex-col`}
        > */}
        <AnimateTitle
          title={
            infShow === 'authListHouse'
              ? ''
              : isFilter === 'houseForSale'
                ? 'House for sale '
                : isFilter === 'houseForRent'
                  ? 'House for rent'
                  : isFilter === 'favoriteHouse'
                    ? 'Whislist'
                    : ''
          }
          textStyles=" w-full h-fit"
        />

        {/* </motion.div> */}

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
          className="w-full h-fit grid grid-cols-houseBox gap-x-9 gap-y-8 px-7 py-8
          mobile:px-0 mobile:py-0
          "
          endMessage={<EndMessage />}
        >
          {houseTemp.map((item: house_, index: number) => {
            return (
              <HouseCard
                keyMapBing={keyMapBing}
                index={index}
                isHover={isHover}
                key={index}
                infShow={infShow}
                item={item}
                isEdit={isEdit}
                setIsHover={setIsHover}
                setIsOpenMask={setIsOpenMask}
                setIsOpenMaskMap={setIsOpenMaskMap}
                setSelectLocale={setSelectLocale}
                setSelectUser={setSelectUser}
                setIsEdit={setIsEdit}
                isRemoveReq={isRemoveReq}
                setIsRemoveReq={setIsRemoveReq}
              />
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
