import { scheduleCreate } from "@/api-client/schedule";
import { house_ } from "@/models/house";
import { ReactNode, createContext, useState } from "react";


interface DashboardProps{
  children: ReactNode
}

interface DashboardData{
  selectOption: 'Schedule' | 'Piechart' | 'Barchart',
  setSelectOption: (payload:'Schedule' | 'Piechart' | 'Barchart')=>void,
  eventArr: scheduleCreate[],
  setEventArr: (payload:scheduleCreate[]) => void,
  selectHousePopup: house_ | undefined;
  setSelectHousePopup: (payload:house_|undefined)=> void
}

const DashboardDefaultData:DashboardData = {
  selectOption: 'Schedule',
  setSelectOption: ()=>{},
  eventArr: [],
  setEventArr: ()=>{},
  selectHousePopup: undefined,
  setSelectHousePopup: ()=>{}

}

export const DashboardContext = createContext<DashboardData>(DashboardDefaultData);

const DashboardProvider =({children}: DashboardProps)=>{
  const [selectOption, setSelectOption_] = useState<'Schedule' | 'Piechart' | 'Barchart'>(DashboardDefaultData.selectOption);
  const [eventArr, setEventArr_] = useState<scheduleCreate[]>(DashboardDefaultData.eventArr);
  const [selectHousePopup, setSelectHousePopup_] = useState<house_|undefined>(DashboardDefaultData.selectHousePopup);
  const setSelectOption = (payload:'Schedule' | 'Piechart' | 'Barchart') =>  setSelectOption_(payload);
  const setEventArr = (payload: scheduleCreate[]) => setEventArr_(payload);
  const setSelectHousePopup = (payload:house_|undefined)=> setSelectHousePopup_(payload);
  const DasboardDynamicData = {selectOption, setSelectOption, eventArr, setEventArr,
    selectHousePopup, setSelectHousePopup
  }

  return (
    <DashboardContext.Provider value={DasboardDynamicData}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider;