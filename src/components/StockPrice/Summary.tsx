import { memo, useContext } from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';

import { gray70 } from 'lib/colors';
import { formatDate } from 'lib/date';
import type { DaiyStockMetaData } from 'data/types';
import { StockContext } from 'contexts/StockContext';

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

const Wrapper = styled.div`
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
`;

const Separator = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${gray70};
`;

const Name = styled.span`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

type Props = {
  price: number;
  metaData: DaiyStockMetaData;
};

function Summary({ price, metaData }: Props) {
  const {
    demo,
    appState: { activeData },
  } = useContext(StockContext);

  if (!activeData) return null;

  const { currency, marketClose, timezone, name } = activeData;
  const { Symbol: symbol, 'Last Refreshed': date } = metaData;
  const closingInfo =
    `${date ? `${formatDate(date)} at` : ''} ${marketClose} ${timezone}`.trim();

  return (
    <Wrapper>
      <Typography variant="h4" color="text.primary">
        {price.toFixed(2)} {currency || ''}
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

export default memo(Summary);
