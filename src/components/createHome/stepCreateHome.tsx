import { StepCreateHomeContext } from "@/contexts/stepCreate";
import { useContext } from "react";
import StepBall from "./stepBall";

interface StepCreateHomeProps{

}

const StepCreateHome = () =>{
  const {setStepCreate, stepCreate} = useContext(StepCreateHomeContext)
  return (
    <div className="w-full h-fit py-5 grid grid-cols-5 grid-rows-1">
      <StepBall step={1} currentStep={stepCreate} title="Choose your type house"/>
      <StepBall step={2} currentStep={stepCreate} title="House properties"/>
      <StepBall step={3} currentStep={stepCreate} title="Address"/>
      <StepBall step={4} currentStep={stepCreate} title="Amenities"/>
      <StepBall step={5} currentStep={stepCreate} title="Images"/>

    </div>
  )
}

export default StepCreateHome;