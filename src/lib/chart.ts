import keys from 'lodash/keys';
import sortBy from 'lodash/sortBy';

import type { DailyStockChartItem, DailyStockResult } from 'data/types';
import { formatDate } from './date';

export const formatChartData = (data: DailyStockResult) => {
  const { 'Time Series': timeSeries } = data;
  return sortBy(
    keys(timeSeries).reduce<DailyStockChartItem[]>((acc, date) => {
      const { close } = timeSeries[date];
      return [
        ...acc,
        {
          originalDate: date,
          date: formatDate(date),
          closingPrice: Number(Number(close).toFixed(2)),
        },
      ];
    }, []),
    'originalDate'
  );
};
