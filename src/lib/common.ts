import { NewsResponse, UnformattedSearchedResult } from 'data/types';

// get the first 5 news feed based on sentiment score
export const formatNewsResponse = (news: NewsResponse) =>
  news.feed
    .sort((a, b) => b.overall_sentiment_score - a.overall_sentiment_score)
    .slice(0, 6);

export const formatInfoTitle = (title: string) => {
  return title.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase();
  });
};

export const formatFiancialValue = (key: string, value: string) => {
  switch (key) {
    case 'MarketCapitalization':
    case 'EBITDA':
    case 'SharesOutstanding': {
      const divideBy =
        value.length > 10 ? (value.length > 13 && 1.0e12) || 1.0e9 : 1.0e6;
      const suffix =
        value.length > 10 ? (value.length > 13 && 'T') || 'B' : 'M';
      return `${(Number(value) / divideBy).toFixed(2)}${suffix}`;
    }

    case 'ProfitMargin':
    case 'DividendYield': {
      return `${(Number(value) * 100).toFixed(2)}%`;
    }

    default:
      return value;
  }
};

export const formatSearchedResults = (results: UnformattedSearchedResult) => ({
  bestMatches: results.bestMatches.map((item) => {
    const keys = Object.keys(item);
    return keys.reduce((acc, key) => {
      const formattedKey = key.split('. ')[1].trim();
      return { ...acc, [formattedKey]: item[key] };
    }, {});
  }),
});
