import { houseApi } from '@/api-client/houseApi';
import { selectPopoverContext } from '@/contexts';
import { userAccContext } from '@/contexts/userAcc';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartProps {
  HouseId: string;
  IsFavorite: boolean;
  PostBy: string
}

const Heart = ({ HouseId, IsFavorite, PostBy }: HeartProps) => {
  const { user } = useContext(userAccContext);
  const [isClickHeart, setIsClickHeart] = useState(false);
  const { setIsLoginClick } = useContext(selectPopoverContext);

  const handleOnClickFavorite = async (event: any, HouseId: string) => {
    const addHouseFavorite = await houseApi.authFavoriteHouse(HouseId, user.UserId);
    if (addHouseFavorite.status != 200) {
      return;
    } else {
      return;
    }
  };

  // bo khoai danh sahc yeu thich
  const handleOnClickUnFavorite = async (event: any, HouseId: string) => {
    const removeHouseFavorite = await houseApi.authUnFavoriteHouse(HouseId, user.UserId);
    if (removeHouseFavorite.status != 200) {
      return;
    } else {
      return;
    }
  };

  return (
    <motion.label
      whileHover={{ scale: 1.2 }}
      className={`swap swap-flip text-[2rem] z-10 absolute right-2 top-2
                  text-red-500 ${user.UserId === PostBy ? 'hidden': ''}`}
    >
      <input
        type="checkbox"
        onClick={async (event) => {
          if (user.UserId === 'none user') {
            event.preventDefault();
            setIsLoginClick(true);
            return;
          }
          if (event.currentTarget?.checked && IsFavorite == false) {
            await handleOnClickFavorite(event, HouseId);
          } else if (!event.currentTarget?.checked && IsFavorite == false) {
            await handleOnClickUnFavorite(event, HouseId);
          }

          if (event.currentTarget?.checked && IsFavorite == true) {
            await handleOnClickUnFavorite(event, HouseId);
          } else if (!event.currentTarget?.checked && IsFavorite == true) {
            await handleOnClickFavorite(event, HouseId);
          }
        }}
      />
      {IsFavorite ? (
        <>
          <motion.div whileTap={{ scale: [0.8, 1.3] }} className="swap-off">
            <AiFillHeart />
          </motion.div>

          <motion.div whileTap={{ scale: [0.8, 1.3] }} className="swap-on">
            <AiOutlineHeart />
          </motion.div>
        </>
      ) : (
        <>
          <motion.div whileTap={{ scale: [0.8, 1.3] }} className="swap-on">
            <AiFillHeart />
          </motion.div>

          <motion.div whileTap={{ scale: [0.8, 1.3] }} className="swap-off">
            <AiOutlineHeart />
          </motion.div>
        </>
      )}
    </motion.label>
  );
};

export default Heart;
