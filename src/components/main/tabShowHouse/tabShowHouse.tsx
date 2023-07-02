// import required modules

import { AnimatePresence, Variants, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SlideShowHouse from "./slideShowHouse";
import { useRef, useState } from "react";
import { userAcc } from "@/models/userAcc";
import HostUser from "@/components/houseDetail/host/hostUser";
import MapEach from "../showHouse/mapEach";

const variants: Variants = {
  exitFavor: {
    opacity: [1, 0],
    height: ['100%', '0']
  }
}

interface TabShowHouseProps {
  keyMapBing: string
}

const TabShowHouse = ({ keyMapBing }: TabShowHouseProps) => {


  const { data: session, status } = useSession();

  return (
    <>


      <div className="h-fit">
        <motion.div variants={variants} exit='exitFavor' >
          <SlideShowHouse infShow="houseForSale" title="House for sale" keyMapBing={keyMapBing} />
        </motion.div>

        <motion.div variants={variants} exit='exitFavor' >
          <SlideShowHouse infShow="houseForRent" title="House for rent" keyMapBing={keyMapBing} />
        </motion.div>


        {status === 'authenticated' &&
          <motion.div variants={variants} exit='exitFavor' >
            <SlideShowHouse infShow="favoriteHouse" title="Whislist" keyMapBing={keyMapBing} />
          </motion.div>
        }
      </div>

    </>
  );
};

export default TabShowHouse;
