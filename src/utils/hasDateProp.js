export default function hasDateProp(data, id) {
  return Object.keys(data.availableTimes).includes(id);
}
