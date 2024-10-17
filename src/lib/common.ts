import keys from 'lodash/keys';
import slice from 'lodash/slice';
import sortBy from 'lodash/sortBy';

import {
  NewsResponse,
  SearchedItem,
  UnformattedSearchedResult,
} from 'data/types';

// get the first 5 news feed based on sentiment score
export const formatNewsResponse = (news: NewsResponse) =>
  slice(sortBy(news.feed, 'overall_sentiment_score'), 0, 6);

// format company overview table title
export const formatInfoTitle = (title: string) =>
  title.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

// format financial values for display
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

// format searched result object keys
export const formatSearchedResults = (results: UnformattedSearchedResult) => ({
  bestMatches: results.bestMatches.map((item) =>
    keys(item).reduce((acc, key) => {
      const formattedKey = key.split('. ')[1].trim();
      return { ...acc, [formattedKey]: item[key] };
    }, {} as SearchedItem)
  ),
});
