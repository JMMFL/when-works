import Time from "./Time";

export default class TimeBlock {
  constructor(initialHour = 6) {
    this.start = new Time("start", initialHour);
    this.end = new Time("end", initialHour + 1);
  }
}
