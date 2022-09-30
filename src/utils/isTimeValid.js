export default function isTimeValid(timeBlock) {
  return timeBlock.start.toMs() < timeBlock.end.toMs();
}
