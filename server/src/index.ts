import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import events from "./controllers/routers/events";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(morgan("combined"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/events", events);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
