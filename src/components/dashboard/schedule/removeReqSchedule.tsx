

import { ScheduleApi } from "@/api-client/scheduleApi";
import { selectHouseContext } from "@/contexts/selectHouse";
import { userAccContext } from "@/contexts/userAcc";
import { EventClickArg } from "@fullcalendar/core";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import RemoveEvent from "./panelPopup/removeEvent";
import EditEvents from "./panelPopup/editEvent";


interface RemoveReqProps {
  isRemoveReq: boolean | undefined;
  setIsRemoveReq: Dispatch<SetStateAction<boolean | undefined>>,
  selectedRemove: EventClickArg | undefined
}

const RemoveReqSchedule = ({ isRemoveReq, setIsRemoveReq, selectedRemove }: RemoveReqProps) => {
  const { user } = useContext(userAccContext)
  const { selectHouse, setSelectHouse } = useContext(selectHouseContext)
  const [inputPass, setInputPass] = useState<string>('');
  const [isEdit, setIsEdit] = useState<'delete' | 'edit'>('edit');
  const [isTruePass, setIsTruePass] = useState<boolean>(true);

  useEffect(() => { }, [isTruePass])
  return (
    <>
      <div className="w-full h-[5rem]  grid grid-cols-2 grid-rows-1 gap-x-5 mb-5" >
        <div
          onClick={event => setIsEdit('edit')}
          className="w-full h-full flex bg-white rounded-xl">
          <div className="w-fit h-fit m-auto">
            <span className="font-semibold text-[25px]">
              Edit
            </span>
          </div>
        </div>

        <div
          onClick={event => setIsEdit('delete')}
          className="w-full h-full flex bg-white rounded-xl">
          <div className="w-fit h-fit m-auto">
            <span className="font-semibold text-[25px]">
              Delete
            </span>
          </div>
        </div>

      </div>
      <AnimatePresence mode="wait">

        <motion.div
          key={isEdit}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-fit h-fit bg-white mobile:w-screen mobile:h-screen
    flex flex-col mobile:p-0 p-5 rounded-xl ">
          {isEdit === 'edit' ?
            <EditEvents isRemoveReq={isRemoveReq} selectedRemove={selectedRemove} setIsRemoveReq={setIsRemoveReq} />
            :
            <RemoveEvent isRemoveReq={isRemoveReq} selectedRemove={selectedRemove}
              setIsRemoveReq={setIsRemoveReq} />
          }
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default RemoveReqSchedule;