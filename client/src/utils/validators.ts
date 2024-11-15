import dayjs from "dayjs";
import { Event, EventKeys } from "../../../common/typings/EventTypes";

export const validateForm = (newEvent: Event) => {
  const errors = [];

  for (const [key, value] of Object.entries(newEvent)) {
    if (!value) {
      errors.push(`${key} cannot be empty`);
    }
  }

  if (newEvent[EventKeys.Title].length > 60) {
    errors.push("title length cannot exceed 60 characters");
  }

  if (newEvent[EventKeys.Location].length > 60) {
    errors.push("location length cannot exceed 60 characters");
  }

  if (newEvent[EventKeys.Description].length > 200) {
    errors.push("description length cannot exceed 200 characters");
  }

  if (!dayjs(newEvent[EventKeys.Date]).isValid()) {
    errors.push("invalid date");
  }

  return errors;
};
