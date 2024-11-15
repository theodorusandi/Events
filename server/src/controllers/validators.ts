import { body, param, validationResult } from "express-validator";
import db from "../repository/DB";

const stringRequiredChain = (field: string) =>
  body(field).notEmpty().withMessage(`${field} cannot be empty`).escape();
const dateStringRequiredChain = (field: string) =>
  stringRequiredChain(field).isDate().withMessage("invalid date");
const shortStringValidator = (field) =>
  stringRequiredChain(field).isLength({ max: 60 });
const descriptionValidator = () =>
  stringRequiredChain("description").isLength({ max: 200 });

export const idExistsValidator = () =>
  param("id").custom((value) => {
    const events = db.getEvents();
    if (!events.some((event) => event.id === value)) {
      throw new Error("event doesn't exist");
    }
    return true;
  });

export const validatorsChain = [
  shortStringValidator("title"),
  shortStringValidator("location"),
  descriptionValidator(),
  dateStringRequiredChain("date"),
];

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};
