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

import AmountTabHostingProviders from '@/contexts/amountTabHosting';
import BillProvider from '@/contexts/bill';
import FilterProvider from '@/contexts/filter';
import FilterFormAnimateProvider from '@/contexts/filterFormAnimate';
import GetHouseProvider from '@/contexts/getHouse';
import IsShowPtProvider from '@/contexts/isShowPt';
import MobileContolPanelProvider from '@/contexts/mobileControlPanel';
import UserAccProvider from '@/contexts/userAcc';
import { SessionProvider } from 'next-auth/react';
import { Montserrat } from 'next/font/google';
import { useRouter } from 'next/router';
import Head from 'next/head';

const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});

// const circular = Flow_Circular

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <>
      <Head>
        <title>Metaversus</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://stijndv.com" />
        <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
      </Head>
      <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
        <SelectPopoverProvider>
          <PlaceListProvider>
            <SelectPlaceProvider>
              <UserAccProvider>
                <FilterFormAnimateProvider>
                  <FilterProvider>
                    <GetHouseProvider>
                      <MobileContolPanelProvider>
                        <BillProvider>
                          <SessionProvider session={session}>
                            <IsShowPtProvider>
                              <AmountTabHostingProviders>
                                <Layout>
                                  <div
                                    className={`${monsterrat.className} bg-white
                                        `}
                                  >
                                    <Component {...pageProps} />
                                  </div>
                                </Layout>
                              </AmountTabHostingProviders>
                            </IsShowPtProvider>
                          </SessionProvider>
                        </BillProvider>
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
