
import { DateSelectArg, EventApi, EventClickArg } from "@fullcalendar/core";
// import { default as dayGridPlugin, default as timeGridPlugin } from '@fullcalendar/daygrid'; // a plugin!
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useState } from "react";

const Schedule = () => {

  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const handleDateClick = (selected: DateSelectArg) => {
    const title = prompt('please enter');
    const calenderApi = selected.view.calendar;
    calenderApi.unselect();

  }

  const handleEventClick = (selected: EventClickArg) => {
    
  }
  return (
    <div className="w-full h-full ">

      <FullCalendar
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
        initialEvents={[
          { id: '123', title: 'first days', date: '2022-09-12' },
          { id: '12', title: 'second days', date: '2022-09-12' },
          { id: '1', title: 'third days', date: '2022-09-12' },
        ]}
      />
    </div>
  )
}

export default Schedule;