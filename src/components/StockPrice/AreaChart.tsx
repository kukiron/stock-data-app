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

import { blueGray, bluePurple, lightGreen } from 'lib/colors';
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
        margin={{ top: 10, right: 25, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={lightGreen} stopOpacity={0.8} />
            <stop offset="95%" stopColor={lightGreen} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          axisLine={false}
          tickMargin={10}
          padding={{ left: 40 }}
          style={{
            fill: blueGray,
            fontSize: '0.8rem',
            fontWeight: '500',
          }}
          tickLine={{ stroke: bluePurple }}
        />
        <YAxis
          dataKey="closingPrice"
          axisLine={false}
          style={{
            fill: blueGray,
            fontSize: '0.8rem',
            fontWeight: '500',
          }}
          mirror
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
          stroke={lightGreen}
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default memo(DailyStockChart);
