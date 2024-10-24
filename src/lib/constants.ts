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
// reducer action types
export const ActionTypes = {
  UPDATE_APP_STATE: 'UPDATE_APP_STATE',
  UPDATE_ACTIVE_DATA: 'UPDATE_ACTIVE_DATA',
};
