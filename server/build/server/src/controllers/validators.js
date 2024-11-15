"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.validatorsChain = exports.idExistsValidator = void 0;
var express_validator_1 = require("express-validator");
var DB_1 = __importDefault(require("../repository/DB"));
var stringRequiredChain = function (field) {
    return (0, express_validator_1.body)(field).notEmpty().withMessage("".concat(field, " cannot be empty")).escape();
};
var dateStringRequiredChain = function (field) {
    return stringRequiredChain(field).isDate().withMessage("invalid date");
};
var shortStringValidator = function (field) {
    return stringRequiredChain(field).isLength({ max: 60 });
};
var descriptionValidator = function () {
    return stringRequiredChain("description").isLength({ max: 200 });
};
var idExistsValidator = function () {
    return (0, express_validator_1.param)("id").custom(function (value) {
        var events = DB_1.default.getEvents();
        if (!events.some(function (event) { return event.id === value; })) {
            throw new Error("event doesn't exist");
        }
        return true;
    });
};
exports.idExistsValidator = idExistsValidator;
exports.validatorsChain = [
    shortStringValidator("title"),
    shortStringValidator("location"),
    descriptionValidator(),
    dateStringRequiredChain("date"),
];
var validateRequest = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.validateRequest = validateRequest;
