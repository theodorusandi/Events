import { Event } from "../../../common/typings/EventTypes";
import { v4 as uuidv4 } from "uuid";

class DB {
  events: Event[] = [];
  getEvents() {
    return this.events;
  }
  addEvents(event: Event) {
    const id = uuidv4();
    this.events.push({ ...event, id });
    return event;
  }
  deleteEvent(eventId: string) {
    this.events = this.events.filter((event) => event.id !== eventId);
  }
  editEvent(event: Event) {
    const index = this.events.findIndex((e) => e.id == event.id);
    this.events[index] = { ...this.events[index], ...event };
    return this.events[index];
  }
}

const db = new DB();

export default db;
