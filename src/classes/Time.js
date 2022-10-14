import { DEFAULT_END_TIME, DEFAULT_START_TIME } from "../data/time";

export default class Time {
  constructor(
    type,
    values = type === "startTime" ? DEFAULT_START_TIME : DEFAULT_END_TIME
  ) {
    this.type = type;
    this.values = values;
  }

  static from(other) {
    return new Time(other.type, other.values);
  }

  toMs() {
    const hours = parseInt(this.values.hours);
    const minutes = parseInt(this.values.minutes);
    const meridiem = this.values.meridiem === "PM" ? 12 : 0;
    const totalHours = hours === 12 ? meridiem : hours + meridiem;
    return (totalHours * 60 * 60 + minutes * 60) * 1000;
  }
}
