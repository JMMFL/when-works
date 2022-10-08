import Time from "./Time";

export default class TimeBlock {
  constructor(id, initialHour = 6) {
    this.id = id;
    this.start = new Time("start", initialHour);
    this.end = new Time("end", initialHour + 1);
  }
}
