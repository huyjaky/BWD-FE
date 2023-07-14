"use client"
import LayoutPanelDasboard from "@/components/dashboard/layoutPanel";
import NavbarDashboard from "@/components/dashboard/navbar/navbar";
import Schedule from "@/components/dashboard/schedule/schedule";
import AuthWithAnimate from "@/components/layouts/authWithAnimate";
import { DashboardContext } from "@/contexts/dashboard";
import { NextPageWithLayout } from "@/models/layoutprops";
import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import { useContext, useState } from "react";



const Index: NextPageWithLayout = () => {
  const { selectOption, setSelectOption } = useContext(DashboardContext)
  const [isHoverCorner, setIsHoverCorner] = useState<boolean>(false);

  return (
    <div className="w-screen h-screen">
      <div className="w-screen h-screen flex">

        <div className="w-[100%] h-full">

          {selectOption === 'Schedule' &&
            <LayoutPanelDasboard>
              <Schedule />
            </LayoutPanelDasboard>
          }

        </div>
        <motion.div
          onHoverStart={(event) => { setIsHoverCorner(true) }}
          className="w-[2rem] fixed h-screen top-0 left-0 bg-red-400"></motion.div>

        <motion.div
          onHoverStart={(event) => { setIsHoverCorner(true) }}
          initial={{left: '-30rem'}}
          animate={isHoverCorner ? {left: ['-30rem', '0rem']} : {x: ['0rem', '-30rem']}}
          transition={{duration: .6}}
          onHoverEnd={(event)=>{setIsHoverCorner(false)}}
          className="fixed top-0 left-0 bg-white w-fit h-screen z-50 ">
          <NavbarDashboard />
        </motion.div>

      </div>
    </div>
  )
}

Index.Layout = AuthWithAnimate;

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const keyMapBing = process.env.ACCESS_TOKEN_BINGMAP;
  const keyChatEngine = process.env.KEYCHAT_ENGINE;

  return {
    props: {
      keyMapBing: keyMapBing,
      keyChatEngine: keyChatEngine
    }
  };
};

