"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validators_1 = require("../validators");
var DB_1 = __importDefault(require("../../repository/DB"));
var router = (0, express_1.Router)();
router.get("/", function (req, res) {
    var events = DB_1.default.getEvents();
    res.json(events);
});
router.post("/create", __spreadArray([], validators_1.validatorsChain, true), validators_1.validateRequest, function (req, res) {
    var newEventToAdd = req.body;
    var events = DB_1.default.getEvents();
    // same title validation
    var eventExists = events.some(function (event) { return event.title === newEventToAdd.title; });
    if (eventExists) {
        res.status(400).json({ error: "event with this title already exists" });
        return;
    }
    var newEvent = DB_1.default.addEvents(newEventToAdd);
    res.status(201).json(newEvent);
});
router.put("/:id/edit", __spreadArray([(0, validators_1.idExistsValidator)()], validators_1.validatorsChain, true), validators_1.validateRequest, function (req, res) {
    var eventIdToUpdate = req.params.id;
    var eventToUpdate = req.body;
    var events = DB_1.default.getEvents();
    // same title validation
    var eventExists = events.some(function (event) {
        return event.title === eventToUpdate.title && event.id !== eventIdToUpdate;
    });
    if (eventExists) {
        res.status(400).json({ error: "event with this title already exists" });
        return;
    }
    var updatedEvent = DB_1.default.editEvent(eventToUpdate);
    res.status(200).json(updatedEvent);
});
router.delete("/:id/delete", (0, validators_1.idExistsValidator)(), validators_1.validateRequest, function (req, res) {
    var eventIdToDelete = req.params.id;
    DB_1.default.deleteEvent(eventIdToDelete);
    res.sendStatus(204);
});
exports.default = router;
