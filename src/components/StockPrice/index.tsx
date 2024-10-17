import { useContext, useEffect, useMemo, useState } from 'react';
import { CardContent, CircularProgress, Typography } from '@mui/material';
import ChartIcon from '@mui/icons-material/ShowChart';
import styled from 'styled-components';

import { fetchDailyStockData } from 'data/api';
import type { DailyStockResult } from 'data/types';
import { formatChartData } from 'lib/chart';

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
    appState: { activeData },
  } = useContext(StockContext);

  const [dailyStock, setDailyStock] = useState<DailyStockResult | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const chartData = useMemo(
    () => (dailyStock ? formatChartData(dailyStock) : []),
    [dailyStock]
  );

  useEffect(() => {
    if (activeData) {
      fetchDailyStockData(activeData.symbol).then(
        ({ success, message, result }) => {
          if (!success || !result) {
            setError(message);
          }
          setDailyStock(result || null);
          setLoading(false);
        }
      );
    }
  }, [activeData]);

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
          price={chartData[chartData.length - 1].closingPrice}
          date={dailyStock?.['Meta Data']['Last Refreshed']}
        />
        <AreaChart data={chartData} />
      </>
    );
  };

  return (
    <Card title="Stock Price" Icon={ChartIcon}>
      <CardContent sx={{ p: 3, mb: 1 }}>{renderContent()}</CardContent>
    </Card>
  );
}

export default StockPrice;
