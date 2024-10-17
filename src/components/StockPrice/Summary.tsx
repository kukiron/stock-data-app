import { memo, useContext } from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';

import { gray70 } from 'lib/colors';
import { formatDate } from 'lib/date';
import { StockContext } from 'contexts/StockContext';

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const Separator = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${gray70};
`;

type Props = {
  price: number;
  date?: string;
};

function Summary({ price, date }: Props) {
  const {
    appState: { activeData },
  } = useContext(StockContext);

  if (!activeData) return null;

  const { currency, marketClose, timezone, symbol } = activeData;
  const closingInfo =
    `${date ? `${formatDate(date)} at` : ''} ${marketClose} ${timezone}`.trim();

  return (
    <Wrapper>
      <Typography variant="h3" color="text.primary">
        {price} {currency || ''}
      </Typography>

      <FlexWrapper>
        <Typography variant="body2" color="text.secondary">
          {closingInfo}
        </Typography>

        <Separator />

        <Typography variant="body2" color="text.secondary">
          {symbol}
        </Typography>
      </FlexWrapper>
    </Wrapper>
  );
}

export default memo(Summary);
