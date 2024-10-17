import { memo, useContext } from 'react';
import styled from 'styled-components';

import { StockContext } from 'contexts/StockContext';

const Wrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
`;

const Label = styled.div`
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 8px;
`;

const Value = styled.div`
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
`;

const Color = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 2px;
  background-color: #82ca9d;
  margin-right: 6px;
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
      <Label>{label}</Label>
      {payload.map(({ value }, i) => (
        <Value key={`custom-tooltip-${i}`}>
          <Color />
          {value} {activeData?.currency || ''}
        </Value>
      ))}
    </Wrapper>
  );
}

export default memo(CustomTooltip);
