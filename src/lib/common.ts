import keys from 'lodash/keys';
import slice from 'lodash/slice';
import sortBy from 'lodash/sortBy';

import type {
  DailyStockResult,
  FormattedDailyStockResult,
  FormattedSearchResult,
  NewsResponse,
  SearchResult,
} from 'data/types';

// get the first 5 news feed based on sentiment score
export const formatNewsResponse = (result: NewsResponse | undefined) =>
  slice(sortBy(result?.feed || [], 'overall_sentiment_score'), 0, 6);

// format company overview table title
export const formatInfoTitle = (title: string) =>
  title.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

// format financial values for display
export const formatFiancialValue = (key: string, value: string) => {
  switch (key) {
    case 'MarketCapitalization':
    case 'EBITDA':
    case 'SharesOutstanding': {
      const divideBy = value.length > 10 ? 1.0e9 : 1.0e6;
      const suffix = value.length > 10 ? 'B' : 'M';
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

// format keys in result object
const formatObject = (item: { [key: string]: any }) =>
  keys(item).reduce((acc, key) => {
    const formattedKey = key.split('. ')[1].trim();
    return { ...acc, [formattedKey]: item[key] };
  }, {} as any);

export const formatSearchResults = (
  results: SearchResult
): FormattedSearchResult => ({
  bestMatches: results.bestMatches.map(formatObject),
});

export const formatDailyStockResults = (
  results: DailyStockResult | undefined
): FormattedDailyStockResult => {
  const { 'Meta Data': metaData = {}, 'Time Series (Daily)': timeSeries = {} } =
    results || {};
  return {
    'Meta Data': formatObject(metaData),
    'Time Series': keys(timeSeries).reduce(
      (acc, date) => ({ ...acc, [date]: formatObject(timeSeries[date]) }),
      {}
    ),
  };
};
