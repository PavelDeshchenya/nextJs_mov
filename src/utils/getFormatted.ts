export function getRunTime(movieRuntime: number) {
  let hours = Math.floor(movieRuntime / 60);
  let minutes: string | number = movieRuntime % 60;
  if (minutes >= 1 && minutes <= 9) {
    minutes = "0" + minutes;
  }

  return `${hours}h ${minutes}m`;
}

export function getDate(dateString: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}
export function getBudget(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
