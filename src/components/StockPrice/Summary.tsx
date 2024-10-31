import { useContext } from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';

import { gray70 } from 'lib/colors';
import { formatAppDate } from 'lib/date';
import { BREAK_POINT_SM } from 'lib/breakpoints';
import type { DaiyStockMetaData } from 'data/types';
import { StockContext } from 'contexts/StockContext';
import { SummaryDataSkeleton } from 'components/common';

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

const Wrapper = styled.div`
  margin: 0.25rem 0 0 1rem;
  letter-spacing: 0.5px;
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
  price: number | undefined;
  metaData: DaiyStockMetaData | undefined;
};

function Summary({ loading, price, metaData }: Props) {
  const {
    demo,
    appState: { activeData },
  } = useContext(StockContext);

  const chartDataAvailable = !loading && activeData && price && metaData;

  if (!chartDataAvailable) {
    return <SummaryDataSkeleton loading={loading} />;
  }

  const { currency, marketClose, timezone, name } = activeData;
  const { Symbol: symbol, 'Last Refreshed': date } = metaData;
  const closingInfo =
    `${date ? `${formatAppDate(date)} at` : ''} ${marketClose} ${timezone}`.trim();

  return (
    <Wrapper>
      <Typography
        variant="h4"
        color="text.primary"
        sx={{ display: 'flex', alignItems: 'baseline' }}
      >
        {price.toFixed(2)}
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
