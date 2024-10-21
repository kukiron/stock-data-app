import { useContext, useEffect, useMemo, useState } from 'react';
import { CardContent, CircularProgress, Typography } from '@mui/material';
import ChartIcon from '@mui/icons-material/TrendingUp';
import styled from 'styled-components';

import { fetchDailyStockData } from 'data/api';
import { formatDailyStockResults } from 'lib/common';
import { formatChartData } from 'lib/chart';
import type { FormattedDailyStockResult } from 'data/types';

import { StockContext } from 'contexts/StockContext';
import AreaChart from './AreaChart';
import Summary from './Summary';
import { Card } from '../common';

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  row-gap: 1.5rem;
`;

function StockPrice() {
  const {
    demo,
    appState: { activeData },
  } = useContext(StockContext);

  const [dailyStock, setDailyStock] =
    useState<FormattedDailyStockResult | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const chartData = useMemo(
    () => (dailyStock ? formatChartData(dailyStock) : []),
    [dailyStock]
  );

  useEffect(() => {
    const input = !demo ? activeData?.symbol : undefined;
    if (demo || activeData) {
      fetchDailyStockData(input).then(({ success, message, result }) => {
        if (!success || !result) {
          setError(message);
        }
        setDailyStock(formatDailyStockResults(result));
        setLoading(false);
      });
    }
  }, [demo, activeData]);

  const renderContent = () => {
    if (loading) {
      return (
        <LoaderWrapper>
          <CircularProgress />
          <Typography color="text.secondary">Updating stock data...</Typography>
        </LoaderWrapper>
      );
    }

    if (error || !chartData.length) {
      return (
        <Typography align="center" variant="subtitle1" color="red">
          {error}
        </Typography>
      );
    }

    return (
      <>
        <Summary
          price={chartData[chartData.length - 1].price}
          metaData={dailyStock!['Meta Data']}
        />
        <AreaChart data={chartData} currency={activeData?.currency || ''} />
      </>
    );
  };

  return (
    <Card title="Stock Price" Icon={ChartIcon}>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}

export default StockPrice;
