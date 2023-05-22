import { house_ } from "@/models/house";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

interface HouseDetailProps {
  houseDetail: house_
}

const HouseDetail = ({ houseDetail }: HouseDetailProps) => {
  return (
    <div className="w-full h-fit">
      
    </div>
  )
}

let cachedHouseDetail: house_[] = []

export const getStaticPaths: GetStaticPaths = async () => {
  if (cachedHouseDetail.length == 0) {
    const slug = await fetch('http://localhost:4000/api/get/house/page');
    cachedHouseDetail = await slug.json();
  }

  const paths = cachedHouseDetail.map((house: house_) => ({ params: { slug: house.HouseId } }));
  return {
    paths,
    fallback: true
  }
}

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
  }
}

export default HouseDetail;
