import HeaderMain from '@/components/headers/headerMain/headerMain';
import EmptyLayout from '@/components/layouts/empty';
import { userAccContext } from '@/contexts/userAcc';
import redirectToHome from '@/funcServerSide/redirectToHome';
import { NextPageWithLayout } from '@/models/layoutprops';
import { GetServerSideProps } from 'next';
import { Montserrat } from 'next/font/google';
import { useContext, useEffect } from 'react';
import useSWR from 'swr';
const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});

interface IProps {
  accessTokenMapbox: string;
  isLogin: false
}


const Home: NextPageWithLayout<IProps> = ({ accessTokenMapbox }: IProps) => {

  const { user, setUser} = useContext(userAccContext);
  const { data, error, mutate, isValidating } = useSWR(`/get/useracc/UserName/${user.UserName}`, {
    revalidateOnFocus: false
  });

  useEffect(()=>{setUser({...user, ...data?.data})}, [data])

  return (
    <>
      <main className={`${monsterrat.className} relative`} id="root">
        <HeaderMain />

      </main>
    </>
  );
};

Home.Layout = EmptyLayout;

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const isLogin = redirectToHome(req, res);
  return {
    props: {}
  };
};
