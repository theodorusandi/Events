"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var DB = /** @class */ (function () {
    function DB() {
        this.events = [];
    }
    DB.prototype.getEvents = function () {
        return this.events;
    };
    DB.prototype.addEvents = function (event) {
        var id = (0, uuid_1.v4)();
        this.events.push(__assign(__assign({}, event), { id: id }));
        return event;
    };
    DB.prototype.deleteEvent = function (eventId) {
        this.events = this.events.filter(function (event) { return event.id !== eventId; });
    };
    DB.prototype.editEvent = function (event) {
        var index = this.events.findIndex(function (e) { return e.id == event.id; });
        this.events[index] = __assign(__assign({}, this.events[index]), event);
        return this.events[index];
    };
    return DB;
}());
var db = new DB();
exports.default = db;
