"use client"
import LayoutPanelDasboard from "@/components/dashboard/layoutPanel";
import NavbarDashboard from "@/components/dashboard/navbar/navbar";
import Schedule from "@/components/dashboard/schedule/schedule";
import HeaderForm from "@/components/headers/headerForm/HeaderForm";
import AuthWithAnimate from "@/components/layouts/authWithAnimate";
import { DashboardContext } from "@/contexts/dashboard";
import { NextPageWithLayout } from "@/models/layoutprops";
import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useContext, useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import https from 'https';
import fetch from 'node-fetch';
import { scheduleCreate } from "@/api-client/schedule";
import { useSession } from "next-auth/react";
import { ScheduleApi } from "@/api-client/scheduleApi";

interface IndexProps {
  // eventArr: scheduleCreate[];
}

const Index: NextPageWithLayout<IndexProps> = ({ }: IndexProps) => {
  const { selectOption, setSelectOption, setEventArr, eventArr } = useContext(DashboardContext)
  const { data: session, status } = useSession();
  const [isHoverCorner, setIsHoverCorner] = useState<boolean>(false);

  const fetchSchedule = async () => {
    try {
      if (status === 'unauthenticated' || status === 'loading') return;

      const schedule = await ScheduleApi.scheduleHost(session?.userAcc.UserId)

      if (schedule.status == 200) {
        console.log(schedule.data);
        setEventArr(schedule.data as scheduleCreate[]);
      }

    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    if (eventArr.length == 0) {
      fetchSchedule();
    }
  }, [status])

  return (
    <div className="w-screen h-screen">
      <HeaderForm>
        <div></div>
      </HeaderForm>

      <div className="w-screen h-[calc(100vh-5rem)] flex">
        {selectOption === 'Schedule' &&
          <LayoutPanelDasboard>
            <Schedule />
          </LayoutPanelDasboard>
        }

        <motion.div
          onHoverStart={(event) => { setIsHoverCorner(true) }}
          className="w-[2rem] fixed h-screen top-0 left-0 border-r-2">
            <div className="w-full h-full flex">
              <div className="m-auto" id="hoverme">Lets hover me</div>
            </div>
          </motion.div>

        <motion.div
          onHoverStart={(event) => { setIsHoverCorner(true) }}
          initial={{ left: '-30rem' }}
          animate={isHoverCorner ? { left: ['-30rem', '0rem'] } : { x: ['0rem', '-30rem'] }}
          transition={{ duration: .6 }}
          onHoverEnd={(event) => { setIsHoverCorner(false) }}
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


  return {
    props: {
      // eventArr: eventArr
    }
  };
};

