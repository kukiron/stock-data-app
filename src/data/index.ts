import { BASE_URL } from 'lib/constants';
import { formatNewsResponse, formatSearchedResults } from 'lib/common';

import { ApiResponse, CompanyOverview, NewsFeed, SearchResult } from './types';

const FETCH_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const checkApiResponse = (result: any) =>
  !result?.Information?.includes(
    'The **demo** API key is for demo purposes only.'
  ) && result;

export const fetchLatestNews = async (
  tickers: string
): Promise<ApiResponse<NewsFeed[]>> => {
  const queryParams = new URLSearchParams({
    function: 'NEWS_SENTIMENT',
    tickers: 'AAPL',
    apikey: 'demo',
    // apikey: API_KEY,
  });
  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const result = await response.json();
    return {
      success: true,
      message: 'Latest news fetched successfully.',
      result: checkApiResponse(formatNewsResponse(result)),
    };
  } catch (error) {
    console.log('Error fetching latest news.', error);
    return {
      success: false,
      message: 'Failed to fetch latest news.',
    };
  }
};

export const fetchCompanyOverview = async (
  symbol: string
): Promise<ApiResponse<CompanyOverview>> => {
  const queryParams = new URLSearchParams({
    function: 'OVERVIEW',
    symbol: 'IBM',
    // apikey: API_KEY,
    apikey: 'demo',
  });
  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const result = await response.json();
    return {
      success: true,
      message: 'Company overview fetched successfully.',
      result: checkApiResponse(result),
    };
  } catch (error) {
    console.log('Error fetching company overview.', error);
    return {
      success: false,
      message: 'Failed to fetch company overview.',
    };
  }
};

export const searchStockData = async (
  keywords: string
): Promise<ApiResponse<SearchResult>> => {
  const queryParams = new URLSearchParams({
    function: 'SYMBOL_SEARCH',
    keywords,
    apikey: 'demo',
    // apikey: API_KEY,
  });
  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const result = await response.json();
    return {
      success: true,
      message: 'Search results fetched successfully.',
      result: checkApiResponse(formatSearchedResults(result)),
    };
  } catch (error) {
    console.log('Error fetching search results.', error);
    return {
      success: false,
      message: 'Failed to fetch search results.',
    };
  }
};
