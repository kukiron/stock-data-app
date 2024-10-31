import { useContext } from 'react';
import { Typography } from '@mui/material';
import ArrowUpIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownIcon from '@mui/icons-material/ArrowDownward';
import styled from 'styled-components';

import { darkGreen, darkRed, gray70, lightRed, lightGreen } from 'lib/colors';
import { formatAppDate } from 'lib/date';
import { BREAK_POINT_SM } from 'lib/breakpoints';
import type { DaiyStockMetaData, TimeRange } from 'data/types';
import { StockContext } from 'contexts/StockContext';
import { SummaryDataSkeleton } from 'components/common';
import { STOCK_TYPES } from 'lib/constants';
import { find } from 'lodash';

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

const Wrapper = styled.div`
  margin: 0.25rem 0 0 1rem;
  letter-spacing: 0.5px;
`;

const DiffWrapper = styled(FlexWrapper)`
  margin: 0.5rem 0;
  font-size: 0.95rem;
  font-weight: 500;
`;

const DiffTextWrapper = styled(FlexWrapper)<{ $isNegative: boolean }>`
  justify-content: center;
  column-gap: 0.1rem;
  border-radius: 0.33rem;
  color: ${({ $isNegative }) => ($isNegative ? darkRed : darkGreen)};
`;

const PercentageChange = styled(DiffTextWrapper)<{ $isNegative: boolean }>`
  padding: 0.25rem 0.5rem;
  background-color: ${({ $isNegative }) =>
    $isNegative ? `${lightRed}30` : `${lightGreen}30`};
`;

const Separator = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${gray70};
`;

const Name = styled.span`
  @media screen and (max-width: ${BREAK_POINT_SM}) {
    display: none;
  }
`;

type Props = {
  loading: boolean;
  prices: number[];
  timeRange: TimeRange;
  metaData: DaiyStockMetaData | undefined;
};

function Summary({ loading, prices, timeRange, metaData }: Props) {
  const {
    demo,
    appState: { activeData },
  } = useContext(StockContext);

  const chartDataAvailable = !loading && activeData && metaData;

  if (!chartDataAvailable) {
    return <SummaryDataSkeleton loading={loading} />;
  }

  const { currency, marketClose, timezone, name } = activeData;
  const { Symbol: symbol, 'Last Refreshed': date } = metaData;
  const closingInfo =
    `${date ? `${formatAppDate(date)} at` : ''} ${marketClose} ${timezone}`.trim();
  const [earliest, latest] = prices;
  const difference = latest - earliest;
  const isNegative = difference < 0;
  const differencePercentage = Math.abs(difference / earliest) * 100;
  const description = find(STOCK_TYPES, ['text', timeRange])?.description || '';
  const ArrowIcon = isNegative ? ArrowDownIcon : ArrowUpIcon;

  return (
    <Wrapper>
      <Typography
        variant="h4"
        color="text.primary"
        sx={{ display: 'flex', alignItems: 'baseline' }}
      >
        {latest.toFixed(2)}
        {currency && (
          <Typography
            variant="subtitle1"
            component="span"
            color="text.secondary"
            sx={{ ml: 0.5 }}
          >
            {currency}
          </Typography>
        )}
      </Typography>

      <DiffWrapper>
        <PercentageChange $isNegative={isNegative}>
          <ArrowIcon fontSize="small" />
          {differencePercentage.toFixed(2)}%
        </PercentageChange>
        <DiffTextWrapper $isNegative={isNegative}>
          {isNegative ? '-' : '+'}
          {Math.abs(difference).toFixed(2)}
        </DiffTextWrapper>
        {description}
      </DiffWrapper>

      <FlexWrapper>
        <Typography variant="body2" color="text.secondary">
          {closingInfo}
        </Typography>

        <Separator />

        <Typography variant="body2" color="text.secondary">
          <b>{symbol}</b>
          {/* hide name for demo endpoints usage */}
          {!demo ? (
            <Name>
              {' - '}
              {name}
            </Name>
          ) : null}
        </Typography>
      </FlexWrapper>
    </Wrapper>
  );
}

export default Summary;
