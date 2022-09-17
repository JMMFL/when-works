export default function CalendarBtn({ dateCount, onClick }) {
  const noDates = dateCount === 0;

  return (
    <button disabled={noDates} onClick={onClick}>
      {noDates ? `Select A Date` : `${dateCount} Dates Selected`}
    </button>
  );
}
