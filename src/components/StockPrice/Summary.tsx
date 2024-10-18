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
  date?: string;
};

function Summary({ price, date }: Props) {
  const {
    appState: { activeData },
  } = useContext(StockContext);

  if (!activeData) return null;

  const { currency, marketClose, timezone, symbol, name } = activeData;
  const closingInfo =
    `${date ? `${formatDate(date)} at` : ''} ${marketClose} ${timezone}`.trim();

  return (
    <Wrapper>
      <Typography variant="h4" color="text.primary">
        {price} {currency || ''}
      </Typography>

      <FlexWrapper>
        <Typography variant="body2" color="text.secondary">
          {closingInfo}
        </Typography>

        <Separator />

        <Typography variant="body2" color="text.secondary">
          <b>{symbol}</b> <Name>({name})</Name>
        </Typography>
      </FlexWrapper>
    </Wrapper>
  );
}

export default memo(Summary);
