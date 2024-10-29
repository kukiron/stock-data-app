import find from 'lodash/find';
import { SyntheticEvent, useContext, useState } from 'react';
import { Box, CardContent, Tab, Tabs, Typography } from '@mui/material';
import ChartIcon from '@mui/icons-material/TrendingUp';

import useUpdateStockData from 'hooks/useUpdateStockData';
import { STOCK_TYPES } from 'lib/constants';
import type { StockCategory } from 'data/types';

import { StockContext } from 'contexts/StockContext';
import AreaChart from './AreaChart';
import Summary from './Summary';
import { Card, LoaderSpinner } from '../common';

const tabs = STOCK_TYPES.map(({ text }) => text);
const getInitialState = (category?: StockCategory) =>
  find(STOCK_TYPES, ['type', category])?.value || 0;

function StockPrice() {
  const {
    appState: { activeData },
  } = useContext(StockContext);

  const { category, error, loading, chartData, metaData, updateStockData } =
    useUpdateStockData();

  const [value, setValue] = useState(getInitialState(category));

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    updateStockData(STOCK_TYPES[newValue].type);
  };

  const renderContent = () => {
    if (error) {
      return (
        <Typography align="center" variant="subtitle1" color="red">
          {error}
        </Typography>
      );
    }

    return (
      <>
        <Summary
          loading={loading}
          price={chartData[chartData.length - 1]?.price}
          metaData={metaData}
        />

        <Box sx={{ width: '100%' }}>
          <Box sx={{ p: 1 }}>
            <Tabs variant="scrollable" value={value} onChange={handleTabChange}>
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
            <AreaChart
              data={chartData}
              category={category}
              currency={activeData?.currency || ''}
              updateStockData={updateStockData}
            />
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
