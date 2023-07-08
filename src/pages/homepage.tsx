import FooterMainRes from '@/components/footers/footerMainRes';
import FooterRooms from '@/components/footers/footerRooms';
import AuthWithAnimate from '@/components/layouts/authWithAnimate';
import ShowHouse from '@/components/main/showHouse/showHouse';
import TypeHouse from '@/components/main/typeHouse/typeHouse';
import HeaderMain from '@/components/rootMaskHeader/headerMain';
import { getHouseContext } from '@/contexts/getHouse';
import { userAccContext } from '@/contexts/userAcc';
import { NextPageWithLayout } from '@/models/layoutprops';
import { userAcc } from '@/models/userAcc';
import { initializeSSR } from 'bing-maps-loader';
import { AnimatePresence, Variants, motion, useElementScroll } from 'framer-motion';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { Montserrat } from 'next/font/google';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
// import { authOptions } from './api/auth/[...nextauth]';
import TabShowHouse from '@/components/main/tabShowHouse/tabShowHouse';
import { house_ } from '@/models/house';
import { useSession } from 'next-auth/react';
import CarouselMain from '@/components/main/carousel/carouselMain';
import AnimateTitle from '@/components/main/showHouse/animateTitle';
import { staggerContainer } from '@/utils/motion';



const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});
interface HomeProps {
  user_: userAcc;
  keyMapBing: string;
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
      duration: 0.5,
      delay: 0.2
    }
  },
  hiddenTypeHouse: {
    opacity: [1, 0],
    transitionEnd: {
      display: 'none'
    },
    transition: {
      duration: 0.5
    }
  }
};

initializeSSR();
const Home: NextPageWithLayout<HomeProps> = ({ user_, props, keyMapBing }: HomeProps) => {
  const { user, setUser } = useContext(userAccContext);
  const { isFilter } = useContext(getHouseContext);
  const { data: session, status } = useSession();
  const { pathname } = useRouter();

  useEffect(() => {
    if (session?.userAcc) {
      setUser(session?.userAcc);
    }
  }, [status]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => { }, [isFilter]);
  initializeSSR();

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
        className={`${monsterrat.className} relative overflow-hidden`}
        id="root"
      >
        <AnimatePresence initial={false}>
          <HeaderMain keyMapBing={keyMapBing}/>
        </AnimatePresence>
        <motion.div>
          <TypeHouse />
        </motion.div>

        <figure className='w-full h-fit'>
          <div className='w-full h-[calc(100vh-40vh)] overflow-hidden relative'>
            <div className='absolute top-0 left-0 w-full h-full  z-10
            p-7 rounded-xl
            '>

              <div className='w-full h-full flex'>
                <div className='m-auto text-[#ef5c76]  bg-[rgba(253,245,244,.8)] p-3 rounded-lg'>
                  <motion.div
                    variants={staggerContainer(null, null)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.25 }}
                    className={` mx-auto flex-col `}
                  >
                    <AnimateTitle
                      title={'Welcome to Olympus'}
                      textStyles=" w-full h-fit "
                    />

                  </motion.div>
                </div>

              </div>
              {/* <div className='w-full h-full absolute
              block content-none blur-md bg-[rgba(253,245,244,.8)]
              '></div> */}

            </div>
            <CarouselMain />
          </div>
        </figure>

        <div
          className="w-full h-fit px-[80px] box-border
        tablet:px-0 mobile:px-0
        "
        >
          {isFilter != 'main' ? (
            <motion.div variants={variants} animate="show">
              <ShowHouse
                infShow={
                  isFilter === 'houseForRent' || isFilter === 'houseForSale'
                    ? 'noneAuthFilter'
                    : isFilter
                }
                keyMapBing={keyMapBing}
                api_url_path={undefined}
              />
            </motion.div>
          ) : (
            <motion.div variants={variants} animate="show">
              <TabShowHouse keyMapBing={keyMapBing} />
            </motion.div>
          )}
        </div>
        <div className='relative z-10'>
          <FooterRooms />
          <FooterMainRes />
        </div>
      </motion.main>
    </>
  );
};

Home.Layout = AuthWithAnimate;

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const keyMapBing = process.env.ACCESS_TOKEN_BINGMAP;
  initializeSSR();
  return {
    props: {
      keyMapBing: keyMapBing
    }
  };
};
