import axiosClient from '@/api-client/axiosClient';
import EmptyLayout from '@/components/layouts/empty';
import { AppPropsWithLayout } from '@/models/layoutprops';
import '@/styles/globals.css';
import { SWRConfig } from 'swr';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import SelectPopoverProvider from '@/contexts/selectPopover';
import PlaceListProvider from '@/contexts/placeList';
import SelectPlaceProvider from '@/contexts/selectPlace';

import { Poppins } from 'next/font/google';
import UserAccProvider from '@/contexts/userAcc';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-poppins'
});

// const circular = Flow_Circular

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <>
      <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
        <SelectPopoverProvider>
          <PlaceListProvider>
            <SelectPlaceProvider>
              <UserAccProvider>
                  <Layout>
                    <div className={`${poppins.className}`}>
                      <Component {...pageProps} />
                    </div>
                  </Layout>
              </UserAccProvider>
            </SelectPlaceProvider>
          </PlaceListProvider>
        </SelectPopoverProvider>
      </SWRConfig>
    </>
  );
}
