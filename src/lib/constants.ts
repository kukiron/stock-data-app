import { StockCategory, StockDataType } from 'data/types';

export const BASE_URL = 'https://www.alphavantage.co/query';

export const DEFAULT_QUERY = 'TSLA - Tesla Inc';

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
  { text: '1D', type: StockCategory.intraday, value: 0 },
  { text: '5D', type: StockCategory.intraday, value: 1 },
  { text: '1M', type: StockCategory.daily, value: 2 },
  { text: '6M', type: StockCategory.daily, value: 3 },
  { text: 'YTD', type: StockCategory.daily, value: 4 },
  { text: '1Y', type: StockCategory.daily, value: 5 },
  { text: '5Y', type: StockCategory.weekly, value: 6 },
];

// reducer action types
export const ActionTypes = {
  UPDATE_APP_STATE: 'UPDATE_APP_STATE',
  UPDATE_ACTIVE_DATA: 'UPDATE_ACTIVE_DATA',
};
