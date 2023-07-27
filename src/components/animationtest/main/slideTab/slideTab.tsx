import { newsPost, typePost } from "@/utils/newsPost";
import { FreeMode, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from "swiper/react";
import LayoutAnimate from "../layout";
import TabSlide from "./tab";

interface EconomicProps {
  title: string;
  des: string;
  arrPost: typePost[]
}

const SlideTab = ({ title, des, arrPost }: EconomicProps) => {
  return (
    <LayoutAnimate>
      <div className="w-full h-fit flex-col flex">
        {/* title */}
        <div className="w-full h-fit text-[3rem] font-semibold pb-10">
          {title}
        </div>

        {/* des */}
        <div className="w-full h-fit text-[1.5rem]  pb-10">
          {des}
        </div>

        <div className="w-full h-fit ">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            pagination={false}
            modules={[FreeMode, Pagination, Scrollbar]}
            scrollbar={true}
            // className="mySwiper"
            style={{ height: 'fit-content' }}
          >
            {arrPost.map((item: typePost, index: number) => {
              return (
                <SwiperSlide key={index}><TabSlide post={item} /></SwiperSlide>
              )
            })}
          </Swiper>
        </div>

      </div>
    </LayoutAnimate>
  )
}

export default SlideTab;