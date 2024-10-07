import React from 'react';
import './App.css'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  viewWeek,
  viewDay,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar'

// Remember to also set your styles to the wrapper element .sx-react-calendar-wrapper
// For example:
// .sx-react-calendar-wrapper {
//   width: 100%;
//   height: 800px;
//   max-height:90vh;
// }
//
// For best mobile experience, you might consider 100vw and 100% of the container element's height
import '@schedule-x/theme-default/dist/index.css'
import CustomTimeGridEvent from "./components/CustomTimeGridEvent.tsx";
import CustomDateGridEvent from "./components/CustomDateGridEvent.tsx";
const todayDay = (new Date()).toISOString().split('T')[0];

function App() {

  const calendar = useCalendarApp({
    defaultView: viewWeek.name,
    selectedDate: todayDay,
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    plugins: [],
    callbacks: {
      onEventClick:async (event) => {
        console.log(event);
      },
    },
    dayBoundaries: { start: "09:00", end: "03:00" },
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: todayDay,
        end: todayDay,
      }
    ],
  });

  return (
    <div>
      <ScheduleXCalendar
        calendarApp={calendar}
        customComponents={{
          timeGridEvent: CustomTimeGridEvent,
          dateGridEvent: CustomDateGridEvent,
        }}
      />
    </div>
  )
}

export default App
