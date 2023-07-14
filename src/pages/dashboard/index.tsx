"use client"
import LayoutPanelDasboard from "@/components/dashboard/layoutPanel";
import NavbarDashboard from "@/components/dashboard/navbar/navbar";
import Schedule from "@/components/dashboard/schedule/schedule";
import AuthWithAnimate from "@/components/layouts/authWithAnimate";
import { DashboardContext } from "@/contexts/dashboard";
import { NextPageWithLayout } from "@/models/layoutprops";
import { GetServerSideProps } from "next";
import { useContext } from "react";



const Index: NextPageWithLayout = () => {
  const { selectOption, setSelectOption } = useContext(DashboardContext)

  return (
    <div className="w-screen h-screen">
      <div className="w-screen h-screen flex">
        <NavbarDashboard />
        <div className="w-[calc(100vw-20rem)] h-full">

          {selectOption === 'Schedule' &&
            <LayoutPanelDasboard>
              <Schedule />
            </LayoutPanelDasboard>
          }

        </div>
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

