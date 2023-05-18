import axiosClient from '@/api-client/axiosClient';
import { houseApi } from '@/api-client/houseApi';
import { sessionOptions } from '@/api-client/session';
import FooterMainRes from '@/components/footers/footerMainRes';
import EmptyLayout from '@/components/layouts/empty';
import ShowHouse from '@/components/main/showHouse/showHouse';
import TypeHouse from '@/components/main/typeHouse';
import HeaderMain from '@/components/rootMaskHeader/headerMain';
import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { getHouseContext } from '@/contexts/getHouse';
import { userAccContext } from '@/contexts/userAcc';
import { house_ } from '@/models/house';
import { NextPageWithLayout } from '@/models/layoutprops';
import { userAcc } from '@/models/userAcc';
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
  props: any
}

const Home: NextPageWithLayout<HomeProps> = ({ user_, props }: HomeProps) => {
  const { user, setUser } = useContext(userAccContext);
  const { house, setHouse, isLoading, setIsLoading } = useContext(getHouseContext);
  const { setIsClickOutSide } = useContext(filterFormAnimateContext);

  if (!user_?.UserId) {
    const { data, error, mutate, isValidating } = useSWR(`/get/useracc/UserName/${user.UserName}`, {
      revalidateOnFocus: false
    });

    useEffect(() => {
      setUser({ ...user, ...data?.data?.data });
    }, [data]);
  } else if (user_?.UserId && !user.UserId) {
    setUser({ ...user, ...user_ });
  }

  useEffect(()=>{
    const handleOnScroll = (event: any) =>{
      setIsClickOutSide(false);
    }
    document.addEventListener('scroll', handleOnScroll);
  }, []);

  useEffect(() => {
    const fetchHouseApi = async () => {
      if (house.length != 0) return;
      const arr = await houseApi.noneAuthHouseApi(1);
      setHouse(arr.data as house_[]);
    };
    fetchHouseApi();
  }, [house]);

  return (
    <>
      <main className={`${monsterrat.className} relative overflow-hidden`} id="root">
        <HeaderMain />
        <div className="w-full h-fit px-[80px] box-border ">
          <TypeHouse />
          <ShowHouse />
        </div>
        <FooterMainRes />
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
