import { lazy, Suspense, useContext } from 'react';
import { Box, CardContent, Tab, Tabs, Typography } from '@mui/material';
import ChartIcon from '@mui/icons-material/TrendingUp';

import { useUpdateStockData } from 'hooks';

import { StockContext } from 'contexts/StockContext';
import Summary from './Summary';
import { Card, LoaderSpinner } from '../common';

const AreaChart = lazy(() => import('./AreaChart'));

function StockPrice() {
  const {
    appState: { activeData },
  } = useContext(StockContext);

  const {
    timeSeries: { text: range, type: category },
    error,
    loading,
    chartData,
    metaData,
    tabs,
    currentTab: tabIndex,
    updateStockData,
  } = useUpdateStockData();

  const renderContent = () => {
    if (error) {
      return (
        <Typography align="center" variant="subtitle1" color="red">
          {error}
        </Typography>
      );
    }

    const latestPrice = chartData[chartData.length - 1]?.price || 0;
    const earliestPrice = chartData[0]?.price || 0;
    const prices = [earliestPrice, latestPrice];

    return (
      <>
        <Summary
          loading={loading}
          prices={prices}
          metaData={metaData}
          timeRange={range}
        />

        <Box sx={{ width: '100%' }}>
          <Box sx={{ p: 1 }}>
            <Tabs
              variant="scrollable"
              value={tabIndex}
              onChange={(_, newValue) => updateStockData(newValue)}
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab}
                  label={tab}
                  disabled={loading}
                  sx={{ fontWeight: 'bold' }}
                />
              ))}
            </Tabs>
          </Box>

          {loading || !chartData.length ? (
            <LoaderSpinner />
          ) : (
            <Suspense fallback={<LoaderSpinner />}>
              <AreaChart
                data={chartData}
                category={category}
                currency={activeData?.currency || ''}
              />
            </Suspense>
          )}
        </Box>
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
