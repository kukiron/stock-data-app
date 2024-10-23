export const formatDate = (time: string, compact = false) => {
  const year = compact
    ? new Date(time).toLocaleString('en', { year: '2-digit' })
    : new Date(time).getFullYear();
  const date = new Date(time).getDate();
  const month = new Date(time).toLocaleString('default', {
    month: 'long',
  });

  return compact
    ? `${date} ${month.substring(0, 3)} ${year}` // 10 Jan 22 - for chart axis label
    : `${month} ${date}, ${year}`; // January 10, 2022
};

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

  return `Published on ${formatDate(formattedPublishedDate)}`;
};
