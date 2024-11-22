import { Router, Request, Response, NextFunction } from "express";
import { createEventSchema, deleteEventSchema, editEventSchema } from "../validators/eventValidators";
import { checkSchema } from "express-validator";
import { Event } from "../../../../common/typings/EventTypes";
import db from "../../repository/DB";

const router = Router();

function checkEvent(newEvent: Event, eventId?: string) {
  const events = db.getEvents();
  const eventExists = events.some(
    (event) => event.title === newEvent.title && (!eventId || (eventId && event.id !== eventId)),
  );

  return eventExists
}

router.get("/", (req: Request, res: Response) => {
  const events = db.getEvents();
  res.json(events);
});

router.post(
  "/create",
  checkSchema(createEventSchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const newEventToAdd = req.body;

      const eventExists = checkEvent(newEventToAdd)

      if (eventExists) {
        res.status(400).json({ error: "event with this title already exists" });
        return;
      }

      const newEvent = db.addEvents(newEventToAdd);
      res.status(201).json(newEvent);
    } catch (err) {
      next(err)
    }
  },
);

router.put(
  "/:id/edit",
  checkSchema(editEventSchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventToUpdate = req.body;
      const eventIdToUpdate = req.params.id;

      const eventExists = checkEvent(eventToUpdate, eventIdToUpdate)
      if (eventExists) {
        res.status(400).json({ error: "event with this title already exists" });
        return;
      }

      const updatedEvent = db.editEvent(eventToUpdate);

      res.status(200).json(updatedEvent);
    } catch (err) {
      next(err)
    }
  },
);

router.delete(
  "/:id/delete",
  checkSchema(deleteEventSchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventIdToDelete = req.params.id;

      db.deleteEvent(eventIdToDelete);

      res.sendStatus(204);
    } catch (err) {
      next(err)
    }
  },
);

export default router;
