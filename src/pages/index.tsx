import HeaderMain from '@/components/headers/headerMain/headerMain';
import EmptyLayout from '@/components/layouts/empty';
import { NextPageWithLayout } from '@/models/layoutprops';
import { GetServerSideProps } from 'next';
import { Montserrat } from 'next/font/google';
import { Map, NavigationControl } from 'react-map-gl';

const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});

interface IProps {
  accessToken: string;
}

const Home: NextPageWithLayout<IProps> = ({ accessToken }: IProps) => {
  console.log(accessToken);

  return (
    <>
      <main className={`${monsterrat.className}`} id="root">
        <HeaderMain />

        {/* <div className="w-full h-screen mt-[200px] relative">
          <Map
            initialViewState={{
              longitude: -100,
              latitude: 40,
              zoom: 3.5
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle={`mapbox://styles/mapbox/outdoors-v12`}
            mapboxAccessToken={`${accessToken}`}
            projection={'globe'}>
              <NavigationControl/>
            </Map>
        </div> */}
      </main>
    </>
  );
};

Home.Layout = EmptyLayout;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const accessToken: string | undefined = process.env.ACCESS_TOKEN_MAPBOX;

  console.log('Main');
  return {
    props: {
      accessToken: accessToken
    }
  };
};

export default Home;
