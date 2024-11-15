"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var events_1 = __importDefault(require("./controllers/routers/events"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use((0, morgan_1.default)("combined"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.send("Express + TypeScript Server");
});
app.use("/events", events_1.default);
app.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
});
