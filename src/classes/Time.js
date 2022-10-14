const DEFAULT_START = {
  hours: "06",
  minutes: "00",
  meridiem: "PM",
};

const DEFAULT_END = {
  hours: "07",
  minutes: "00",
  meridiem: "PM",
};

export default class Time {
  constructor(
    type,
    values = type === "startTime" ? DEFAULT_START : DEFAULT_END
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
