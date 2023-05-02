import FooterTest from '@/components/footers/footerMain';
import HeaderMain from '@/components/headers/headerMain/headerMain';
import HeaderTest from '@/components/headers/headerMain/headerMain';
import EmptyLayout from '@/components/layouts/empty';
import { NextPageWithLayout } from '@/models/layoutprops';
import { Montserrat } from 'next/font/google';
import Head from 'next/head';

const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});

const Home: NextPageWithLayout = () => {

  return (
    <>
      <Head>
        <title>Air BNB</title>
      </Head>
      <main className={`${monsterrat.className}`} id='root' >
        <HeaderMain/>
        {/* <div className='w-screen h-screen bg-slate-500 -z-50'>

        </div> */}
      </main>
    </>
  );
};

Home.Layout = EmptyLayout;

export default Home;
