import FooterMainRes from '@/components/footers/footerMainRes';
import FooterRooms from '@/components/footers/footerRooms';
import Bill from '@/components/houseDetail/bill';
import Host from '@/components/houseDetail/host/host';
import MapBox from '@/components/houseDetail/map';
import Picture from '@/components/houseDetail/picture';
import ShowAllHouse from '@/components/houseDetail/showAllHousePt/showAllHouse';
import TitleHouse from '@/components/houseDetail/titleHouse';
import Auth from '@/components/layouts/auth';
import Carousel from '@/components/main/showHouse/carousel';
import HeaderMain from '@/components/rootMaskHeader/headerMain';
import { IsShowPtContext } from '@/contexts/isShowPt';
import { house_ } from '@/models/house';
import { NextPageWithLayout } from '@/models/layoutprops';
import { AnimatePresence } from 'framer-motion';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Montserrat } from 'next/font/google';
import Head from 'next/head';
import { useContext } from 'react';
import { BiMenu } from 'react-icons/bi';

interface HouseDetailProps {
  houseDetail: house_;
  keyMapBox: string;
}
const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});

const HouseDetail: NextPageWithLayout<HouseDetailProps> = ({
  houseDetail,
  keyMapBox
}: HouseDetailProps) => {
  const { setIsShowAllPt } = useContext(IsShowPtContext);
  const handleOnClick = () => {
    setIsShowAllPt(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <Head>
        <script
          type='text/javascript'
          src={`https://www.bing.com/api/maps/mapcontrol?key=AiWimzL8WC5fWxhKerTLiSvd63qgv22WhCiBLgm63xMJ-nn1Mv9SMqYpLPB4nkMI`}
          async
          defer
        ></script>
      </Head>
      <div className="w-full h-fit">
        <main className={`${monsterrat.className} relative box-border`} id="root">
          <AnimatePresence initial={false}>
            <HeaderMain />
          </AnimatePresence>

          <div
            className="w-[1150px] h-fit
          tablet:w-screen mobile:w-screen mobile:px-4
          box-border m-auto"
          >
            <TitleHouse title={houseDetail.Title} address={houseDetail.address} />

            <Picture arrImg={houseDetail.arrImg} />
            <div className="w-full h-[500px] laptop:hidden desktop:hidden flex justify-center box-border relative">
              <Carousel arrImg={houseDetail.arrImg} houseId={houseDetail.HouseId} />
              <div
                onClick={handleOnClick}
                className='absolute right-4 bottom-4 w-fit h-fit
              rounded-xl p-3
               bg-white z-50 flex items-center'>
                <BiMenu className="text-[24px] " />
                <span className="text-[19px]">Show all photos</span>
              </div>
            </div>
            <ShowAllHouse arrImg={houseDetail.arrImg} />
            <div className="w-full h-fit mt-10">
              <div className="w-full h-fit flex box-border mobile:flex-col">
                <Host userAcc={houseDetail.useracc} placeOffer={houseDetail.placeOffer} />
                <article className="flex-[5] ml-5">
                  <Bill houseDetail={houseDetail} />
                </article>
              </div>
            </div>

            <MapBox
              latitude={houseDetail.address.latitude}
              longitude={houseDetail.address.longitude}
              keyMapBox={keyMapBox}
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

HouseDetail.Layout = Auth;

export const getStaticPaths: GetStaticPaths = async () => {
  if (cachedHouseDetail.length == 0) {
    const slug = await fetch('http://localhost:4000/api/get/house/page');
    cachedHouseDetail = await slug.json();
  }

  const paths = cachedHouseDetail.map((house: house_) => ({ params: { slug: house.HouseId } }));
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (cachedHouseDetail.length == 0) {
    const slug = await fetch('http://localhost:4000/api/get/house/page');
    cachedHouseDetail = await slug.json();
  }
  const houseDetailData = cachedHouseDetail.find((house: house_) => house.HouseId === params?.slug);
  const keyMapBox = process.env.ACCESS_TOKEN_MAPBOX;
  return {
    props: {
      houseDetail: houseDetailData,
      keyMapBox: keyMapBox
    },
    revalidate: 60
  };
};

export default HouseDetail;
