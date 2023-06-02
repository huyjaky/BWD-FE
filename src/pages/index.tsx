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
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { Montserrat } from 'next/font/google';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { authOptions } from './api/auth/[...nextauth]';
import Head from 'next/head';

const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});
interface HomeProps {
  user_: userAcc;
  keyMapBox: string;
  props: any;
}

const variants: Variants = {
  show: {
    opacity: [0, 1],
    transition: {
      duration: 1
    }
  },
  showTypeHouse: {
    opacity: [0, 1],
    display: 'flex',
    transition: {
      duration: .5,
      delay: .2
    }
  },
  hiddenTypeHouse: {
    opacity: [1, 0],
    transitionEnd: {
      display: 'none',
    },
    transition: {
      duration: .5,
    }
  },

};

const Home: NextPageWithLayout<HomeProps> = ({ user_, props, keyMapBox }: HomeProps) => {
  const { user, setUser } = useContext(userAccContext);
  const { isFilter } = useContext(getHouseContext);

  const { pathname } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (user_?.UserId && user.UserId) {
    setUser({ ...user, ...user_ });
  }

  useEffect(() => { }, [isFilter]);

  return (
    <>
      <Head>
        <script
          type='text/javascript'
          src={`https://www.bing.com/api/maps/mapcontrol?key=AiWimzL8WC5fWxhKerTLiSvd63qgv22WhCiBLgm63xMJ-nn1Mv9SMqYpLPB4nkMI`}
          async
          defer
        ></script>
      </Head>
      <main className={`${monsterrat.className} relative overflow-hidden`} id="root">
        <AnimatePresence initial={false}>
          <HeaderMain />
        </AnimatePresence>
        <div className="w-full h-fit px-[80px] mobile:px-[20px] box-border">
          <motion.div
            variants={variants}
            animate={isFilter < 0 ? 'hiddenTypeHouse' : 'showTypeHouse'}
          >
            <TypeHouse />
          </motion.div>

          {isFilter < 0 ?
            <motion.div
            animate={{opacity: [0, 1]}}
            transition={{delay: .5}}
            className='text-[50px] mt-[20px] font-semibold'>Whistlist</motion.div>
            :
            <></>
          }

          <motion.div variants={variants} animate="show">
            <ShowHouse
              infShow={isFilter != 0 ? (isFilter > 0 ? 'noneAuthFilter' : 'favoriteHouse') : 'noneAuthHouseApi'}
              keyMapBox={keyMapBox}
            />
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  const keyMapBox = process.env.ACCESS_TOKEN_MAPBOX;

  // if user available not callback api from server
  if (session?.userAcc) {
    return {
      props: { ...session.userAcc, keyMapBox: keyMapBox }
    };
  }
  return {
    props: {
      keyMapBox: keyMapBox
    }
  };
};
