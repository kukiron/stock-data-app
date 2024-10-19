import { BASE_URL, QUERY_SYMBOLS } from 'lib/constants';

import {
  ApiResponse,
  CompanyOverview,
  DailyStockResult,
  FailedResponse,
  NewsResponse,
  SearchResult,
} from './types';

const FETCH_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};
const getApiKey = (isDemo: boolean) =>
  isDemo ? 'demo' : process.env.REACT_APP_API_KEY || 'demo';

// response is failing with `Information` about API limit or other errors
const handleFailedResponse = (response?: FailedResponse) => {
  if (response?.Information || response?.['Error Message']) {
    throw new Error(response?.Information);
  }
};

export const searchStockData = async (
  keywords?: string
): Promise<ApiResponse<SearchResult>> => {
  const queryParams = new URLSearchParams({
    function: 'SYMBOL_SEARCH',
    keywords: keywords || QUERY_SYMBOLS.BA,
    apikey: getApiKey(!keywords),
  });
  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const result = await response.json();
    handleFailedResponse(result);

    return {
      success: true,
      message: 'Search results fetched successfully.',
      result,
    };
  } catch (error) {
    console.log('Error fetching search results.', error);
    return {
      success: false,
      message: (error as any).message || 'Failed to fetch search results.',
    };
  }
};

export const fetchCompanyOverview = async (
  symbol?: string
): Promise<ApiResponse<CompanyOverview>> => {
  const queryParams = new URLSearchParams({
    function: 'OVERVIEW',
    symbol: symbol || QUERY_SYMBOLS.IBM,
    apikey: getApiKey(!symbol),
  });
  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const result = await response.json();
    handleFailedResponse(result);

    return {
      success: true,
      message: 'Company overview fetched successfully.',
      result,
    };
  } catch (error) {
    console.log('Error fetching company overview.', error);
    return {
      success: false,
      message: 'Failed to fetch company overview.',
    };
  }
};

export const fetchLatestNews = async (
  tickers?: string
): Promise<ApiResponse<NewsResponse>> => {
  const queryParams = new URLSearchParams({
    function: 'NEWS_SENTIMENT',
    tickers: tickers || QUERY_SYMBOLS.AAPL,
    apikey: getApiKey(!tickers),
  });
  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const result = await response.json();
    handleFailedResponse(result);

    return {
      success: true,
      message: 'Latest news fetched successfully.',
      result,
    };
  } catch (error) {
    console.log('Error fetching latest news.', error);
    return {
      success: false,
      message: 'Failed to fetch latest news.',
    };
  }
};

export const fetchDailyStockData = async (
  symbol?: string
): Promise<ApiResponse<DailyStockResult>> => {
  const queryParams = new URLSearchParams({
    function: 'TIME_SERIES_DAILY',
    symbol: symbol || QUERY_SYMBOLS.IBM,
    apikey: getApiKey(!symbol),
  });
  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const result = await response.json();
    handleFailedResponse(result);

    return {
      success: true,
      message: 'Daily stock data fetched successfully.',
      result,
    };
  } catch (error) {
    console.log('Error fetching daily stock data.', error);
    return {
      success: false,
      message: 'Failed to fetch daily stock data.',
    };
  }
};
