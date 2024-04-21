export const weatherPatterns = [
  {
    location: "Szczawnica",
    conditions: {
      windDirection: "East",
      windSpeed: {
        min: 2,
        max: 4,
      },
      precipitation: "None",
    },
    activity: "Latanie na paralotni z Jarmuty",
  },
  {
    location: "Zalew Zegrzyński",
    conditions: {
      windDirection: "Any",
      windSpeed: {
        min: 5,
        max: 12,
      },
      precedingConditions: {
        freezingDays: 4,
        freezingTemperature: -8,
      },
    },
    activity: "Regaty bojerowe",
  },
  {
    conditions: {
      temperature: {
        min: 15,
        max: 21,
      },
      windSpeed: {
        min: 0,
        max: 5,
      },
    },
    activity: "Wycieczka rowerowa z dziećmi",
  },
  {
    location: "Zatoka Pucka",
    conditions: {
      windDirection: "South",
      windSpeed: {
        min: 6,
      },
      weather: "Sunny",
    },
    activity: "Kitesurfing, surfing",
  },
];
