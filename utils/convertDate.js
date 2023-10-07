export function formatDate(dateString) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(dateString);

  // Format hours and minutes
  let hours = date.getUTCHours();
  const minutes = ('0' + date.getUTCMinutes()).slice(-2);
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format day
  const day = date.getUTCDate();
  let daySuffix;
  if (day > 3 && day < 21) daySuffix = 'th';
  switch (day % 10) {
    case 1:
      daySuffix = 'st';
      break;
    case 2:
      daySuffix = 'nd';
      break;
    case 3:
      daySuffix = 'rd';
      break;
    default:
      daySuffix = 'th';
      break;
  }

  // Format month
  const monthName = monthNames[date.getUTCMonth()];

  // Format year
  const year = date.getUTCFullYear();

  return `${hours}:${minutes}${ampm} . ${day}${daySuffix} ${monthName} ${year}`;
}
