import { useCallback, useEffect, useState } from "react";

import EventList from "./components/EventList";
import { Request } from "./api/Request";
import { Event } from "../../common/typings/EventTypes";
import AddEventForm from "./components/AddEventForm";

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = useCallback(async () => {
    const data: Event[] = await Request.get(
      `${import.meta.env.VITE_BASE_URL}/events`,
    );
    setEvents(data);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="container">
      <h1>Eventify</h1>
      <div className="row">
        <div className="col-4">
          <AddEventForm fetchEvents={fetchEvents} />
        </div>
        <div className="col-8">
          <EventList fetchEvents={fetchEvents} events={events} />
        </div>
      </div>
    </div>
  );
}

export default App;
