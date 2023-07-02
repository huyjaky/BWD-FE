import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { EffectCoverflow, Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const SlideShowHouse = () => {
  const arrTemp: number[] = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="">
      <h1 className="heading">Flower Gallery</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          enabled: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container" style={{width: "calc(100vw-80px)", height: '600px'}}
      >
        {arrTemp.map((item: number, index:number)=>{
          return (
            <SwiperSlide key={index} style={{width: '400px'}}>
              <img src={`https://i.pinimg.com/564x/37/ff/f6/37fff6210e4f360778131f6cab61d007.jpg`} alt=""
              className="object-cover" style={{width: '400px', height: '500px'}}
              />
            </SwiperSlide>
          )
        })}

        <div className="slider-controler tablet:hidden mobile:hidden">
          <div className="swiper-button-prev slider-arrow">
            <GrLinkPrevious />
          </div>
          <div className="swiper-button-next slider-arrow rounded-full">
            <GrLinkNext />
          </div>
          <div className="swiper-pagination" style={{position: 'relative', bottom: '-10px'}}></div>
        </div>
      </Swiper>
    </div>
  );
};

export default SlideShowHouse;

