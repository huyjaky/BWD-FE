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
import NextNProgress from 'nextjs-progressbar';

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
import Head from 'next/head';
import Link from 'next/link';

const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});


export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <>
      <Head>
        <title>Olympus</title>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="icon" href="/favicon.ico" />
        <Link rel="preconnect" href="https://stijndv.com" />
        <Link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" /> */}
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
                                    <NextNProgress color='#B80F0A' height={7} />
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
