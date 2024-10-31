import styled from 'styled-components';

import { lightGrey } from 'lib/colors';
import type { DailyStockChartItem } from 'data/types';

const Wrapper = styled.div`
  background: ${lightGrey};
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
`;

const Label = styled.div`
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;

const Value = styled.div`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

type Props = {
  active: boolean;
  payload: {
    value: number;
    payload: DailyStockChartItem;
  }[];
  currency: string;
};

function CustomTooltip({ active, payload, currency }: Props) {
  if (!active || !payload?.length) return null;

  const { price, tooltip: date } = payload[0].payload;
  return (
    <Wrapper>
      <Label>{date}</Label>
      <Value>
        <b>
          {price} {currency}
        </b>
      </Value>
    </Wrapper>
  );
}

export default CustomTooltip;
