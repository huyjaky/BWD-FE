
import { scheduleCreate } from "@/api-client/schedule";
import { ScheduleApi } from "@/api-client/scheduleApi";
import { variants } from "@/components/main/showHouse/variantsShowHouse";
import { userAccContext } from "@/contexts/userAcc";
import { DateSelectArg, EventApi, EventClickArg, formatDate } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import RemoveReqSchedule from "./removeReqSchedule";

const Schedule = () => {

  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const calendarRef = useRef<FullCalendar | null>(null);
  const { user } = useContext(userAccContext)
  const [isRemoveReq, setIsRemoveReq] = useState<boolean | undefined>(false);
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);
  const [selectedRemove, setSelectedRemove] = useState<EventClickArg>();
  const removeReqPanel = useRef<HTMLDivElement>(null);
  const handleDateClick = (selected: DateSelectArg) => {
    const title = prompt('please enter');
    const calenderApi = selected.view.calendar;
    calenderApi.unselect();

    if (title) {
      calenderApi.addEvent({
        id: `${selected.startStr}-${title}`,
        title: title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay
      })
    }
  }

  const handleEventClick = (selected: EventClickArg) => {
    // if (window.confirm('delete')) {
    //   selected.event.remove();
    // }
    setSelectedRemove(selected);
    setIsRemoveReq(true);
  }


  const fetchSchedule = async () => {
    try {
      if (user.UserId === 'none user') return;
      const schedule = await ScheduleApi.scheduleHost(user.UserId);

      const calendarApi = calendarRef?.current?.getApi();
      if (!isFirstLoading) return
      setIsFirstLoading(false);
      if (schedule.status == 200) {
        const setEv = await schedule.data.map((item: scheduleCreate, index: number) => {
          const newEvent = {
            title: item.PhoneNumber,
            start: item.Date + '',
            id: item.HouseId,
          };
          if (calendarApi) {
            calendarApi.addEvent(newEvent);
          }
          return item;
        })
      }

    } catch (error) {
      console.log(error);
      return;
    }
  }

  function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const handleOnClickOutSideRemoveReqPanel = (event: any) => {
    const isClickInSide = removeReqPanel.current?.contains(event.target);
    if (!isClickInSide) {
      setIsRemoveReq(false);
      return;
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [user])

  useEffect(() => {
    console.log('crev', currentEvents);
  }, [currentEvents, selectedRemove])

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          variants={variants}
          animate={isRemoveReq ? 'showMask' : 'hiddenMask'}
          onClick={handleOnClickOutSideRemoveReqPanel}
          className="fixed w-screen h-screen bg-mask z-50 top-0 left-0" >
          <div className='w-fit h-fit m-auto' ref={removeReqPanel}>
            <RemoveReqSchedule selectedRemove={selectedRemove} setIsRemoveReq={setIsRemoveReq} isRemoveReq={isRemoveReq} />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="w-full h-full flex">
        <div className="w-[15rem] h-full  overflow-scroll overflow-x-hidden mobile:hidden">
          {currentEvents.map((item: EventApi, index: number) => {
            return (
              <div key={index}>
                <div className="w-ful h-[8rem]   box-border p-4">
                  <div className="w-full h-full bg-[#6699CC] rounded-lg p-2">
                    <div className="w-fit h-fit flex flex-col text-[#FAE8EB]  ">
                      <div className="mb-2 font-semibold text-[20px]">
                        {item.title}
                      </div>
                      <div>
                        {formatDate(item.startStr, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="w-[100%] h-full">

          <FullCalendar
            ref={calendarRef}
            height={'100%'}
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              listPlugin
            ]}
            headerToolbar={{
              left: 'prev, next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(event) => { setCurrentEvents(event) }}
            eventChange={(event) => {
              console.log(event);
              const eventChange = new Date(formatDate(event.event.startStr, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }));
              try {
                ScheduleApi.scheduleHostModifier(event.event.id, addDays(eventChange, 1));
              } catch (error) {
                console.log(error);
                return { error }
              }
              console.log(event);
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Schedule;