import Header from '@/components/Hosting/components/Header';
import Main from '@/components/Hosting/components/Main';
import FooterRooms from '@/components/footers/footerRooms';
import AuthWithAnimate from '@/components/layouts/authWithAnimate';
import { NextPageWithLayout } from '@/models/layoutprops';
import { initializeSSR } from 'bing-maps-loader';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { Montserrat } from 'next/font/google';
import FooterMainRes from '@/components/footers/footerMainRes';

initializeSSR();
interface indexProps {
  keyMapBing: string;
  api_url_path: string
}

const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});

const Index: NextPageWithLayout<indexProps> = ({ keyMapBing, api_url_path }: indexProps): JSX.Element => {
  initializeSSR();
  return (
    <>
      <div className={`${monsterrat.className} overflow-x-hidden mobile:overflow-y-hidden`}>
        <Header />
        <Main keyMapBing={keyMapBing} api_url_path={api_url_path} />
        <FooterRooms />
        <FooterMainRes />
      </div>
    </>
  );
};

Index.Layout = AuthWithAnimate;

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  const keyMapBing = process.env.ACCESS_TOKEN_BINGMAP;
  const api_url_path = process.env.NEXTAUTH_URL;

  if (!session?.userAcc) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
  initializeSSR();
  return {
    props: {
      keyMapBing: keyMapBing,
      api_url_path: api_url_path
    }
  };
};
