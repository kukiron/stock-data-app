import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { fetchDailyStockData } from 'data/api';
import {
  FormattedDailyStockResult,
  StockCategory,
  StoredStockData,
} from 'data/types';
import { formatChartData } from 'lib/chart';
import { formatDailyStockResults } from 'lib/common';
import { StockContext } from 'contexts/StockContext';

const initialStockType = StockCategory.intraday;

function useUpdateStockData() {
  const {
    demo,
    appState: { activeData },
  } = useContext(StockContext);

  const [category, setCategory] = useState<StockCategory>(initialStockType);
  const [stockData, setStockData] = useState<StoredStockData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { chartData, metaData } = useMemo(() => {
    const categoryData = stockData?.[category];
    return {
      chartData: categoryData
        ? // format stock data for chart
          formatChartData(categoryData as FormattedDailyStockResult)
        : [],
      metaData: categoryData?.['Meta Data'],
    };
  }, [stockData, category]);

  const handleFetchStockData = useCallback(
    (dataType?: StockCategory) => {
      const symbol = !demo ? activeData?.symbol : undefined;
      const type = dataType || initialStockType;

      setCategory(type);

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
    category,
    error: error.trim(),
    loading,
    chartData,
    metaData,
    updateStockData: handleFetchStockData,
  };
}

export default useUpdateStockData;
