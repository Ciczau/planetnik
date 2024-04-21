//@ts-nocheck
import express, { Request, Response } from "express";
import axios from "axios";
import { weatherPatterns } from "../consts/weatherPatterns";

const router = express.Router();

const checkForWeatherPattern = (weatherData, pattern, city?: string) => {
  const { conditions, activity, location } = pattern;
  let matches = true;
  if (conditions.windDirection && conditions.windDirection !== "Any") {
    if (
      !weatherData.wind ||
      weatherData.wind.deg < 0 ||
      (weatherData.wind.deg >= 45 &&
        weatherData.wind.deg < 135 &&
        conditions.windDirection !== "East") ||
      (weatherData.wind.deg >= 135 &&
        weatherData.wind.deg < 225 &&
        conditions.windDirection !== "South")
    ) {
      matches = false;
    }
  }

  if (
    conditions.windSpeed &&
    (weatherData.wind.speed < conditions.windSpeed.min ||
      weatherData.wind.speed > (conditions.windSpeed.max ?? Infinity))
  ) {
    matches = false;
  }

  if (
    conditions.temperature &&
    (weatherData.main.temp < conditions.temperature.min ||
      weatherData.main.temp > conditions.temperature.max)
  ) {
    matches = false;
  }

  if (conditions.precipitation === "None" && weatherData.rain) {
    matches = false;
  }

  if (city && location && !city.includes(location)) {
    matches = false;
  }
  return { matches, activity };
};

router.get("/search/:location", async (req: Request, res: Response) => {
  const { location } = req.params;

  try {
    const geocodingResponse = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: location,
          key: "b88b17e9647e488ea8588d635a7d617f",
        },
      }
    );

    const activitiesByCity = await Promise.all(
      geocodingResponse.data.results.map(async (result) => {
        const { lat, lng } = result.geometry;
        const city = result.formatted;

        const weatherResponse = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              lat,
              lon: lng,
              appid: "8fcb7e25d8a1a96fe5e721fd3f69f0af",
              units: "metric",
            },
          }
        );

        const weatherData = weatherResponse.data;
        let activities = [];

        weatherPatterns.forEach((pattern) => {
          const { matches, activity } = checkForWeatherPattern(
            weatherData,
            pattern,
            city
          );

          if (matches) {
            activities.push(activity);
          }
        });
        if (activities.length === 0) return null;
        return { city, activities };
      })
    );

    const validActivitiesByCity = activitiesByCity.filter(
      (entry) => entry !== null
    );

    if (validActivitiesByCity.length === 0) {
      res.json({ success: true, activitiesByCity: [] });
    } else {
      res.json({ success: true, activitiesByCity: validActivitiesByCity });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Wystąpił błąd podczas pobierania danych",
    });
  }
});

router.get("/search/:lat/:lng", async (req: Request, res: Response) => {
  const { lat, lng } = req.params;

  const weatherResponse = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat,
        lon: lng,
        appid: "8fcb7e25d8a1a96fe5e721fd3f69f0af",
        units: "metric",
      },
    }
  );

  const weatherData = weatherResponse.data;
  let activities = [];

  weatherPatterns.forEach((pattern) => {
    const { matches, activity } = checkForWeatherPattern(weatherData, pattern);

    if (matches) {
      activities.push(activity);
    }
  });
  res.json({ success: true, activities: activities });
});

export { router };
