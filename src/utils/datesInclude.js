import datesEqual from "./datesEqual";

export default function datesInclude(dates, date) {
  return dates.some((d) => datesEqual(d, date));
}
