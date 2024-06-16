export const translateDirection = (direction: string) => {
  const translations: { [key: string]: string } = {
    Północ: "North",
    Wschód: "East",
    Południe: "South",
    Zachód: "West",
    Dowolny: "Any",
    North: "Północ",
    East: "Wschód",
    South: "Południe",
    West: "Zachód",
    Any: "Dowolny",
  };
  return translations[direction];
};
