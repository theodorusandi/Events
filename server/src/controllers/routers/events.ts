import { Router, Request, Response } from "express";
import {
  idExistsValidator,
  validateRequest,
  validatorsChain,
} from "../validators";
import db from "../../repository/DB";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const events = db.getEvents();
  res.json(events);
});

router.post(
  "/create",
  [...validatorsChain],
  validateRequest,
  (req: Request, res: Response) => {
    const newEventToAdd = req.body;
    const events = db.getEvents();
    // same title validation
    const eventExists = events.some(
      (event) => event.title === newEventToAdd.title,
    );
    if (eventExists) {
      res.status(400).json({ error: "event with this title already exists" });
      return;
    }

    const newEvent = db.addEvents(newEventToAdd);
    res.status(201).json(newEvent);
  },
);

router.put(
  "/:id/edit",
  [idExistsValidator(), ...validatorsChain],
  validateRequest,
  (req: Request, res: Response) => {
    const eventIdToUpdate = req.params.id;
    const eventToUpdate = req.body;
    const events = db.getEvents();
    // same title validation
    const eventExists = events.some(
      (event) =>
        event.title === eventToUpdate.title && event.id !== eventIdToUpdate,
    );
    if (eventExists) {
      res.status(400).json({ error: "event with this title already exists" });
      return;
    }

    const updatedEvent = db.editEvent(eventToUpdate);

    res.status(200).json(updatedEvent);
  },
);

router.delete(
  "/:id/delete",
  idExistsValidator(),
  validateRequest,
  (req, res) => {
    const eventIdToDelete = req.params.id;

    db.deleteEvent(eventIdToDelete);

    res.sendStatus(204);
  },
);

export default router;
