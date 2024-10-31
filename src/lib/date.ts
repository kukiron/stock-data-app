import type { TimeRange } from 'data/types';

const LOCALES = ['en-US', 'en-GB'];

// common date format util
export const formatAppDate = (dateStr: string, long: boolean = false) => {
  if (long) {
    return new Date(dateStr).toLocaleDateString(LOCALES, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }
  return new Date(dateStr).toLocaleDateString(LOCALES, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatAxisDate = (dateStr: string, range: TimeRange) => {
  const dayOptions = {
    day: 'numeric',
    month: 'short',
  } as Intl.DateTimeFormatOptions;
  const hourOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  } as Intl.DateTimeFormatOptions;

  switch (range) {
    case '1D': {
      return new Date(dateStr).toLocaleString(LOCALES, hourOptions);
    }
    case '5D': {
      return new Date(dateStr).toLocaleString(LOCALES, {
        ...dayOptions,
        ...hourOptions,
      });
    }

    case '1M':
    case '6M': {
      return new Date(dateStr).toLocaleString(LOCALES, dayOptions);
    }

    case 'YTD':
    case '1Y': {
      return new Date(dateStr).toLocaleString(LOCALES, {
        month: 'short',
        day: 'numeric',
      });
    }

    case '5Y': {
      return new Date(dateStr).toLocaleString(LOCALES, {
        year: 'numeric',
        month: 'short',
      });
    }
  }
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

  return `Published on ${formatAppDate(formattedPublishedDate)}`;
};
