export enum EventKeys {
  Title = "title",
  Date = "date",
  Location = "location",
  Description = "description"
}

export interface Event {
  id?: string;
  [EventKeys.Title]: string;
  [EventKeys.Date]: string;
  [EventKeys.Location]: string;
  [EventKeys.Description]: string;
}