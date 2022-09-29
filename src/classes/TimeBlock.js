import Time from "./Time";

export default class TimeBlock {
  constructor() {
    this.start = new Time("start");
    this.end = new Time("end");
  }
}
