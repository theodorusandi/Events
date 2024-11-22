"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEventSchema = exports.editEventSchema = exports.createEventSchema = void 0;
var DB_1 = __importDefault(require("../../repository/DB"));
function idExistsValidator(value) {
    var events = DB_1.default.getEvents();
    if (!events.some(function (event) { return event.id === value; })) {
        throw new Error("Event doesn't exist");
    }
    return true;
}
var createEventSchema = {
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
exports.createEventSchema = createEventSchema;
var editEventSchema = {
    id: {
        custom: { options: idExistsValidator },
        isString: true,
        notEmpty: true,
    },
    title: createEventSchema.title,
    location: createEventSchema.location,
    description: createEventSchema.description,
};
exports.editEventSchema = editEventSchema;
var deleteEventSchema = {
    id: {
        custom: { options: idExistsValidator },
        isString: true,
        notEmpty: true,
    },
};
exports.deleteEventSchema = deleteEventSchema;
