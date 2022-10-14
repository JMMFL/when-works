export default function getDayById(dayId, data) {
  return data.availableTimes.find((day) => day.id === dayId);
}
