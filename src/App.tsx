import React, { useEffect } from 'react';
import './App.css'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  viewWeek,
  viewDay,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar'
import { createIcalendarPlugin } from "@schedule-x/ical";
import { createEventsServicePlugin } from "@schedule-x/events-service";

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
  const icalendarPlugin = createIcalendarPlugin({
    data: 
      "BEGIN:VCALENDAR\n" +
      "PRODID:-//Google Inc//Google Calendar 70.9054//EN\n" +
      "VERSION:2.0\n" +
      "CALSCALE:GREGORIAN\n" +
      "METHOD:PUBLISH\n" +
      "X-WR-CALNAME:Test ICS\n" +
      "X-WR-TIMEZONE:America/Toronto\n" +
      "BEGIN:VEVENT\n" +
      "DTSTART;VALUE=DATE:20241025\n" +
      "DTEND;VALUE=DATE:20241026\n" +
      "DTSTAMP:20241007T123831Z\n" +
      "ORGANIZER;CN=4c1a3b795346d897c8781a0df30cde8a2fc054d2fed1daa16e2ddfe5ec8b59\n" +
      " 0f@group.calendar.google.com:mailto:4c1a3b795346d897c8781a0df30cde8a2fc054d\n" +
      " 2fed1daa16e2ddfe5ec8b590f@group.calendar.google.com\n" +
      "UID:2k29n7a4iimvdaoi54jv42s5mu@google.com\n" +
      "CREATED:20241007T123804Z\n" +
      'DESCRIPTION:More Info: <a href="https://www.google.com/url?q=https://www.in\n' +
      " stagram.com/p/C9cl6SGA04s/&amp;sa=D&amp;source=calendar&amp;usd=2&amp;u\n" +
      ' sg=AOvVaw042wfimCgCk3ioqphPZ0jF" target="_blank">https://www.instagram.com/\n' +
      " p/C9cl6SGA04s/</a>\n" +
      "LAST-MODIFIED:20241007T123804Z\n" +
      "LOCATION:EVO Kitchen & Bar, 31 Water St S, Cambridge, ON N1R 3C7, Canad\n" +
      " a\n" +
      "SEQUENCE:0\n" +
      "STATUS:CONFIRMED\n" +
      "SUMMARY:Feel Soul GOOD\n" +
      "TRANSP:TRANSPARENT\n" +
      "END:VEVENT\n" +
      "END:VCALENDAR\n"
    
  });

  const calendar = useCalendarApp({
    defaultView: viewWeek.name,
    selectedDate: '2024-10-25',
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    plugins: [createEventsServicePlugin(), icalendarPlugin],
    callbacks: {
      onRangeUpdate: (range) => {
        icalendarPlugin.between(range.start, range.end);
      },
      onEventClick:async (event) => {
        console.log(event);
      },
    },
    // events: [
    //   {
    //     id: '1',
    //     title: 'Event 1',
    //     start: todayDay,
    //     end: todayDay,
    //   }
    // ],
  });

  useEffect(() => {
    // get all events
    calendar.eventsService.getAll();
  }, [calendar.eventsService]);

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
