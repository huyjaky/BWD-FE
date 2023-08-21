
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
import { RefObject, useContext, useEffect, useRef, useState } from "react";
import RemoveReqSchedule from "./removeReqSchedule";
import { DashboardContext } from "@/contexts/dashboard";
import PopupSchedule from "./popupSchedule/popupSchedule";
import AddEvent from "./popupSchedule/addEvent";
import { house_ } from "@/models/house";

const Schedule = () => {

  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const calendarRef = useRef<FullCalendar | null>(null);
  const { user } = useContext(userAccContext)
  const [isRemoveReq, setIsRemoveReq] = useState<boolean | undefined>(false);
  const { eventArr, setEventArr, setSelectHousePopup, selectHousePopup } = useContext(DashboardContext)
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);
  const [selectedRemove, setSelectedRemove] = useState<EventClickArg>();

  const removeReqPanel = useRef<HTMLDivElement>(null);


  const [selectAddEvent, setSelectAddEvent] = useState<DateSelectArg>()
  const [isAddEvent, setIsAddEvent] = useState<boolean>(false);
  const addEventPanell = useRef<HTMLDivElement>(null)




  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [keyPopup, setKeyPopup] = useState<number>(-1);

  const handleDateClick = (selected: DateSelectArg) => {
    console.log('test', selected);

    setSelectAddEvent(selected);
    setIsAddEvent(true);
  }

  const handleEventClick = (selected: EventClickArg) => {
    // if (window.confirm('delete')) {
    //   selected.event.remove();
    // }
    setSelectedRemove(selected);
    setIsRemoveReq(true);
  }

  function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const handleOnClickOutSideAddEventPanel = (event: any) => {
    const isClickInSide = addEventPanell.current?.contains(event.target);
    if (!isClickInSide) {
      setIsAddEvent(false);
      return;
    } else {
      return;
    }
  };

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
    const addEv = async () => {
      if (eventArr.length == 0) return;
      const calendarApi = calendarRef?.current?.getApi();
      console.log('event', eventArr);
      const setEv = await eventArr.map((item: scheduleCreate, index: number) => {
        if (item.HouseId !== null) {
          const newEvent = {
            title: item.PhoneNumber,
            start: item.Date + '',
            id: item.EventId,
            color: '#ee6457'
          };
          if (calendarApi) {
            calendarApi.addEvent(newEvent);
          }
        } else {
          const newEvent = {
            title: item.PhoneNumber,
            start: item.Date + '',
            id: item.EventId
          };
          if (calendarApi) {
            calendarApi.addEvent(newEvent);
          }
        }
        return item;
      })
    }
    addEv();
  }, [eventArr])


  useEffect(() => {
    console.log('crev', currentEvents);
  }, [currentEvents, selectedRemove])

  return (
    <>
      {/* <motion.div
        // ref={popupHouse}
        animate={{ x, y }}
        className={`w-fit fixed z-50 h-fit ${isShowPopup ? '' : 'hidden'}`}
      > */}
      <PopupSchedule isShowPopup={isShowPopup} setIsShowPopup={setIsShowPopup} />
      {/* </motion.div> */}

      <AnimatePresence initial={false}>
        <motion.div
          variants={variants}
          animate={isAddEvent ? 'showMask' : 'hiddenMask'}
          onClick={handleOnClickOutSideAddEventPanel}
          className="fixed w-screen h-screen bg-mask z-50 top-0 left-0" >
          <div className='w-fit h-fit m-auto bg-white mobile:w-screen mobile:h-screen
    flex flex-col mobile:p-0 p-5 rounded-xl ' ref={addEventPanell}>

            <AddEvent selected={selectAddEvent} setIsAddEvent={setIsAddEvent} />
          </div>
        </motion.div>
      </AnimatePresence>


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

      <div className="w-full h-full flex box-border ">
        <motion.div
          className="w-[15rem] h-[70vh] overflow-scroll overflow-x-hidden mobile:hidden">
          {currentEvents.map((item: EventApi, index: number) => {
            return (
              <div key={index}>
                <motion.div
                  onHoverStart={(event) => {
                    // if (!eventArr[index].house) return
                    if (eventArr[index]?.house) {
                      setKeyPopup(index);
                      setIsShowPopup(true);
                      setSelectHousePopup(eventArr[index].house)
                    } else {
                      setSelectHousePopup(undefined)
                    }
                    // if (eventArr[index].house !== undefined && eventArr[index].house?.length == 0) return;
                    // console.log(eventArr[index].house);
                    // setSelectHousePopup(eventArr[index]?.house[0]);
                  }}
                  onHoverEnd={(event) => { setIsShowPopup(false); setKeyPopup(-1) }}
                  className="w-ful h-[8rem]   box-border p-4">
                  <motion.div className={`w-full h-full ${eventArr[index]?.HouseId
                    ? 'bg-[#ee6457]' : 'bg-[#6699CC]'
                    } rounded-lg p-2 cursor-pointer`}>
                    <motion.div
                      onHoverStart={(event) => setIsShowPopup(true)}
                      className="w-fit h-fit flex flex-col text-[#FAE8EB]  ">
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
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            )
          })}
        </motion.div>
        <div className="w-[calc(100%-15rem)] h-full mobile:w-full">

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

            eventsSet={(event) => {
              setCurrentEvents(event);

            }}
            // eventChange={(event) => console.log(event)}
            eventChange={(event) => {
              const eventChange = new Date(formatDate(event.event.startStr, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }));
              try {
                ScheduleApi.scheduleHostModifier(event.event.id, { Date: addDays(eventChange, 1) });
              } catch (error) {
                console.log(error);
                return { error }
              }
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Schedule;




