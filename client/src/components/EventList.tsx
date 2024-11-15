import { useCallback } from "react";
import { Event } from "../../../common/typings/EventTypes";
import { Request } from "../api/Request";
import EventComponent from "./EventComponent";

interface EventListProps {
  events: Event[];
  fetchEvents: () => Promise<void>;
}

const EventList = ({ events, fetchEvents }: EventListProps) => {
  const handleOnEdit = useCallback(
    async (event: Event) => {
      await Request.put<Event>(
        `${import.meta.env.VITE_BASE_URL}/events/${event.id}/edit`,
        event,
      );
      await fetchEvents();
    },
    [fetchEvents],
  );

  const handleOnDelete = useCallback(
    async (event: Event) => {
      await Request.delete(
        `${import.meta.env.VITE_BASE_URL}/events/${event.id}/delete`,
      );
      await fetchEvents();
    },
    [fetchEvents],
  );

  return (
    <div className="d-flex flex-column gap-2">
      {events.map((event) => (
        <EventComponent
          key={event.id}
          event={event}
          onEdit={handleOnEdit}
          onDelete={handleOnDelete}
        />
      ))}
    </div>
  );
};

export default EventList;
