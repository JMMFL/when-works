export default class Time {
  constructor(type) {
    this.type = type;

    this.values = {
      hours: "01",
      minutes: "00",
      meridiem: "AM",
    };

    this.options = {
      hours: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],

      minutes: ["00", "30"],
      meridiem: ["AM", "PM"],
    };
  }
}
