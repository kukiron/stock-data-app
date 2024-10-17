import { BASE_URL } from 'lib/constants';
import {
  formatDailyStockResults,
  formatNewsResponse,
  formatSearchedResults,
} from 'lib/common';

import {
  ApiResponse,
  CompanyOverview,
  DailyStockResult,
  NewsFeed,
  SearchResult,
} from './types';

const FETCH_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};
const API_KEY = process.env.REACT_APP_API_KEY || 'demo';

export const searchStockData = async (
  keywords: string
): Promise<ApiResponse<SearchResult>> => {
  const queryParams = new URLSearchParams({
    function: 'SYMBOL_SEARCH',
    // keywords: 'BA',
    keywords,
    apikey: API_KEY,
  });
  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const result = await response.json();
    // check if the response includes API limit message
    const apiLimitMessage = result?.Information || '';
    return {
      success: true,
      message: apiLimitMessage || 'Search results fetched successfully.',
      result: !apiLimitMessage ? formatSearchedResults(result) : undefined,
    };
  } catch (error) {
    console.log('Error fetching search results.', error);
    return {
      success: false,
      message: 'Failed to fetch search results.',
    };
  }
};

export const fetchCompanyOverview = async (
  symbol: string
): Promise<ApiResponse<CompanyOverview>> => {
  const queryParams = new URLSearchParams({
    function: 'OVERVIEW',
    // symbol: 'IBM',
    symbol,
    apikey: API_KEY,
  });
  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const result = await response.json();
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
  tickers: string
): Promise<ApiResponse<NewsFeed[]>> => {
  const queryParams = new URLSearchParams({
    function: 'NEWS_SENTIMENT',
    // tickers: 'AAPL',
    tickers,
    apikey: API_KEY,
  });
  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const result = await response.json();
    return {
      success: true,
      message: 'Latest news fetched successfully.',
      result: formatNewsResponse(result),
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
  symbol: string
): Promise<ApiResponse<DailyStockResult>> => {
  const queryParams = new URLSearchParams({
    function: 'TIME_SERIES_DAILY',
    // symbol: 'IBM',
    symbol,
    apikey: API_KEY,
  });
  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const result = await response.json();
    return {
      success: true,
      message: 'Daily stock data fetched successfully.',
      result: formatDailyStockResults(result),
    };
  } catch (error) {
    console.log('Error fetching daily stock data.', error);
    return {
      success: false,
      message: 'Failed to fetch daily stock data.',
    };
  }
};
