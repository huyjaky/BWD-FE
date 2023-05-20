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
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo } from 'react';
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
  const { house, setHouse, isLoading, setIsLoading } = useContext(getHouseContext);
  const { isClickOutSide } = useContext(filterFormAnimateContext);

  const { pathname } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  useEffect(() => {

  }, [house]);

  return (
    <>
      <main className={`${monsterrat.className} relative overflow-hidden`} id="root" >
        <HeaderMain />
        <div className="w-full h-fit px-[80px] box-border"
        >
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
