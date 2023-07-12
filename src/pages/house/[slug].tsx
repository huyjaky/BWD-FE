import FooterMainRes from '@/components/footers/footerMainRes';
import FooterRooms from '@/components/footers/footerRooms';
import Bill from '@/components/houseDetail/bill';
import Host from '@/components/houseDetail/host/host';
import MapBox from '@/components/houseDetail/map';
import Picture from '@/components/houseDetail/picture';
import ShowAllHouse from '@/components/houseDetail/showAllHousePt/showAllHouse';
import TitleHouse from '@/components/houseDetail/titleHouse';
import AuthWithAnimate from '@/components/layouts/authWithAnimate';
import Carousel from '@/components/main/showHouse/carousel';
import HeaderMain from '@/components/rootMaskHeader/headerMain';
import { IsShowPtContext } from '@/contexts/isShowPt';
import { house_ } from '@/models/house';
import { NextPageWithLayout } from '@/models/layoutprops';
import { initializeSSR } from 'bing-maps-loader';
import { AnimatePresence } from 'framer-motion';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Montserrat } from 'next/font/google';
import { useContext, useEffect } from 'react';
import { BiMenu } from 'react-icons/bi';
import https from 'https'
import fetch from 'node-fetch';
interface HouseDetailProps {
  houseDetail: house_;
  keyMapBing: string;
  link: string;
}
const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});

const HouseDetail: NextPageWithLayout<HouseDetailProps> = ({
  houseDetail,
  keyMapBing,
  link
}: HouseDetailProps) => {
  const { setIsShowAllPt } = useContext(IsShowPtContext);
  const handleOnClick = () => {
    setIsShowAllPt(true);
    document.body.style.overflow = 'hidden';
  };
  initializeSSR();
  useEffect(() => {
    window.scrollTo(0, 0);

  }, [])

  return (
    <>
      <div className="w-full h-fit">
        <main className={`${monsterrat.className} relative box-border`} id="root">
          <AnimatePresence initial={false}>
            <HeaderMain keyMapBing='' />
          </AnimatePresence>

          <div
            className="w-[1150px] h-fit
          tablet:w-screen mobile:w-screen mobile:px-4
          box-border m-auto"
          >
            <TitleHouse title={houseDetail?.Title} address={houseDetail.address} />

            <Picture arrImg={houseDetail.arrImg} />
            <div className="w-full h-[32rem] laptop:hidden desktop:hidden flex justify-center box-border relative z-10">
              <Carousel arrImg={houseDetail.arrImg} houseId={houseDetail.HouseId} />
              <div
                onClick={handleOnClick}
                className="absolute right-4 bottom-4 w-fit h-fit
              rounded-xl p-3
              bg-white z-50 flex items-center"
              >
                <BiMenu className="text-[2rem] " />
                <span className="text-[19px]">Show all photos</span>
              </div>
            </div>
            <ShowAllHouse arrImg={houseDetail.arrImg} />
            <div className="w-full h-fit mt-10">
              <div className="w-full h-fit flex box-border mobile:flex-col">
                <Host
                  houseDetail={houseDetail}
                  description={houseDetail.Description}
                  link={link}
                  userAcc={houseDetail.useracc}
                  placeOffer={houseDetail.placeOffer}
                />
                <article className="flex-[5] ml-5">
                  <Bill houseDetail={houseDetail} />
                </article>
              </div>
            </div>

            <MapBox
              latitude={houseDetail.address.latitude}
              longitude={houseDetail.address.longitude}
              keyMapBing={keyMapBing}
            />
          </div>
          <FooterRooms />
          <FooterMainRes />
        </main>
      </div>
    </>
  );
};

let cachedHouseDetail: house_[] = [];

HouseDetail.Layout = AuthWithAnimate;

export const getStaticPaths: GetStaticPaths = async () => {
  const link = process.env.NEXTAUTH_URL;
  initializeSSR();

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    agent
  }

  if (cachedHouseDetail.length == 0) {
    const slug = await fetch(`${link}/api/get/house/page`, options);
    cachedHouseDetail = await slug.json() as house_[];
  }

  const paths = cachedHouseDetail.map((house: house_) => ({ params: { slug: house.HouseId } }));
  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  initializeSSR();
  const link = process.env.NEXTAUTH_URL;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    agent
  }

  if (cachedHouseDetail.length == 0) {
    const slug = await fetch(`${link}/api/get/house/page`, options);
    cachedHouseDetail = await slug.json() as house_[];
  }

  const houseDetailData = cachedHouseDetail.find((house: house_) => house.HouseId === params?.slug);
  const keyMapBing = process.env.ACCESS_TOKEN_BINGMAP;
  return {
    props: {
      houseDetail: houseDetailData,
      keyMapBing: keyMapBing,
      link: link
    },
    revalidate: 60
  };
};

export default HouseDetail;
