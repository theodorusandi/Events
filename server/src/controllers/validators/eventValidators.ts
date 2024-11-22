import { Schema } from "express-validator";
import db from "../../repository/DB";

function idExistsValidator(value: string) {
  const events = db.getEvents();
  if (!events.some(event => event.id === value)) {
    throw new Error("Event doesn't exist");
  }
  return true;
}

const createEventSchema: Schema = {
  title: {
    isString: true,
    notEmpty: true,
    isLength: { options: { max: 60 } },
    trim: true,
    escape: true,
  },
  location: {
    isString: true,
    notEmpty: true,
    isLength: { options: { max: 60 } },
    trim: true,
    escape: true,
  },
  description: {
    isString: true,
    notEmpty: true,
    isLength: { options: { max: 200 } },
    trim: true,
    escape: true,
  },
};

const editEventSchema: Schema = {
  id: {
    custom: { options: idExistsValidator },
    isString: true,
    notEmpty: true,
  },
  title: createEventSchema.title,
  location: createEventSchema.location,
  description: createEventSchema.description,
};

const deleteEventSchema: Schema = {
  id: {
    custom: { options: idExistsValidator },
    isString: true,
    notEmpty: true,
  },
};

export { createEventSchema, editEventSchema, deleteEventSchema };
