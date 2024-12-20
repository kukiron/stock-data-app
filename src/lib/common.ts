import keys from 'lodash/keys';
import slice from 'lodash/slice';
import sortBy from 'lodash/sortBy';

import type {
  CompanyOverview,
  DailyStockResult,
  FormattedDailyStockResult,
  FormattedSearchResult,
  NewsResponse,
  SearchResult,
  StockCategory,
} from 'data/types';
import { OVERVIEW_FIELDS } from './constants';

// get the first 5 news feed based on sentiment score
export const formatNewsResponse = (result: NewsResponse | undefined) =>
  slice(sortBy(result?.feed || [], 'overall_sentiment_score'), 0, 6);

// format company overview table title
export const formatInfoTitle = (title: string) =>
  title.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

// format financial values for display
export const formatFiancialValue = (key: string, value: string) => {
  // apparently missing values for a field are `None` in their API response!
  if (value.toLowerCase() === 'none') {
    return '-';
  }

  switch (key) {
    case 'MarketCapitalization':
    case 'EBITDA':
    case 'SharesOutstanding': {
      const divideBy =
        value.length > 9 ? (value.length > 12 && 1.0e12) || 1.0e9 : 1.0e6;
      const suffix = value.length > 9 ? (value.length > 12 && 'T') || 'B' : 'M';
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

// split company overview info into financials and company details
// display in 2 different cards
export const splitCompanyOverview = (overview: CompanyOverview | undefined) => {
  const overviewItems = overview ? keys(overview) : [];
  return overviewItems.reduce<{ financials: string[]; company: string[] }>(
    (acc, item) => {
      switch (true) {
        case OVERVIEW_FIELDS.financials.includes(item):
          return { ...acc, financials: [...acc.financials, item] };
        case OVERVIEW_FIELDS.company.includes(item):
          return { ...acc, company: [...acc.company, item] };
        default:
          return acc;
      }
    },
    { financials: [], company: [] }
  );
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

// formats api result
export const formatDailyStockResults = (
  results: DailyStockResult | undefined,
  type?: StockCategory
): FormattedDailyStockResult => {
  const timeSeriesKey =
    (type === 'intraday' && 'Time Series (5min)') ||
    (type === 'weekly' && 'Weekly Time Series') ||
    'Time Series (Daily)';
  const timeSeries = results?.[timeSeriesKey] || {};
  const { 'Meta Data': metaData = {} } = results || {};

  return {
    'Meta Data': formatObject(metaData),
    'Time Series': keys(timeSeries).reduce(
      (acc, date) => ({
        ...acc,
        [date]: formatObject(timeSeries[date]),
      }),
      {}
    ),
  };
};
