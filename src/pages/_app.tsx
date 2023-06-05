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

import BillProvider from '@/contexts/bill';
import FilterProvider from '@/contexts/filter';
import FilterFormAnimateProvider from '@/contexts/filterFormAnimate';
import GetHouseProvider from '@/contexts/getHouse';
import IsShowPtProvider from '@/contexts/isShowPt';
import MobileContolPanelProvider from '@/contexts/mobileControlPanel';
import UserAccProvider from '@/contexts/userAcc';
import { SessionProvider } from 'next-auth/react';
import { Montserrat } from 'next/font/google';
import AmountTabHostingProviders from '@/contexts/amountTabHosting';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';

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
  const router = useRouter();

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
                        <BillProvider>
                          <SessionProvider session={session}>
                            <IsShowPtProvider>
                              <AmountTabHostingProviders>
                                <AnimatePresence mode='wait' >
                                  <motion.div
                                    key={router.route}
                                    initial='initialState'
                                    animate='animateState'
                                    exit='exitState'
                                    transition={{ duration: 1 }}
                                    variants={{
                                      initialState: {
                                        opacity: 0,
                                        clipPath: 'circle(0.2% at 100% 0)',
                                      },
                                      animateState: {
                                        opacity: 1,
                                        clipPath: 'circle(142.0% at 100% 0)',
                                      },
                                      exitState: {
                                        clipPath: 'circle(0.2% at 100% 0)',
                                      }
                                    }}
                                  >
                                    <Layout>
                                      <div className={`${monsterrat.className} bg-white
                                        `}>
                                        <Component {...pageProps} />
                                      </div>
                                    </Layout>
                                  </motion.div>
                                </AnimatePresence>
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
