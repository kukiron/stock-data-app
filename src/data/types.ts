/* --- Response type definition --- */

type BaseResponse = { success: boolean; message: string };
export type ApiResponse<T> = BaseResponse & {
  result?: T;
};

export type FailedResponse = {
  Information?: string;
  'Error Message'?: string;
};

/* --- Reducer types --- */

export type Action = { type: string; payload?: any };
export type CommonReducer<StateType> = (
  state: StateType,
  action: { type: string; payload?: any }
) => StateType;

export type AppState = {
  errorMessage: string;
  activeData: SearchedItem | null;
};

/* --- Data types --- */

export type NewsFeed = {
  authors: string[];
  banner_image: string;
  category_within_source: string;
  overall_sentiment_label: string;
  overall_sentiment_score: number;
  source: string;
  source_domain: string;
  summary: string;
  time_published: string;
  title: string;
  url: string;
};

export type NewsResponse = {
  feed: NewsFeed[];
  items: string;
  relevance_score_definition: string;
  sentiment_score_definition: string;
};

export type CompanyOverview = {
  '52WeekHigh': string;
  '52WeekLow': string;
  Address: string;
  AnalystTargetPrice: string;
  AssetType: string;
  BookValue: string;
  Country: string;
  Currency: string;
  Description: string;
  DividendPerShare: string;
  DividendYield: string;
  EBITDA: string;
  Exchange: string;
  Industry: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  Name: string;
  OfficialSite: string;
  PERatio: string;
  ProfitMargin: string;
  Sector: string;
  SharesOutstanding: string;
  Symbol: string;
};

export type SearchedItem = {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
};

type Record = {
  [key: string]: string;
};

export type SearchResult = {
  bestMatches: Record[];
};

export type FormattedSearchResult = {
  bestMatches: SearchedItem[];
};

export type DailyStockInfo = {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

export type DaiyStockMetaData = {
  Information: string;
  Symbol: string;
  'Last Refreshed': string;
  'Output Size': string;
  'Time Zone': string;
};

export type DailyStockResult = {
  'Meta Data': Record;
  'Time Series (Daily)': {
    [key: string]: Record;
  };
};

export type FormattedDailyStockResult = {
  'Meta Data': DaiyStockMetaData;
  'Time Series': {
    [key: string]: DailyStockInfo;
  };
};

export type DailyStockChartItem = {
  originalDate: string;
  date: string;
  tooltip: string;
  price: number;
};
