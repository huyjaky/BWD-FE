import { createHouseFormContext } from "@/contexts/createHouseForm";
import { StepCreateHomeContext } from "@/contexts/stepCreate";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";



const FinishPage = () => {
  const [key, setKey] = useState(0);
  const {createHouseForm, imgArr, typeHouseId} = useContext(createHouseFormContext)
  const {stepCreate} = useContext(StepCreateHomeContext)

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [stepCreate]);

  const handleOnClick = (event:any) => {
    console.log(createHouseForm);
    console.log(imgArr);
    console.log(typeHouseId);
  }

  return (
    <div className="w-full h-full grid grid-cols-2 ">
      <div className="w-full h-full overflow-hidden flex">
        <video key={key} className="w-[calc(100%-15rem)] h-full m-auto" preload="auto" autoPlay={true} muted={true}>
          <source src="./Step3.mp4" className="w-full h-full" />
        </video>
      </div>
      <div className="w-full h-full flex">
        <motion.button onClick={handleOnClick} className="w-[30rem] h-[3rem] border-2 border-slate-600 m-auto">
          Done
        </motion.button>
      </div>
    </div>
  )
}

export default FinishPage;