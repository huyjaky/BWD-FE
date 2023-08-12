
"use client"
import AnimateTest from "@/components/animationtest/main/animateTest";
import authWithoutAnimate from "@/components/layouts/authWithoutAnimate";
import { NextPageWithLayout } from "@/models/layoutprops";
import { GetServerSideProps } from "next";
import { Montserrat } from "next/font/google";
interface IndexProps {
  // eventArr: scheduleCreate[];
}
const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});

const Index: NextPageWithLayout<IndexProps> = ({ }: IndexProps) => {
  return (
    <>
      <div className={`setFont ${monsterrat.className}` }>
        <AnimateTest />
      </div>
    </>
  )
}

Index.Layout = authWithoutAnimate;

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const keyMapBing = process.env.ACCESS_TOKEN_BINGMAP;
  const keyChatEngine = process.env.KEYCHAT_ENGINE;

  return {
    props: {}
  };
};


