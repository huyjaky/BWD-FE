import Head from "next/head";
import Script from "next/script";
import { ReactNode } from "react"

interface MapOptionsProps {
  children: ReactNode;
}

const MapOptions = ({ children }: MapOptionsProps) => {
  return (
    <>
      <Head>
        <Script>
          {` window["GetMapCallback"] = () => (window["MicrosoftMapsLoaded"] = true); `}
        </Script>
      </Head>
      {children}
      <Script
        src="https://www.bing.com/api/maps/mapcontrol?callback=GetMapCallback&amp;key=AiWimzL8WC5fWxhKerTLiSvd63qgv22WhCiBLgm63xMJ-nn1Mv9SMqYpLPB4nkMI"
        async={true}
        defer={true}
      />
    </>
  )
}

export default MapOptions;