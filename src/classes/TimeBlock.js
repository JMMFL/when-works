import Time from "./Time";

export default class TimeBlock {
  constructor(
    dayId,
    blockId,
    startTime = new Time("startTime"),
    endTime = new Time("endTime")
  ) {
    this.dayId = dayId;
    this.blockId = blockId;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  static from(other) {
    return new TimeBlock(
      other.dayId,
      other.blockId,
      other.startTime,
      other.endTime
    );
  }

  isValid() {
    return this.startTime.toMs() < this.endTime.toMs();
  }
}
