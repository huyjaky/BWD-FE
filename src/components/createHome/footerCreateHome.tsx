import { createHouseFormContext } from "@/contexts/createHouseForm";
import { StepCreateHomeContext } from "@/contexts/stepCreate";
import { motion } from "framer-motion";
import { useContext } from "react";



const FooterCreateHome = () => {
  const { createHouseForm, imgArr, typeHouseId } = useContext(createHouseFormContext);
  const { stepCreate, setStepCreate } = useContext(StepCreateHomeContext)


  return (
    <div className="fixed w-full bottom-0 border-t-2 h-[5rem] bg-white">
      <div className="w-full h-full grid grid-cols-2">
        {/* back */}
        <div className="w-full h-full flex justify-start box-border py-2 pl-5">
          <motion.button
            onClick={() => { setStepCreate(stepCreate < 2 ? stepCreate : stepCreate - 1) }}
            className="h-full w-fit px-7">
            <span className="underline font-semibold text-[1.5rem]">Back</span>
          </motion.button>
        </div>

        {/* next */}
        <div className="w-full h-full flex justify-end box-border py-2 pr-5">
          <motion.button
            onClick={(event) => {
                setStepCreate(stepCreate > 5 ? stepCreate : stepCreate + 1)
            }}
            disabled={stepCreate === 5}
            className="h-full w-fit px-7 bg-red-500 rounded-xl">
            <span className=" font-semibold text-[1.5rem] rounded-xl  text-white
            w-full h-full
            ">Next</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default FooterCreateHome;