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
      <div className={`${monsterrat.className}`}>
        <Header />
        <Main keyMapBing={keyMapBing} api_url_path={api_url_path}/>
        <FooterRooms />
      </div>
      x
    </>
  );
};

Index.Layout = AuthWithAnimate;

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  const keyMapBing = process.env.ACCESS_TOKEN_BINGMAP;
  const api_url_path = process.env.API_URL_PATH;
  initializeSSR();
  if (!session?.userAcc) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: {
      keyMapBing: keyMapBing,
api_url_path: api_url_path
    }
  };
};
