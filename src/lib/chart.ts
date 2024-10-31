import { filter, keys, maxBy, minBy, sortBy } from 'lodash';

import {
  DailyStockChartItem,
  DailyStockInfo,
  StockCategory,
  StockDataType,
  StockRange,
  StoredStockData,
} from 'data/types';
import { formatAxisDate, formatTooltipDate } from './date';

const getOffsetDate = (days: number) => {
  const currentDate = new Date();
  const offsetDateObj = new Date(
    currentDate.setDate(currentDate.getDate() - days)
  );
  return offsetDateObj.toISOString().split('T')[0];
};

const splitDate = (date: string) => date.split(' ')[0];

const prepareTimesList = (
  timeSeries: { [key: string]: DailyStockInfo },
  range: StockRange
) => {
  const timeKeys = keys(timeSeries).sort((a, b) => b.localeCompare(a));

  switch (range) {
    case '1D': {
      const latestDate = splitDate(timeKeys[0]);
      return filter(
        timeKeys,
        (time) =>
          splitDate(time) === latestDate &&
          new Date(time) > new Date(`${latestDate} 09:00:00`)
      );
    }

    case '5D': {
      const offsetDate = getOffsetDate(5);
      return filter(
        timeKeys,
        (time) =>
          new Date(splitDate(time)) >= new Date(offsetDate) &&
          (time.includes('00:00') || time.includes('30:00'))
      );
    }

    case '1M':
    case '6M':
    case '1Y':
    case '5Y': {
      const offset =
        range === '1M'
          ? 30
          : (range === '6M' && 180) || (range === '1Y' && 365) || 5 * 365;
      const offsetDate = getOffsetDate(offset);
      return filter(timeKeys, (time) => new Date(time) > new Date(offsetDate));
    }

    case 'YTD': {
      const currentYear = new Date().getFullYear();
      return filter(timeKeys, (time) => time.includes(String(currentYear)));
    }

    default:
      return [];
  }
};

export const formatChartData = (
  stockData: StoredStockData | null,
  options: Omit<StockDataType, 'value'>
) => {
  const { type: category, text: range } = options;
  const categoryData = stockData?.[category];

  if (!categoryData) return [];

  const { 'Time Series': timeSeries } = categoryData;
  const timeKeys = prepareTimesList(timeSeries, range);

  return sortBy(
    timeKeys.reduce<DailyStockChartItem[]>((acc, date) => {
      const { close } = timeSeries[date];
      const showLongFormat = ['1D', '5D'].includes(range);
      return [
        ...acc,
        {
          originalDate: date,
          date: formatAxisDate(date, range),
          tooltip: formatTooltipDate(date, showLongFormat),
          price: Number(Number(close).toFixed(2)),
        },
      ];
    }, []),
    'originalDate'
  );
};

// calculate a range of price for y-axis to display on the chart
export const getChartPriceRange = (
  data: DailyStockChartItem[],
  type: StockCategory
) => {
  const max = maxBy(data, 'price')?.price || 0;
  const min = minBy(data, 'price')?.price || 0;

  // set price range with NO buffer for intraday chart
  if (type === StockCategory.intraday) {
    return [Math.floor(min), Math.ceil(max)];
  }

  return [
    min > 30
      ? Math.floor(min / 10) * 10
      : (min > 10 && Math.floor(min / 5) * 5) || Math.floor(min),
    max > 30
      ? Math.ceil(max / 10) * 10
      : (max > 10 && Math.ceil(max / 5) * 5) || Math.ceil(max),
  ];
};
