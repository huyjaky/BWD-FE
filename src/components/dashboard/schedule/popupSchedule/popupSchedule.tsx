import { DashboardContext } from "@/contexts/dashboard";
import { Dispatch, RefObject, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import LayoutTitle from "./layoutTitle";
import { motion } from "framer-motion";

interface PopupScheduleProps {
  isShowPopup: boolean;
  setIsShowPopup: Dispatch<SetStateAction<boolean>>
}

const PopupSchedule = ({isShowPopup, setIsShowPopup}:PopupScheduleProps) => {
  const { selectHousePopup, setSelectHousePopup } = useContext(DashboardContext)
  const popupHouse = useRef<HTMLDivElement>(null);
  const { x, y } = useFollowPointer(popupHouse);

  return (
    <motion.div
      ref={popupHouse}
      animate={{ x, y }}
      className={`w-fit fixed z-50 h-fit ${isShowPopup ? '' : 'hidden'}
      ${selectHousePopup && selectHousePopup.HouseId ? '' : 'hidden'}`}
    >
      <div className="w-[20rem] h-[15rem] rounded-xl overflow-hidden">
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
                {selectHousePopup?.Capacity + 'm'}&sup2;
              </LayoutTitle>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PopupSchedule;

function useFollowPointer(ref: RefObject<HTMLElement>) {
  const [point, setPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;

      const x = clientX - element.offsetLeft - element.offsetWidth / 2 + 200;
      const y = clientY - element.offsetTop - element.offsetHeight / 2 - 150;

      setPoint({ x, y });
    };

    window.addEventListener("mousemove", handlePointerMove);

    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  return point;
}

