import { houseApi } from '@/api-client/houseApi';
import { selectPopoverContext } from '@/contexts';
import { userAccContext } from '@/contexts/userAcc';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartProps {
  HouseId: string;
  IsFavorite: boolean;
}

const Heart = ({ HouseId, IsFavorite }: HeartProps) => {
  const { user } = useContext(userAccContext);
  const { setIsLoginClick } = useContext(selectPopoverContext);
  const handleOnClickFavorite = async (event: any, HouseId: string) => {
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

  return (
    <motion.label
      whileHover={{ scale: 1.2 }}
      className="swap swap-flip text-[30px] z-10 absolute right-2 top-2
                  text-red-500 "
    >
      <input
        type="checkbox"
        onClick={(event) => {
          if (!user.UserId) {
            event.preventDefault();
            setIsLoginClick(true);
            return;
          }
          if (event.currentTarget.checked && IsFavorite == false) {
            handleOnClickFavorite(event, HouseId);
          } else {
            handleOnClickUnFavorite(event, HouseId);
          }

          if (event.currentTarget.checked && IsFavorite == true) {
            handleOnClickUnFavorite(event, HouseId);
          } else {
            handleOnClickFavorite(event, HouseId);
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
