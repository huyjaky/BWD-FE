import { StepCreateHomeContext } from "@/contexts/stepCreate";
import { useContext } from "react";
import StepBall from "./stepBall";

interface StepCreateHomeProps{

}

const StepCreateHome = () =>{
  const {setStepCreate, stepCreate} = useContext(StepCreateHomeContext)
  return (
    <div className="w-full h-fit py-5 grid grid-cols-3 grid-rows-1">
      <StepBall step={1} currentStep={stepCreate} title="House properties"/>
      <StepBall step={2} currentStep={stepCreate} title="Address"/>
      <StepBall step={3} currentStep={stepCreate} title="Images"/>

    </div>
  )
}

export default StepCreateHome;