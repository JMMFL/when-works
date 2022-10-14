import { v4 } from "uuid";
import TimeBlock from "./TimeBlock";

export default class Day {
  constructor(dateStr, timeBlocks = []) {
    this.id = dateStr;

    this.timeBlocks =
      timeBlocks.length > 0 ? timeBlocks : [new TimeBlock(this.id, v4())];
  }

  static from(other) {
    return new Day(other.id, other.timeBlocks);
  }
}
