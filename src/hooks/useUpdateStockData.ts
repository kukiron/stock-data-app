import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { fetchDailyStockData } from 'data/api';
import type { StockDataType, StoredStockData } from 'data/types';
import { formatChartData } from 'lib/chart';
import { formatDailyStockResults } from 'lib/common';
import { STOCK_TYPES } from 'lib/constants';
import { StockContext } from 'contexts/StockContext';

const tabs = STOCK_TYPES.map(({ text }) => text);
const iitialTimeSeries = STOCK_TYPES[0];

function useUpdateStockData() {
  const {
    demo,
    appState: { activeData },
  } = useContext(StockContext);

  const [stockData, setStockData] = useState<StoredStockData | null>(null);
  const [timeSeries, setTimeSeries] = useState<StockDataType>(iitialTimeSeries);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // format stock data for chart
  const { chartData, metaData } = useMemo(() => {
    const { type: category, value: tabIndex } = timeSeries;
    const categoryData = stockData?.[category];
    return {
      chartData: categoryData
        ? formatChartData(categoryData, tabs[tabIndex])
        : [],
      metaData: categoryData?.['Meta Data'],
    };
  }, [stockData, timeSeries]);

  const handleFetchStockData = useCallback(
    (tabIndex?: number) => {
      const symbol = !demo ? activeData?.symbol : undefined;
      const newTimeSeries = tabIndex ? STOCK_TYPES[tabIndex] : iitialTimeSeries;

      setTimeSeries(newTimeSeries);
      const { type } = newTimeSeries;

      // Do NOT fetch data if the `type` has been set already
      if (stockData?.[type]) return;

      // fetch data if running the app with demo endpoints
      // or after a successful search, which will set/change the `activeData`
      if (demo || activeData) {
        setLoading(true);
        fetchDailyStockData(type, symbol).then(
          ({ success, message, result }) => {
            if (!success || !result) {
              setError(message);
            }

            // initial formatting of stock data
            const formattedResult = formatDailyStockResults(result, type);
            setStockData((prevData) => ({
              ...(prevData || {}),
              [type]: formattedResult,
            }));
            setLoading(false);
          }
        );
      }
    },
    [demo, activeData, stockData]
  );

  useEffect(() => handleFetchStockData(), []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    timeSeries,
    error: error.trim(),
    loading,
    chartData,
    metaData,
    tabs,
    currentTab: timeSeries.value,
    updateStockData: handleFetchStockData,
  };
}

export default useUpdateStockData;
