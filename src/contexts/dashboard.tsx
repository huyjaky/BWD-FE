import { ReactNode, createContext, useState } from "react";


interface DashboardProps{
  children: ReactNode
}

interface DashboardData{
  selectOption: 'Schedule' | 'Piechart' | 'Barchart',
  setSelectOption: (payload:'Schedule' | 'Piechart' | 'Barchart')=>void
}

const DashboardDefaultData:DashboardData = {
  selectOption: 'Schedule',
  setSelectOption: ()=>{}
}

export const DashboardContext = createContext<DashboardData>(DashboardDefaultData);

const DashboardProvider =({children}: DashboardProps)=>{
  const [selectOption, setSelectOption_] = useState<'Schedule' | 'Piechart' | 'Barchart'>(DashboardDefaultData.selectOption);
  const setSelectOption = (payload:'Schedule' | 'Piechart' | 'Barchart') =>  setSelectOption_(payload);
  const DasboardDynamicData = {selectOption, setSelectOption}
  return (
    <DashboardContext.Provider value={DasboardDynamicData}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider;