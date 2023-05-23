import axiosClient from '@/api-client/axiosClient';
import EmptyLayout from '@/components/layouts/empty';
import PlaceListProvider from '@/contexts/placeList';
import SelectPlaceProvider from '@/contexts/selectPlace';
import SelectPopoverProvider from '@/contexts/selectPopover';
import { AppPropsWithLayout } from '@/models/layoutprops';
import '@/styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'rc-slider/assets/index.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-loading-skeleton/dist/skeleton.css';
import { SWRConfig } from 'swr';

import FilterProvider from '@/contexts/filter';
import FilterFormAnimateProvider from '@/contexts/filterFormAnimate';
import GetHouseProvider from '@/contexts/getHouse';
import MobileContolPanelProvider from '@/contexts/mobileControlPanel';
import UserAccProvider from '@/contexts/userAcc';
import { Poppins } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-poppins'
});

// const circular = Flow_Circular

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <>
      <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
        <SelectPopoverProvider>
          <PlaceListProvider>
            <SelectPlaceProvider>
              <UserAccProvider>
                <FilterFormAnimateProvider>
                  <FilterProvider>
                    <GetHouseProvider>
                      <MobileContolPanelProvider>
                        <SessionProvider session={session}>
                          <Layout>
                            <div className={`${poppins.className}`}>
                              <Component {...pageProps} />
                            </div>
                          </Layout>
                        </SessionProvider>
                      </MobileContolPanelProvider>
                    </GetHouseProvider>
                  </FilterProvider>
                </FilterFormAnimateProvider>
              </UserAccProvider>
            </SelectPlaceProvider>
          </PlaceListProvider>
        </SelectPopoverProvider>
      </SWRConfig>
    </>
  );
}
