import { ReactNode, createContext, useState } from "react";


interface StepCreateHomeProps {
  children: ReactNode;
}

interface StepCreateHomeData {
  stepCreate:number;
  setStepCreate: (payload:number)=>void
}

const StepCreateHomeDefaultData:StepCreateHomeData = {
  stepCreate:1,
  setStepCreate: ()=>{}
}

export const StepCreateHomeContext = createContext<StepCreateHomeData>(StepCreateHomeDefaultData);

const StepCreateHomeProvider = ({children}: StepCreateHomeProps) =>{
  const [stepCreate, setStepCreate_] = useState(StepCreateHomeDefaultData.stepCreate);
  const setStepCreate = (payload:number) => setStepCreate_(payload);

  const StepCreateHomeDynamicData = {stepCreate, setStepCreate};

  return <StepCreateHomeContext.Provider value={StepCreateHomeDynamicData}>
    {children}
  </StepCreateHomeContext.Provider>
}

export default StepCreateHomeProvider;
