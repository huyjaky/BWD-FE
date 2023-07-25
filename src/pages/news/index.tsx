
"use client"
import AnimateTest from "@/components/animationtest/main/animateTest";
import authWithoutAnimate from "@/components/layouts/authWithoutAnimate";
import { NextPageWithLayout } from "@/models/layoutprops";
import { GetServerSideProps } from "next";
interface IndexProps {
  // eventArr: scheduleCreate[];
}

const Index: NextPageWithLayout<IndexProps> = ({ }: IndexProps) => {
  return (
    <>
      <div className='setFont ' >
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
  };;
};


