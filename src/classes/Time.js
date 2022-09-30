export default class Time {
  constructor(type, initialHour) {
    this.type = type;

    this.values = {
      hours: `${initialHour}`.padStart(2, "0"),
      minutes: "00",
      meridiem: "PM",
    };
  }

  toMs() {
    const hours = parseInt(this.values.hours);
    const minutes = parseInt(this.values.minutes);
    const meridiem = this.values.meridiem === "PM" ? 12 : 0;
    const totalHours = hours === 12 ? meridiem : hours + meridiem;
    return (totalHours * 60 * 60 + minutes * 60) * 1000;
  }
}
