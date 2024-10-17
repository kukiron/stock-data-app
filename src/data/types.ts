/* --- Response type definition --- */

type BaseResponse = { success: boolean; message: string };
export type ApiResponse<T> = BaseResponse & {
  result?: T;
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

export type UnformattedSearchedItem = {
  [key: string]: string;
};

export type UnformattedSearchedResult = {
  bestMatches: UnformattedSearchedItem[];
};

export type SearchResult = {
  bestMatches: SearchedItem[];
};
