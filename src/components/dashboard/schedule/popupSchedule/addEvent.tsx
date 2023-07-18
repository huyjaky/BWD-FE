

import { schedule } from "@/api-client/schedule";
import { userAccContext } from "@/contexts/userAcc";
import { DateSelectArg } from "@fullcalendar/core";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface EditEventsProps {
  selected: DateSelectArg | undefined,
  setIsAddEvent: Dispatch<SetStateAction<boolean>>
}


const AddEvent = ({ selected, setIsAddEvent }: EditEventsProps) => {
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
            <div className="font-semibold text-[3rem] mobile:text-[2rem]">Add event</div>
            <div>
              <input type="text" className={`outline-none
            border-b-2 border-slate-900 mobile:text-[19px] text-[2rem] `}
                value={edited}
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
              setEdited('')
              setIsAddEvent(false);
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
              if (!selected) return;
              const calenderApi = selected.view.calendar;
              calenderApi.addEvent({
                id: `${selected.startStr}-${edited}`,
                title: edited,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay
              })
              setEdited('')
              setIsAddEvent(false);
              const createSchedule = await schedule.createSchedule({
                EventId: '',
                HouseId: '',
                UserId: '',
                PhoneNumber: edited,
                Date: new Date(selected.startStr),
                Adults: 0,
                Childrens: 0,
                Infants: 0,
                Host: user.UserId,
                house: undefined,
              });

              if (createSchedule.status != 200) {
                console.log('have err with create schedule');
                return;
              }
            }}
            className="w-full h-full rounded-xl border-2 bg-red bg-[#f05123]
          text-white font-semibold
          ">
            Add
          </motion.button>
        </div>
      </div>
    </>
  )
}

export default AddEvent;




