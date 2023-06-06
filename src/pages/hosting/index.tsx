import Header from '@/components/Hosting/components/Header';
import Main from '@/components/Hosting/components/Main';
import FooterRooms from '@/components/footers/footerRooms';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import Script from 'next/script';
import { initializeSSR } from 'bing-maps-loader';
import { NextPageWithLayout } from '@/models/layoutprops';
import AuthWithAnimate from '@/components/layouts/authWithAnimate';

interface indexProps {
  keyMapBing: string;
}

const Index: NextPageWithLayout<indexProps> = ({ keyMapBing }: indexProps): JSX.Element => {
  initializeSSR();
  return (
    <>
      <div>
        <Header />
        <Main keyMapBing={keyMapBing} />
        <FooterRooms />
      </div>
x
    </>
  );
}

Index.Layout = AuthWithAnimate

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  const keyMapBing = process.env.ACCESS_TOKEN_BINGMAP;
  initializeSSR();
  if (!session?.userAcc) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: {
      keyMapBing: keyMapBing
    }
  };
};
