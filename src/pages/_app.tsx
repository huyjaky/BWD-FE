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
import '../styles/sass/main.scss'

import NextNProgress from 'nextjs-progressbar';
import { SWRConfig } from 'swr';

import AmountTabHostingProviders from '@/contexts/amountTabHosting';
import BillProvider from '@/contexts/bill';
import CreateHouseFormProvider from '@/contexts/createHouseForm';
import FilterProvider from '@/contexts/filter';
import FilterFormAnimateProvider from '@/contexts/filterFormAnimate';
import GetHouseProvider from '@/contexts/getHouse';
import HouseTempProvider from '@/contexts/houseTemp';
import ImgFileProvider from '@/contexts/imgFile';
import IsShowPtProvider from '@/contexts/isShowPt';
import MobileContolPanelProvider from '@/contexts/mobileControlPanel';
import SelectHouseProvider from '@/contexts/selectHouse';
import StepCreateHomeProvider from '@/contexts/stepCreate';
import UserAccProvider from '@/contexts/userAcc';
import { SessionProvider } from 'next-auth/react';
import { Montserrat } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import DashboardProvider from '@/contexts/dashboard';
import IsLoadingAnimateProvider from '@/contexts/isLoadingAnimate';


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
        <title>Candy</title>
        <Script
          src="https://www.bing.com/api/maps/mapcontrol?callback=GetMapCallback&amp;key=AiWimzL8WC5fWxhKerTLiSvd63qgv22WhCiBLgm63xMJ-nn1Mv9SMqYpLPB4nkMI"
          async={true}
          defer={true}
        />
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
                                <ImgFileProvider>
                                  <SelectHouseProvider>
                                    <HouseTempProvider>
                                      <StepCreateHomeProvider>
                                        <CreateHouseFormProvider>
                                          <DashboardProvider>
                                            <IsLoadingAnimateProvider>
                                              <Layout>
                                                <div
                                                  className={`${monsterrat.className} bg-white
                                        `}
                                                >
                                                  <NextNProgress color="#B80F0A" height={7} />
                                                  <Component {...pageProps} />
                                                </div>
                                              </Layout>
                                            </IsLoadingAnimateProvider>
                                          </DashboardProvider>
                                        </CreateHouseFormProvider>
                                      </StepCreateHomeProvider>
                                    </HouseTempProvider>
                                  </SelectHouseProvider>
                                </ImgFileProvider>
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
