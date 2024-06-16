//@ts-nocheck
import express, { Request, Response } from "express";
import axios from "axios";
import ActivityType from "../models/activityTypeModel";

const router = express.Router();

const checkForWeatherPattern = (weatherData, pattern, city) => {
  if (!weatherData) return;
  const { conditions, name, location } = pattern;
  let matches = true;
  if (conditions.windDirection && conditions.windDirection !== "Any") {
    if (
      !weatherData.wind_deg ||
      weatherData.wind_deg < 0 ||
      (weatherData.wind_deg >= 45 &&
        weatherData.wind_deg < 135 &&
        conditions.windDirection !== "East") ||
      (weatherData.wind_deg >= 135 &&
        weatherData.wind_deg < 225 &&
        conditions.windDirection !== "South")
    ) {
      matches = false;
    }
  }

  if (
    conditions.windSpeed &&
    (weatherData.wind_speed < conditions.windSpeed.min ||
      weatherData.wind_speed > (conditions.windSpeed.max ?? Infinity))
  ) {
    matches = false;
  }

  if (
    conditions.temperature &&
    (weatherData.temp.day < conditions.temperature.min ||
      weatherData.temp.day > conditions.temperature.max)
  ) {
    matches = false;
  }

  if (!conditions.precipitation && weatherData.rain) {
    matches = false;
  }

  if (city && location && !city.includes(location)) {
    matches = false;
  }
  return { matches, activity: name };
};

router.get("/search/:location", async (req: Request, res: Response) => {
  const { location } = req.params;
  const weatherPatterns = await ActivityType.find().exec();

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

    const allActivities = [];

    const activitiesByCity = await Promise.all(
      geocodingResponse.data.results.map(async (result) => {
        const { lat, lng } = result.geometry;
        const city = result.formatted;

        const weatherResponse = await axios.get(
          "https://api.openweathermap.org/data/3.0/onecall",
          {
            params: {
              lat,
              lon: lng,
              appid: "8fcb7e25d8a1a96fe5e721fd3f69f0af",
              units: "metric",
              exclude: "current,minutely,hourly,alerts",
            },
          }
        );

        const weatherData = weatherResponse.data.daily.slice(0, 7);
        let activities = [];

        weatherData.forEach((dailyWeather) => {
          weatherPatterns.forEach((pattern) => {
            const { matches, activity } = checkForWeatherPattern(
              dailyWeather,
              pattern,
              city
            );

            if (matches) {
              allActivities.push({
                activity,
                date: dailyWeather.dt,
                city: city,
              });
            }
          });
        });
      })
    );

    res.json({ success: true, activitiesByCity: allActivities });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Wystąpił błąd podczas pobierania danych",
    });
  }
});

router.get("/forecast/:lat/:lon", async (req: Request, res: Response) => {
  const { lat, lon } = req.params;

  try {
    const weatherResponse = await axios.get(
      "https://api.openweathermap.org/data/3.0/onecall",
      {
        params: {
          lat,
          lon,
          appid: "8fcb7e25d8a1a96fe5e721fd3f69f0af",
          units: "metric",
        },
      }
    );

    const weatherData = weatherResponse.data.daily.slice(0, 7);
    res.json({ success: true, weatherData });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching weather data",
    });
  }
});

router.get("/search/:lat/:lng", async (req: Request, res: Response) => {
  const { lat, lng } = req.params;

  try {
    const weatherResponse = await axios.get(
      "https://api.openweathermap.org/data/3.0/onecall",
      {
        params: {
          lat,
          lon: lng,
          appid: "8fcb7e25d8a1a96fe5e721fd3f69f0af",
          units: "metric",
          exclude: "current,minutely,hourly,alerts",
        },
      }
    );

    const weatherData = weatherResponse.data.daily.slice(0, 7);
    let activities = [];

    weatherData.forEach((dailyWeather) => {
      weatherPatterns.forEach((pattern) => {
        const { matches, activity } = checkForWeatherPattern(
          dailyWeather,
          pattern
        );

        if (matches) {
          activities.push({ activity, date: dailyWeather.dt });
        }
      });
    });
    res.json({ success: true, activities: activities });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Wystąpił błąd podczas pobierania danych",
    });
  }
});
export { router };
