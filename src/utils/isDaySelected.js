export default function isDaySelected(data, date) {
  const id = date.toDateString();
  return data.availableTimes.some((day) => day.id === id);
}
