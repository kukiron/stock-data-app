import { memo } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import { DailyStockChartItem } from 'data/types';
import CustomTooltip from './Tooltip';

type Props = {
  data: DailyStockChartItem[];
};

function DailyStockChart({ data }: Props) {
  return (
    <ResponsiveContainer height={400}>
      <AreaChart
        width={750}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          axisLine={false}
          tickMargin={10}
          // padding={{ left: 40, right: 30 }}
          style={{
            fill: '#5972A3',
            fontSize: '0.8rem',
            fontWeight: '500',
          }}
          tickLine={{ stroke: '#DCE4F3' }}
        />
        <YAxis
          dataKey="closingPrice"
          axisLine={false}
          style={{
            fill: '#5972A3',
            fontSize: '0.8rem',
            fontWeight: '500',
          }}
          // mirror
          scale="linear"
          tick={{ dy: 7 }}
          tickMargin={0}
          tickLine={false}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={(props: any) => <CustomTooltip {...props} />} />
        <Area
          type="monotone"
          dataKey="closingPrice"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default memo(DailyStockChart);
