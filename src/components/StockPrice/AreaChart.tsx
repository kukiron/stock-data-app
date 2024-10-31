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

import { getChartPriceRange } from 'lib/chart';
import { blueGray, bluePurple, CHART_COLORS } from 'lib/colors';
import type { DailyStockChartItem, StockCategory } from 'data/types';

import CustomTooltip from './Tooltip';

const axisStyle = {
  fill: blueGray,
  fontSize: '0.75rem',
  fontWeight: '500',
};

type Props = {
  data: DailyStockChartItem[];
  currency: string;
  category: StockCategory;
};

function DailyStockChart({ data, currency, category }: Props) {
  const firstDatePrice = data[0].price;
  const lastDatePrice = data[data.length - 1].price;
  const { light: fill, dark: stroke } =
    firstDatePrice < lastDatePrice
      ? CHART_COLORS.bullish
      : CHART_COLORS.bearish;

  return (
    <ResponsiveContainer height={400}>
      <AreaChart data={data} margin={{ top: 25, right: 20, left: -20 }}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="25%" stopColor={fill} stopOpacity={0.8} />
            <stop offset="90%" stopColor={fill} stopOpacity={0} />
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
          domain={getChartPriceRange(data, category)}
        />
        <CartesianGrid strokeDasharray="1 1" vertical={false} />
        <Tooltip
          content={(props: any) => (
            <CustomTooltip {...props} currency={currency} />
          )}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke={stroke}
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default memo(DailyStockChart);
