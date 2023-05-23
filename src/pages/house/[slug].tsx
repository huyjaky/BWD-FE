import FooterMainRes from '@/components/footers/footerMainRes';
import FooterRooms from '@/components/footers/footerRooms';
import Picture from '@/components/houseDetail/picture';
import ShowAllHouse from '@/components/houseDetail/showAllHousePt/showAllHouse';
import TitleHouse from '@/components/houseDetail/titleHouse';
import HeaderMain from '@/components/rootMaskHeader/headerMain';
import { house_ } from '@/models/house';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Montserrat } from 'next/font/google';
import { NextApiRequest } from 'next';
import { NextPageWithLayout } from '@/models/layoutprops';
import Auth from '@/components/layouts/auth';

interface HouseDetailProps {
  houseDetail: house_;
}
const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});

const HouseDetail: NextPageWithLayout<HouseDetailProps> = ({ houseDetail }: HouseDetailProps) => {
  return (
    <div className="w-full h-fit">
      <>
        <main className={`${monsterrat.className} relative overflow-hidden box-border`} id="root">
          <HeaderMain />
          <div className="w-[1150px] h-fit  mobile:px-[20px] box-border m-auto">
            <TitleHouse title={houseDetail.Title} address={houseDetail.address} />

            <Picture arrImg={houseDetail.arrImg} />
            <ShowAllHouse arrImg={houseDetail.arrImg}/>
          </div>
          <FooterRooms />
          <FooterMainRes />
        </main>
      </>
    </div>
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
  return {
    props: {
      houseDetail: houseDetailData
    },
    revalidate: 60
  };
};

export default HouseDetail;
