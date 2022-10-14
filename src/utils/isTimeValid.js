export default function isTimeValid(timeBlock) {
  return timeBlock.startTime.toMs() < timeBlock.endTime.toMs();
}
