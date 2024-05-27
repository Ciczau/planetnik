export const formatDate = (date: number) => {
  const currentDate = new Date();
  const formattedDate = new Date(date * 1000).toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  if (currentDate.toDateString() === formattedDate) {
    return "Dziś";
  } else if (
    new Date(currentDate.setDate(currentDate.getDate() + 1)).toDateString() ===
    formattedDate
  ) {
    return "Jutro";
  } else {
    return formattedDate;
  }
};
