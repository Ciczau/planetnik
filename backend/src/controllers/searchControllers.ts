import express from "express";
import activityType from "../models/activityTypeModel";

const router = express.Router();

router.get("/filters", async (_req, res) => {
  const dateFilters = [
    {
      name: "Dzisiaj",
      value: new Date().toISOString().split("T")[0],
    },
    {
      name: "Jutro",
      value: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    },
    {
      name: "Pojutrze",
      value: new Date(Date.now() + 172800000).toISOString().split("T")[0],
    },
    {
      name: new Date(Date.now() + 345600000).toISOString().split("T")[0],
      value: new Date(Date.now() + 345600000).toISOString().split("T")[0],
    },
    {
      name: new Date(Date.now() + 432000000).toISOString().split("T")[0],
      value: new Date(Date.now() + 432000000).toISOString().split("T")[0],
    },
    {
      name: new Date(Date.now() + 518400000).toISOString().split("T")[0],
      value: new Date(Date.now() + 518400000).toISOString().split("T")[0],
    },
    {
      name: new Date(Date.now() + 604800000).toISOString().split("T")[0],
      value: new Date(Date.now() + 604800000).toISOString().split("T")[0],
    },
  ];

  const activityTypes = await activityType.find().exec();
  const activityFilters = activityTypes.map((type) => {
    return {
      name: type.name,
      value: type.name,
    };
  });

  return res.json({
    success: true,
    filters: [
      { name: "Data", filters: dateFilters },
      { name: "Aktywności", filters: activityFilters },
    ],
  });
});

export { router };
