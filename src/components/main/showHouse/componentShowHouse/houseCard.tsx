import { motion } from "framer-motion";
import { variants } from "../variantsShowHouse";
import Carousel from "../carousel";
import Image from 'next/image';
import { ImMap } from "react-icons/im";
import { HiUserCircle } from "react-icons/hi";
import EditRemoveIcon from "./editRemoveIcon";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { house_ } from "@/models/house";
import Heart from "../heart";
import { userAcc } from "@/models/userAcc";

interface HouseCardProps {
  index: number,
  item: house_,
  isHover: { ishover: boolean; id: number; },
  infShow: 'noneAuthHouseApi' | 'noneAuthFilter' | 'authListHouse' | 'favoriteHouse' | 'houseForSale' | 'houseForRent' | 'trending',
  setIsHover: Dispatch<SetStateAction<{ ishover: boolean; id: number; }>>,
  setIsOpenMaskMap: Dispatch<SetStateAction<boolean>>,
  setSelectLocale: Dispatch<SetStateAction<{ longitude: number; latitude: number; zoom: number; } | undefined>>,
  setSelectUser: Dispatch<SetStateAction<userAcc | undefined>>,
  setIsOpenMask: Dispatch<SetStateAction<boolean>>
}

const HouseCard = ({ index, setIsHover, item, infShow, isHover,
  setIsOpenMaskMap, setSelectLocale, setSelectUser, setIsOpenMask
}: HouseCardProps) => {
  
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
        className="w-full h-[400px] rounded-2xl box-border bg-gray-100"
        onHoverStart={() => {
          setIsHover({ ishover: true, id: index });
        }}
        onHoverEnd={() => {
          setIsHover({ ishover: false, id: -1 });
        }}
      >
        <div className="w-full h-[300px] relative">
          <Carousel arrImg={item.arrImg} houseId={item.HouseId} />

          {/* heart */}
          {infShow !== 'authListHouse' && (
            <Heart HouseId={item.HouseId} IsFavorite={item.IsFavorite} />
          )}

          <div className="absolute left-2 top-2 z-10">
            <Image
              className="fill-white"
              width={50}
              height={50}
              src={'/x2click.svg'}
              alt=""
            />
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

          {/* cai nay dung trong nhung luc binh thuong */}
          <motion.button
            onClick={() => {
              setSelectUser(item.useracc);
              setIsOpenMask(true);
            }}
            className={`absolute w-[60px] h-[60px] transition-all
                left-3 bottom-3 z-10 rounded-full overflow-hidden shadow-2xl ${infShow === 'authListHouse' ? 'hidden' : ''
              }`}
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

          {/* cai nay dung trong /hosting de them sua xoa */}
          <motion.button
            variants={variants}
            animate={
              isHover.ishover && isHover.id === index
                ? 'showIconControl'
                : 'hiddenIconControl'
            }
            transition={{ type: 'spring', duration: 0.3 }}
            className={`absolute w-[160px] h-[60px] transition-all bg-white
                left-3 bottom-3 z-10 rounded-full overflow-hidden shadow-2xl flex
                ${infShow === 'authListHouse' ? '' : 'hidden'}`}
          >
            <div className="w-[60px] h-full rounded-full overflow-hidden">
              {item.useracc.Image ? (
                <img
                  src={'/api/img/path/' + item.useracc.Image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <HiUserCircle className="w-full h-full" />
              )}
            </div>

            <EditRemoveIcon />

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
  )
}

export default HouseCard;