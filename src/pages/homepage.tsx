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
import { AnimatePresence, Variants, motion, useElementScroll, useScroll, useTransform } from 'framer-motion';
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
import TabletMobile from '@/components/main/typeHouse/tabletMobile';



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


  const { scrollYProgress } = useScroll();
  const convert = useTransform(scrollYProgress, [0, .7], [1, 5]);

  return (
    <>
      <div className='fixed top-[80px] left-0 w-screen h-[100vh] '>
        <div className='w-full h-full relative' >
          <CarouselMain />

          <div className='absolute w-full h-full flex bg-mask z-30 top-0 left-0'>

          </div>
        </div>
      </div>

      <div className='fixed top-[80px] left-0 w-screen h-screen'>
        <div className='w-full h-full relative'>
          <motion.div className={`w-[36rem] h-[calc(100vh-100px)] bottom-0 left-[calc(50%-18rem-100vh)]
            bg-transparent absolute rounded-t-full box-content border-[100vh] border-b-0
            origin-bottom border-[#fdf5f4]
            `} style={{ scale: convert }}>

            <div className='w-full h-full rounded-t-full overflow-hidden
            border-[25px] border-[#ee6457] border-b-0 flex'>

            </div>

          </motion.div>
        </div>
      </div>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
        className={`${monsterrat.className} relative overflow-hidden`}
        id="root"
      >
        <AnimatePresence initial={false}>
          <HeaderMain keyMapBing={keyMapBing} />
        </AnimatePresence>
        <motion.div>
          <TypeHouse />
        </motion.div>

        <div className='w-full h-fit'>
          <div className='w-full h-[300vh] overflow-hidden relative '>

          </div>
        </div>

        <div
          className="w-full h-fit px-[5rem] box-border
        tablet:px-0 mobile:px-0
        "
        >
          <div className="desktop:hidden laptop:hidden mt-6">
            <TabletMobile />
          </div>

          {isFilter != 'main' ? (
            <motion.div variants={variants} animate="show" className=' h-fit bg-[#f0efe9] m-auto rounded-2xl mb-[100px]'>
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
