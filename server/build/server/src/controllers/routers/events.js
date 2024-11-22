"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var eventValidators_1 = require("../validators/eventValidators");
var express_validator_1 = require("express-validator");
var DB_1 = __importDefault(require("../../repository/DB"));
var router = (0, express_1.Router)();
function checkEvent(newEvent, eventId) {
    var events = DB_1.default.getEvents();
    var eventExists = events.some(function (event) { return event.title === newEvent.title && (!eventId || (eventId && event.id !== eventId)); });
    return eventExists;
}
router.get("/", function (req, res) {
    var events = DB_1.default.getEvents();
    res.json(events);
});
router.post("/create", (0, express_validator_1.checkSchema)(eventValidators_1.createEventSchema), function (req, res, next) {
    try {
        var newEventToAdd = req.body;
        var eventExists = checkEvent(newEventToAdd);
        if (eventExists) {
            res.status(400).json({ error: "event with this title already exists" });
            return;
        }
        var newEvent = DB_1.default.addEvents(newEventToAdd);
        res.status(201).json(newEvent);
    }
    catch (err) {
        next(err);
    }
});
router.put("/:id/edit", (0, express_validator_1.checkSchema)(eventValidators_1.editEventSchema), function (req, res, next) {
    try {
        var eventToUpdate = req.body;
        var eventIdToUpdate = req.params.id;
        var eventExists = checkEvent(eventToUpdate, eventIdToUpdate);
        if (eventExists) {
            res.status(400).json({ error: "event with this title already exists" });
            return;
        }
        var updatedEvent = DB_1.default.editEvent(eventToUpdate);
        res.status(200).json(updatedEvent);
    }
    catch (err) {
        next(err);
    }
});
router.delete("/:id/delete", (0, express_validator_1.checkSchema)(eventValidators_1.deleteEventSchema), function (req, res, next) {
    try {
        var eventIdToDelete = req.params.id;
        DB_1.default.deleteEvent(eventIdToDelete);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
