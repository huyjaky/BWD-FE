import Step11CHome from '@/components/CreateHome/Step/Step11CHome';
import TabShowHouse from '@/components/main/tabShowHouse/tabShowHouse';
import { useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { EffectCoverflow, Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Test = () => {
  return (
    <>
      <div className="slideTabShowHouse">{/* <TabShowHouse /> */}</div>
    </>
  );
};

export default Test;
