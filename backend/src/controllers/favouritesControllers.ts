import express, { Request, Response } from "express";
import Favourites from "../models/favouritesModel.js";
import Activity from "../models/activityModel.js";
import ActivityType from "../models/activityTypeModel.js";

const router = express.Router();

router.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const favourites = await Favourites.find({ user: userId })
    .populate("activity")
    .exec();
  if (!favourites)
    return res.json({ success: false, message: "No activities found" });
  const activities = favourites.map((favourite) => favourite.activity);
  return res.json({ success: true, activityTypes: activities });
});

router.post("/add", async (req: Request, res: Response) => {
  const { userId, type } = req.body;
  const searchedActivityType = await ActivityType.findOne({
    name: type,
  });

  if (!searchedActivityType)
    return res.json({ success: false, message: "Activity type not found" });
  const favourite = new Favourites({
    user: userId,
    activity: searchedActivityType._id,
  });
  try {
    await favourite.save();
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
});

router.post("/remove", async (req: Request, res: Response) => {
  const { userId, type } = req.body;
  const searchedActivityType = await ActivityType.findOne({
    name: type,
  }).exec();
  if (!searchedActivityType)
    return res.json({ success: false, message: "Activity type not found" });
  try {
    await Favourites.deleteOne({
      user: userId,
      activity: searchedActivityType._id,
    });
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
});

export { router };
