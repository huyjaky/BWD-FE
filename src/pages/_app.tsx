import axiosClient from '@/api-client/axiosClient';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SWRConfig value={{fetcher: url => axiosClient.get(url), shouldRetryOnError: false}}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
