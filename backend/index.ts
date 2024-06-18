//@ts-nocheck
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: __dirname + "/.env" });

import path from "path";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import { router as userControllers } from "./src/controllers/userControllers.js";
import { router as weatherControllers } from "./src/controllers/weatherControllers.js";
import { router as activityControllers } from "./src/controllers/activityControllers.js";
import { router as activityTypeControllers } from "./src/controllers/activityTypeControllers.js";
import { router as favouritesControllers } from "./src/controllers/favouritesControllers.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/user", userControllers);
app.use("/api/weather", weatherControllers);
app.use("/api/activity", activityControllers);
app.use("/api/activity/type", activityTypeControllers);
app.use("/api/activity/favourites", favouritesControllers);

const PORT = process.env.PORT || 80;

const dbRoute = process.env.DATABASE_CONNECTION_STRING;

mongoose.connect(dbRoute, {
  dbName: "planetnik",
});
let db = mongoose.connection;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT} `);
});

db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));
