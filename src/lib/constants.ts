import { StockCategory, StockDataType } from 'data/types';

export const BASE_URL = 'https://www.alphavantage.co/query';

export const DEFAULT_QUERY = 'AAPL - Apple Inc';

export const QUERY_SYMBOLS = {
  BA: 'BA',
  IBM: 'IBM',
  AAPL: 'AAPL',
};

export const OVERVIEW_FIELDS = {
  financials: [
    '52WeekLow',
    '52WeekHigh',
    'DividendYield',
    'DividendPerShare',
    'EBITDA',
    'Exchange',
    'MarketCapitalization',
    'Currency',
    'PERatio',
    'ProfitMargin',
    'SharesOutstanding',
    'Symbol',
  ],
  company: ['Address', 'Country', 'Industry', 'Name', 'OfficialSite', 'Sector'],
};

// type of stock data displayed in the chart
export const STOCK_TYPES: StockDataType[] = [
  {
    text: '1D',
    type: StockCategory.intraday,
    value: 0,
    description: 'past day',
  },
  {
    text: '5D',
    type: StockCategory.intraday,
    value: 1,
    description: 'past 5 days',
  },
  {
    text: '1M',
    type: StockCategory.daily,
    value: 2,
    description: 'past month',
  },
  {
    text: '6M',
    type: StockCategory.daily,
    value: 3,
    description: 'past 6 months',
  },
  {
    text: 'YTD',
    type: StockCategory.daily,
    value: 4,
    description: 'Year to date',
  },
  { text: '1Y', type: StockCategory.daily, value: 5, description: 'past year' },
  {
    text: '5Y',
    type: StockCategory.weekly,
    value: 6,
    description: 'past 5 years',
  },
];

// reducer action types
export const ActionTypes = {
  UPDATE_APP_STATE: 'UPDATE_APP_STATE',
  UPDATE_ACTIVE_DATA: 'UPDATE_ACTIVE_DATA',
};
