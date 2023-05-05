import axiosClient from '@/api-client/axiosClient';
import EmptyLayout from '@/components/layouts/empty';
import { AppPropsWithLayout } from '@/models/layoutprops';
import '@/styles/globals.css';
import { SWRConfig } from 'swr';
import 'mapbox-gl/dist/mapbox-gl.css';
import SelectPopoverProvider from '@/contexts/selectPopover';
import PlaceListProvider from '@/contexts/placeList';
import SelectPlaceProvider from '@/contexts/selectPlace';

// const circular = Flow_Circular

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <>
      <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
        <SelectPopoverProvider>
          <PlaceListProvider>
            <SelectPlaceProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SelectPlaceProvider>
          </PlaceListProvider>
        </SelectPopoverProvider>
      </SWRConfig>
    </>
  );
}
