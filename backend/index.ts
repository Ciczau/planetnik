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

import { router as userControllers } from "./src/controllers/userControllers";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/user", userControllers);

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
