import React from "react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import Fullcalendar from "@fullcalendar/react";
import "../../../../styles/calendar.css";
import { useState } from "react";
import EventDrawer from "./EventDrawer";
function Calendar(props) {
  const [event, setEvent] = useState(false);
  const events = [
    {
      title: "Event 1",
      status: "Pending",
      start: "2023-06-10T10:00:00",
      end: "2023-06-10T12:30:00",
    },

    // Add more events as needed
  ];
  const handleSelect = (selectInfo) => {
    props.setTime({
      startTime: selectInfo.startStr,
      endTime: selectInfo.endStr,
    });
    props.setBook(true);
  };
  const handleEventClick = (clickInfo) => {
    setEvent(clickInfo.event);
  };

  return (
    <div>
      <Fullcalendar
        events={events}
        dayMaxEvents={true}
        eventClick={handleEventClick}
        nowIndicator={true}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        selectable={true} // Enable selection
        select={handleSelect} // Set the select callback
        height={"90vh"}
      />
      <EventDrawer
        open={!!event}
        event={event}
        onClose={() => setEvent(null)}
      />
    </div>
  );
}

export default Calendar;
