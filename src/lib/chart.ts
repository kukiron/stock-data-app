import keys from 'lodash/keys';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import sortBy from 'lodash/sortBy';

import type {
  DailyStockChartItem,
  FormattedDailyStockResult,
} from 'data/types';
import { formatDate } from './date';

export const formatChartData = (data: FormattedDailyStockResult) => {
  const { 'Time Series': timeSeries } = data;
  return sortBy(
    keys(timeSeries).reduce<DailyStockChartItem[]>((acc, date) => {
      const { close } = timeSeries[date];
      return [
        ...acc,
        {
          originalDate: date,
          date: formatDate(date),
          price: Number(Number(close).toFixed(2)),
        },
      ];
    }, []),
    'originalDate'
  );
};

// calculate a range of price for y-axis to display on the chart
export const getChartPriceRange = (data: DailyStockChartItem[]) => {
  const max = maxBy(data, 'price')?.price || 0;
  const min = minBy(data, 'price')?.price || 0;

  return [
    min > 30
      ? Math.floor(min / 10) * 10
      : (min > 10 && Math.floor(min / 5) * 5) || Math.floor(min),
    max > 30
      ? Math.ceil(max / 10) * 10
      : (max > 10 && Math.ceil(max / 5) * 5) || Math.ceil(max),
  ];
};
