import { DashboardContext } from "@/contexts/dashboard";
import { useContext, useEffect } from "react";
import LayoutTitle from "./layoutTitle";


const PopupSchedule = () => {
  const { selectHousePopup, setSelectHousePopup } = useContext(DashboardContext)
  useEffect(() => {
  }, [selectHousePopup])

  return (
    <div className="w-[20rem] h-[15rem]  rounded-xl overflow-hidden">
      <div className="w-full h-full relative">
        <img src={"/api/img/path/" + selectHousePopup?.arrImg[0]?.Path} alt="" className="w-full h-full
object-cover
        " />
        <div className="absolute w-full h-[5rem] bottom-0 left-0 backdrop-blur-sm box-border px-2
        rounded-b-xl
        ">
          <div className="w-full h-full grid grid-cols-2 grid-rows-3 gap-y-5
          text-[#de741c] font-semibold">
            <LayoutTitle leftRight="left">
              {selectHousePopup?.address.title}
            </LayoutTitle>
            <LayoutTitle leftRight="right">
              &#36;{selectHousePopup?.Price}
            </LayoutTitle>
            <LayoutTitle leftRight="left">
              {selectHousePopup?.NumsOfBath + ' Baths,'} {selectHousePopup?.NumsOfBed + ' Beds'}
            </LayoutTitle>
            <LayoutTitle leftRight="right">
              {selectHousePopup?.Capacity+'m'}&sup2;
            </LayoutTitle>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupSchedule;