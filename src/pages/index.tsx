import { houseApi } from '@/api-client/houseApi';
import { sessionOptions } from '@/api-client/session';
import EmptyLayout from '@/components/layouts/empty';
import TypeHouse from '@/components/main/typeHouse';
import HeaderMain from '@/components/rootMaskHeader/headerMain';
import { getHouseContext } from '@/contexts/getHouse';
import { userAccContext } from '@/contexts/userAcc';
import { house_ } from '@/models/house';
import { NextPageWithLayout } from '@/models/layoutprops';
import { userAcc } from '@/models/userAcc';
import { motion } from 'framer-motion';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';
import { Montserrat } from 'next/font/google';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});
interface HomeProps {
  user_: userAcc;
  props: any;
}

const Home: NextPageWithLayout<HomeProps> = ({ user_, props }: HomeProps) => {
  const { user, setUser } = useContext(userAccContext);
  const {house, setHouse} = useContext(getHouseContext);

  if (!user_?.UserId) {
    const { data, error, mutate, isValidating } = useSWR(`/get/useracc/UserName/${user.UserName}`, {
      revalidateOnFocus: false,
      revalidateOnMount: false
    });
    useEffect(() => {
      setUser({ ...user, ...data?.data?.data });
      return () => {};
    }, [data]);
  } else if (user_?.UserId && !user.UserId) {
    setUser({ ...user, ...user_ });
  }

  useEffect(() => {
    const fetchHouseApi = async() =>{
      if (house.length != 0) return;
      const arr = await houseApi.noneAuthHouseApi();
      setHouse(arr.data as house_[])
    }
    fetchHouseApi();
  }, [house]);

  return (
    <>
      <main className={`${monsterrat.className} relative `} id="root">
        <HeaderMain />
        <div className="w-full h-fit">
          <TypeHouse />
          <motion.div className="w-full h-fit">
            
          </motion.div>
        </div>
      </main>
    </>
  );
};

Home.Layout = EmptyLayout;

export default Home;

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res, params }) => {
    const user = req.session.props?.user_;
    // if user available not callback api from server
    if (user?.UserId) {
      return {
        props: { ...req.session.props }
      };
    }
    return { props: {} };
  },
  sessionOptions
);
