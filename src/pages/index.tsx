import { sessionOptions } from '@/api-client/session';
import FooterMainRes from '@/components/footers/footerMainRes';
import FooterRooms from '@/components/footers/footerRooms';
import Auth from '@/components/layouts/auth';
import ShowHouse from '@/components/main/showHouse/showHouse';
import TypeHouse from '@/components/main/typeHouse';
import HeaderMain from '@/components/rootMaskHeader/headerMain';
import { getHouseContext } from '@/contexts/getHouse';
import { userAccContext } from '@/contexts/userAcc';
import { NextPageWithLayout } from '@/models/layoutprops';
import { userAcc } from '@/models/userAcc';
import { Variants, motion } from 'framer-motion';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';
import { Montserrat } from 'next/font/google';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});
interface HomeProps {
  user_: userAcc;
  props: any;
}

const variants: Variants = {
  show: {
    opacity: [0, 1],
    transition: {
      duration: 1
    }
  }
};

const Home: NextPageWithLayout<HomeProps> = ({ user_, props }: HomeProps) => {
  const { user, setUser } = useContext(userAccContext);
  const { isFilter } = useContext(getHouseContext);

  const { pathname } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (user_?.UserId && user.UserId) {
    setUser({ ...user, ...user_ });
  }

  useEffect(() => {}, [isFilter]);

  return (
    <>
      <main className={`${monsterrat.className} relative overflow-hidden`} id="root">
        <HeaderMain />
        <div className="w-full h-fit px-[80px] mobile:px-[20px] box-border">
          <TypeHouse />

          <motion.div variants={variants} animate="show">
            <ShowHouse infShow={isFilter != 0 ? 'noneAuthFilter' : 'noneAuthHouseApi'} />
          </motion.div>
        </div>
        <FooterRooms />
        <FooterMainRes />
      </main>
    </>
  );
};

Home.Layout = Auth;

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
