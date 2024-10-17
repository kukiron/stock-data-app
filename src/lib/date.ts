// get the published time of a news post in the news feed
// time format in API response: YYYYMMDDTHHMMSS
export const getPublishedTime = (time: string) => {
  const rawDate = time.split('T')[0];

  const publishedYear = Number(rawDate.substring(0, 4));
  const publishedMonth = Number(rawDate.substring(4, 6));
  const publishedDate = Number(rawDate.substring(6));
  const formattedPublishedDate = `${publishedYear}-${publishedMonth}-${publishedDate}`;

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().getDate();
  const formattedCurrentDate = `${currentYear}-${currentMonth}-${currentDate}`;

  if (formattedPublishedDate === formattedCurrentDate) {
    return 'Published Today';
  }

  const publishedYesterday =
    publishedYear === currentYear &&
    publishedMonth === currentMonth &&
    publishedDate + 1 === currentDate;

  if (publishedYesterday) {
    return 'Published Yesterday';
  }

  const publishedMonthName = new Date(formattedPublishedDate).toLocaleString(
    'default',
    { month: 'short' }
  );
  return `Published on ${publishedDate} ${publishedMonthName}, ${publishedYear}`;
};
