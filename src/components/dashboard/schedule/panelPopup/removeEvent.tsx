import { ScheduleApi } from "@/api-client/scheduleApi";
import { selectHouseContext } from "@/contexts/selectHouse";
import { userAccContext } from "@/contexts/userAcc";
import { EventClickArg } from "@fullcalendar/core";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface RemoveEventProps {
  isRemoveReq: boolean | undefined;
  setIsRemoveReq: Dispatch<SetStateAction<boolean | undefined>>,
  selectedRemove: EventClickArg | undefined
}


const RemoveEvent = ({isRemoveReq, selectedRemove, setIsRemoveReq}: RemoveEventProps) => {
  const { user } = useContext(userAccContext)
  const [inputPass, setInputPass] = useState<string>('');
  const [isTruePass, setIsTruePass] = useState<boolean>(true);

  useEffect(() => { }, [isTruePass])
  return (
    <>
      <div className="w-full m-auto flex">
        <div className="m-auto flex">
          <div className="w-[9.375rem] h-fit">
            <img src={`/api/img/path/${user.Image}`} alt="" className="rounded-full" />
          </div>

          <div className="w-fit h-full grid grid-cols-1 grid-rows-2 ml-[2rem] m-auto gap-5">
            <div className="font-semibold text-[3rem] mobile:text-[2rem]">Delete house</div>
            <div>
              <input type="password" className={`outline-none
            border-b-2 border-slate-900
            ${isTruePass ? '' : 'border-red-600'} mobile:text-[19px] text-[2rem] `} placeholder="Password"
                onChange={(event) => setInputPass(event.target.value)}
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
              if (inputPass === user.Password) {
                selectedRemove?.event.remove();
                setIsRemoveReq(false);
                try {
                  ScheduleApi.scheduleHostDelete(selectedRemove?.event?.id || '');
                } catch (error) {
                  console.log(error);
                  return error
                }
              }
            }}
            className="w-full h-full rounded-xl border-2 bg-red bg-[#f05123]
          text-white font-semibold
          ">
            Delete
          </motion.button>
        </div>
      </div>
    </>
  )
}

export default RemoveEvent;