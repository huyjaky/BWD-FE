import { newsPost, typePost } from "@/utils/newsPost";
import { motion } from "framer-motion";
import moment from "moment";
import LayoutAnimate from "./layout";



const LatestNews = () => {
  return (
    <LayoutAnimate>
      <div className="w-full h-fit flex flex-col">

        {/* title */}
        <div className="w-full h-fit text-[3rem] font-semibold pb-10">
          Latest news
        </div>

        <div className="w-full h-fit grid grid-cols-newsBox gap-x-[4rem] gap-y-4">
          {newsPost.latest.map((item: typePost, index: number) => {
            return (
              <div key={index} className="w-full h-full">
                <div className="w-full h-full grid grid-cols-2 grid-rows-1 gap-x-4">
                  <motion.div
                    whileInView={{
                      opacity: [0, 1], y: [200, 0], transition: {
                        duration: .8, type: 'tween', delay: index * .2
                      }
                    }}

                    className="w-full h-full rounded-3xl overflow-hidden">
                    <img src={item.img} alt="" />
                  </motion.div>
                  <div className="w-full h-full box-border py-3">
                    <div className="w-full h-fit mb-5">
                      <span className="text-[1.5rem] font-semibold">
                        {item.title}
                      </span>
                    </div>
                    <div className="w-full h-fit">
                      {moment(item.date).format('MMMM Do, YYYY')}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </LayoutAnimate>
  )
}

export default LatestNews;