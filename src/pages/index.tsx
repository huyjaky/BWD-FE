import { sessionOptions } from '@/api-client/session';
import HeaderMain from '@/components/headers/headerMain/headerMain';
import EmptyLayout from '@/components/layouts/empty';
import { userAccContext } from '@/contexts/userAcc';
import { NextPageWithLayout } from '@/models/layoutprops';
import { userAcc } from '@/models/userAcc';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';
import { Montserrat } from 'next/font/google';
import { useContext, useEffect } from 'react';
import useSWR from 'swr';
const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});




const Home: NextPageWithLayout<userAcc> = (user_: userAcc) => {

  const { user, setUser} = useContext(userAccContext);
  if(!user_) {
    const { data, error, mutate, isValidating } = useSWR(`/get/useracc/UserName/${user.UserName}`, {
      revalidateOnFocus: false
    });
    useEffect(()=>{setUser({...user, ...data?.data})}, [data])
  } else {
    setUser({...user, ...user_});
    useEffect(()=>{}, [setUser])
  }


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

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async({req, res, params})=>{
  const user = req.session.user;
  if (user){
    return{
      props: user
    }
  }
  return {props: {}}
}, sessionOptions)


