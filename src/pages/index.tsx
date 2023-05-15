import { sessionOptions } from '@/api-client/session';
import EmptyLayout from '@/components/layouts/empty';
import TypeHouse from '@/components/main/typeHouse';
import HeaderMain from '@/components/rootMaskHeader/headerMain';
import { userAccContext } from '@/contexts/userAcc';
import { NextPageWithLayout } from '@/models/layoutprops';
import { userAcc } from '@/models/userAcc';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';
import { Montserrat } from 'next/font/google';
import { useContext, useEffect } from 'react';
import { clearScreenDown } from 'readline';
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

  return (
    <>
      <main className={`${monsterrat.className} relative `} id="root">
        <HeaderMain />
        <div className="w-full h-fit">
          <TypeHouse />
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
