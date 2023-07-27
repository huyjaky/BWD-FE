import { socials } from "@/constants";
import LayoutAnimate from "./layout";
import { motion } from "framer-motion";



const Contact = () => {
  return (
    <LayoutAnimate>
      <div className="w-full h-[36rem] grid grid-cols-contact gap-x-4 mobile:gap-y-4">
        {/* icon */}
        <div className="w-full h-full flex flex-col">
          <div className="w-fit h-fit text-[1.5rem] text-center m-auto">
            <span>Follow Airbnb for news and travel inspiration</span>
            <div className="grid grid-cols-4 mt-10">
              {socials.map((social) => (
                <div key={social.name} className="w-full h-full flex">
                  <img
                    src={social.url}
                    alt={social.name}
                    className="w-[2rem] h-[2rem] object-contain cursor-pointer fill-slate-900 m-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* image */}
        <div className="w-full h-full overflow-hidden rounded-2xl">
          <img src="/newPost/Rudi-Road-Trip_D4_ListingID-11463775_0907.webp" alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full h-full  overflow-hidden rounded-2xl">
          <img src="/newPost/210521_JChou_BChesky_JCP4282_FNL.webp" alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="w-fit h-fit text-[1.5rem] text-center m-auto">
            <span>Hear more from Co‑founder and CEO Brian Chesky</span>
            <div className="flex w-full h-fit mt-5 ">
              <motion.button className=" px-7 py-2 border-2 m-auto rounded-xl">
                <span>Learn more</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </LayoutAnimate>
  )
}

export default Contact;