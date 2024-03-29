import { motion } from 'framer-motion';
import { variants } from '../variantsShowHouse';
import Carousel from '../carousel';
import Image from 'next/image';
import { ImMap } from 'react-icons/im';
import { HiUserCircle } from 'react-icons/hi';
import EditRemoveIcon from './editRemoveIcon';
import Link from 'next/link';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { house_ } from '@/models/house';
import Heart from '../heart';
import { userAcc } from '@/models/userAcc';
import { isFilter_ } from '@/contexts/getHouse';
import { FaRegCompass } from 'react-icons/fa';
import { selectHouseContext } from '@/contexts/selectHouse';

interface HouseCardProps {
  index: number;
  item: house_;
  isHover: { ishover: boolean; id: number };
  infShow: isFilter_['isFilter_'];
  keyMapBing: string;
  isEdit: boolean | null;
  isRemoveReq: boolean | undefined;
  setIsHover: Dispatch<SetStateAction<{ ishover: boolean; id: number }>>;
  setIsOpenMaskMap: Dispatch<SetStateAction<boolean>>;
  setSelectLocale: Dispatch<
    SetStateAction<{ longitude: number; latitude: number; zoom: number; formattedAddress: string } | undefined>
  >;
  setSelectUser: Dispatch<SetStateAction<userAcc | undefined>>;
  setIsOpenMask: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>> | null;
  setIsRemoveReq: Dispatch<SetStateAction<boolean | undefined>>
}

const HouseCard = ({
  index,
  setIsHover,
  item,
  infShow,
  isHover,
  isEdit,
  setIsOpenMaskMap,
  setSelectLocale,
  setSelectUser,
  setIsOpenMask,
  setIsEdit,
  isRemoveReq,
  setIsRemoveReq
}: HouseCardProps) => {
  const { selectHouse, setSelectHouse } = useContext(selectHouseContext);

  const selectHouseHandle = (item: house_) => {
    setSelectHouse({ ...selectHouse, ...item });
    console.log(item);
  }

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

        onClick={(event) => {
          selectHouseHandle(item)
        }}

        transition={{ type: 'spring' }}
        className="w-full h-[25rem] rounded-2xl box-border bg-[#f28076] text-white"
        onHoverStart={() => {
          setIsHover({ ishover: true, id: index });
        }}
        onHoverEnd={() => {
          setIsHover({ ishover: false, id: -1 });
        }}
      >
        <div className="w-full h-[18.75rem] relative">
          <Carousel arrImg={item.arrImg} houseId={item.HouseId} />

          {/* heart */}
          {infShow !== 'authListHouse' && (
            <Heart HouseId={item.HouseId} IsFavorite={item.IsFavorite} PostBy={item.PostBy}/>
          )}

          <div className="absolute left-2 top-2 z-10">
            <Image className="fill-white" width={50} height={50} src={'/x2click.svg'} alt="" />
          </div>

          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              setIsOpenMaskMap(true);
              setSelectLocale({
                latitude: item.address.latitude,
                longitude: item.address.longitude,
                zoom: 18,
                formattedAddress: item.address.formattedAddress
              });
            }}
            className={`absolute top-2 right-12 ${infShow === 'authListHouse' ? 'right-2' : ''
              } text-red-500 text-[2rem] z-10`}
          >
            <ImMap />
          </motion.button>

          {/* cai nay dung trong nhung luc binh thuong */}
          <motion.button
            onClick={() => {
              setSelectUser(item.useracc);
              setIsOpenMask(true);
              console.log('user click');

            }}
            className={`absolute w-[4rem] h-[4rem] transition-all
                left-3 bottom-3 z-[15] rounded-full overflow-hidden shadow-2xl ${infShow === 'authListHouse' ? 'hidden' : ''
              }`}
          >
            {item.useracc.Image != undefined ? (
              <img
                src={'/api/img/path/' + item.useracc.Image}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <HiUserCircle className="w-full h-full" />
            )}
          </motion.button>


          {/* cai nay dung trong /hosting de them sua xoa */}
          <motion.button
            variants={variants}
            animate={
              isHover.ishover && isHover.id === index ? 'showIconControl' : 'hiddenIconControl'
            }
            transition={{ type: 'spring', duration: 0.3 }}
            className={`absolute w-[4rem] h-[4rem] transition-all bg-white
                left-3 bottom-3 z-10 rounded-full overflow-hidden shadow-2xl flex
                tablet:hidden mobile:hidden
                ${infShow === 'authListHouse' || infShow === 'houseForRent'
                || infShow === 'houseForSale'
                ? '' : 'hidden'}`}
          >
            <div className="w-[4rem] h-full rounded-full overflow-hidden">
              {item.useracc.Image != undefined ? (
                <img
                  src={'/api/img/path/' + item.useracc.Image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <HiUserCircle className="w-full h-full" />
              )}
            </div>

            <EditRemoveIcon isEdit={isEdit} setIsEdit={setIsEdit} item={item}
            isRemoveReq={isRemoveReq} setIsRemoveReq={setIsRemoveReq}
            />
          </motion.button>


          <motion.button
            variants={variants}
            transition={{ type: 'spring', duration: 0.3 }}
            className={`absolute w-[160px] h-[4rem] transition-all bg-white
                left-3 bottom-3  rounded-full overflow-hidden shadow-2xl flex
                laptop:hidden desktop:hidden z-20
                ${infShow === 'authListHouse' ? '' : 'hidden'}`}
          >
            <div className="w-[4rem] h-full rounded-full overflow-hidden">
              {item.useracc.Image != undefined ? (
                <img
                  src={'/api/img/path/' + item.useracc.Image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <HiUserCircle className="w-full h-full" />
              )}
            </div>
            <EditRemoveIcon isEdit={isEdit} setIsEdit={setIsEdit} item={item}
            isRemoveReq={isRemoveReq} setIsRemoveReq={setIsRemoveReq}
            />
          </motion.button>






        </div>
        <Link href={`/house/${item.HouseId}`}>
          <div className="h-[6.25rem] w-full box-border p-4 ">
            <div className="w-full grid grid-cols-2 grid-rows-3">
              <div className='whitespace-nowrap max-w-[100%] text-ellipsis overflow-hidden'>
                <span className="font-semibold ">
                  {item.address.title}, {item.address.countryRegion}
                </span>
              </div>
              <div className="flex justify-end font-semibold text-red-500">
                <span>&#36;{item.Price}</span>
                {infShow === 'houseForRent' ? (
                  <span className="font-semibold">{'/month'}</span>
                ) : (
                  ''
                )}
              </div>
              <div>
                <span>{'Host: ' + item.useracc.UserName}</span>
              </div>
              <div className="flex justify-end">
                <span>
                  {item.NumsOfBath + ' Baths,'} {item.NumsOfBed + ' Beds'}
                </span>
              </div>
              <div>
                <span>{item.Capacity + ' m'}&sup2;</span>
              </div>
              <div className="flex justify-end">
                <span>{item.Orientation} </span>{' '}
                <FaRegCompass className="h-full ml-2 text-[1rem]" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HouseCard;
