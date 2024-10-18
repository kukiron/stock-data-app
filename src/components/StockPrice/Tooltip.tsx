import { memo, useContext } from 'react';
import styled from 'styled-components';

import { StockContext } from 'contexts/StockContext';
import { lightGrey } from 'lib/colors';

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
  payload: {
    value: number;
  }[];
  label: string;
  active: boolean;
};

function CustomTooltip({ active, payload, label }: Props) {
  const {
    appState: { activeData },
  } = useContext(StockContext);

  if (!active) return null;

  return (
    <Wrapper>
      <Label>{label} (closing)</Label>
      {payload.map(({ value }, i) => (
        <Value key={`custom-tooltip-${i}`}>
          <b>
            {value} {activeData?.currency || ''}
          </b>
        </Value>
      ))}
    </Wrapper>
  );
}

export default memo(CustomTooltip);
