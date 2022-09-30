export default class Time {
  constructor(type) {
    this.type = type;

    this.values = {
      hours: "01",
      minutes: "00",
      meridiem: "AM",
    };
  }
}
