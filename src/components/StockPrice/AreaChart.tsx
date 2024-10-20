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
import type { DailyStockChartItem } from 'data/types';

import CustomTooltip from './Tooltip';
import { getChartPriceRange } from 'lib/chart';

const axisStyle = {
  fill: blueGray,
  fontSize: '0.75rem',
  fontWeight: '500',
};

type Props = {
  data: DailyStockChartItem[];
};

function DailyStockChart({ data }: Props) {
  return (
    <ResponsiveContainer height={400}>
      <AreaChart data={data} margin={{ top: 25, right: 20, left: -20 }}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="25%" stopColor={lightGreen} stopOpacity={0.8} />
            <stop offset="90%" stopColor={lightGreen} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          axisLine={false}
          tickMargin={10}
          style={axisStyle}
          tickLine={{ stroke: bluePurple }}
        />
        <YAxis
          dataKey="price"
          axisLine={false}
          style={axisStyle}
          scale="linear"
          tickMargin={0}
          tickLine={false}
          domain={getChartPriceRange(data)}
        />
        <CartesianGrid strokeDasharray="1 1" vertical={false} />
        <Tooltip content={(props: any) => <CustomTooltip {...props} />} />
        <Area
          type="natural"
          dataKey="price"
          stroke={lightGreen}
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default memo(DailyStockChart);
