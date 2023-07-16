

import { ScheduleApi } from "@/api-client/scheduleApi";
import { userAccContext } from "@/contexts/userAcc";
import { EventClickArg } from "@fullcalendar/core";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface EditEventsProps {
  isRemoveReq: boolean | undefined;
  setIsRemoveReq: Dispatch<SetStateAction<boolean | undefined>>,
  selectedRemove: EventClickArg | undefined,

}


const EditEvents = ({ isRemoveReq, selectedRemove, setIsRemoveReq }: EditEventsProps) => {
  const { user } = useContext(userAccContext)
  const [edited, setEdited] = useState<string>('');
  const [isTruePass, setIsTruePass] = useState<boolean>(true);

  useEffect(() => { }, [isTruePass])
  return (
    <>
      <div className="w-full m-auto flex">
        <div className="m-auto flex">
          <div className="w-[9.375rem] h-fit mobile:h-full">
            <img src={`/api/img/path/${user.Image}`} alt="" className="rounded-full" />
          </div>

          <div className="w-fit h-full grid grid-cols-1 grid-rows-2 ml-[2rem] m-auto gap-5">
            <div className="font-semibold text-[3rem] mobile:text-[2rem]">Edit title</div>
            <div>
              <input type="text" className={`outline-none
            border-b-2 border-slate-900
            ${isTruePass ? '' : 'border-red-600'} mobile:text-[19px] text-[2rem] `} placeholder={selectedRemove?.event.title}
                onChange={(event) => setEdited(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[6.25rem]  grid grid-cols-2 grid-rows-1 ">
        <div className="w-full h-full box-border p-3">
          <motion.button
            onClick={(event) => {
              setIsRemoveReq(false);
            }}
            className="w-full h-full rounded-xl border-2 font-semibold">
            Cancel
          </motion.button>
        </div>
        <div className="w-full h-full box-border p-3">
          <motion.button
            type="button"
            onClick={async (event) => {
              // selectedRemove?.event.;
              setIsRemoveReq(false);
              console.log(edited);
              try {
                if (selectedRemove?.event?.id) {
                  ScheduleApi.EditTitleHost(selectedRemove?.event?.id, edited);
                  selectedRemove.event.setProp('title', edited);
                }
              } catch (error) {
                console.log(error);
                return error
              }
            }}
            className="w-full h-full rounded-xl border-2 bg-red bg-[#f05123]
          text-white font-semibold
          ">
            Edit
          </motion.button>
        </div>
      </div>
    </>
  )
}

export default EditEvents;
