import { typePost } from "@/utils/newsPost";
import moment from "moment";

interface TabSlideProps {
  post: typePost;
}

const TabSlide = ({ post }: TabSlideProps) => {
  return (
    <div className="w-[30rem] h-[36rem] rounded-2xl overflow-hidden bg-white">
      <div className="w-full h-[25rem] ">
        <img src={post.img} alt="" className="object-cover w-full h-full" />
      </div>
      <div className="w-full h-[calc(100%-25rem)] flex flex-col box-border px-4">
        <div className="w-full h-fit mt-5 text-[1.4rem] font-semibold
        max-h-[8.5rem]
        ">
          {post.title}
        </div>
        <div className="w-full h-fit text-[1rem] mt-3">
          {moment(post.date).format('MMMM Do, YYYY')}
        </div>
      </div>
    </div>
  )
}

export default TabSlide