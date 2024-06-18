import express, { Request, Response } from "express";
import ActivityType from "../models/activityTypeModel.js";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  const activityTypes = await ActivityType.find().exec();
  return res.json({ success: true, activityTypes: activityTypes || [] });
});

router.post("/add", async (req: Request, res: Response) => {
  const { userId, type } = req.body;
  const activityType = new ActivityType({
    author: userId,
    image: "",
    name: type.name,
    location: type.location,
    conditions: {
      windDirection: type.conditions.windDirection,
      windSpeed: {
        min: type.conditions.windSpeed.min,
        max: type.conditions.windSpeed.max,
      },
      precipitation: type.conditions.precipitation,
    },
  });
  try {
    const savedActivityType = await activityType.save();
    return res.json({ success: true, activityType: savedActivityType });
  } catch (e) {
    console.error("Error during adding activity type: " + e);
    return res.json({ success: false, message: e });
  }
});

export { router };
