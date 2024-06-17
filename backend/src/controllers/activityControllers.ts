import express, { Request, Response } from "express";
import Activity from "../models/activityModel";
import Saved from "../models/savedModel";
import ActivityType from "../models/activityTypeModel";
import { Mongoose, Schema, Types } from "mongoose";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  const activities = await Activity.find().exec();
  return res.json({ success: true, activities: activities || [] });
});

router.post("/saved/add", async (req: Request, res: Response) => {
  const { userId, activity } = req.body;
  let activityId = activity._id;
  let activityTypeId = activity.type._id;
  if (!activityTypeId) {
    const searchedActivityType = await ActivityType.findOne({
      name: activity.type.name,
    }).exec();

    if (!searchedActivityType) {
      return res.json({ success: false, message: "Activity type not found" });
    }
    activityTypeId = searchedActivityType._id;
  }
  const searchedActivity = await Activity.findById(activityId).exec();
  console.log(activityId);
  if (!searchedActivity) {
    const newActivity = new Activity({
      type: activityTypeId,
      city: activity.city,
      date: activity.date,
    });
    const savedActivity = await newActivity.save();
    activityId = savedActivity._id;
  }
  console.log(activityId);
  try {
    const saved = new Saved({ user: userId, activity: activityId });
    const savedActivity = await saved.save();
    return res.json({ success: true, saved: savedActivity });
  } catch (e) {
    console.error("Error during adding favourite: " + e);
    return res.json({ success: false, message: e });
  }
});

router.post("/saved/remove", async (req: Request, res: Response) => {
  const { userId, activity } = req.body;
  const searchedActivityType = await ActivityType.findOne({
    name: activity.type.name,
  }).exec();
  if (!searchedActivityType)
    return res.json({ success: false, message: "Activity type not found" });
  const searchedActivity = await Activity.findOne({
    city: activity.city,
    date: activity.date,
    type: searchedActivityType._id,
  }).exec();

  try {
    const test = await Saved.find().exec();
    console.log(test);
    console.log(userId);
    console.log(searchedActivity?._id);
    await Saved.deleteOne({
      user: userId,
      activity: searchedActivity?._id,
    });
    return res.json({ success: true });
  } catch (e) {
    console.error("Error during removing favourite: " + e);
    return res.json({ success: false, message: e });
  }
});

router.get("/saved/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const saved = await Saved.find({ user: userId })
    .populate({
      path: "activity",
      populate: { path: "type" },
    })
    .exec();
  if (!saved)
    return res.json({ success: false, message: "No activities found" });
  console.log(saved);
  const activities = saved.map((el) => el.activity);
  return res.json({ success: true, saved: activities });
});

export { router };
