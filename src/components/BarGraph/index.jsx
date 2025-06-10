import './style.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

export const BarGraph = ({ data, view }) => {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const spendingPerDay = new Array(daysInMonth).fill(0);

  for (let i = 0; i < data.length; i++) {
    const date = new Date(data[i].date);
    let include = false;

    if (view === 'Monthly') {
      include =
        date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    } else if (view === 'Daily') {
      include =
        date.getDate() === currentDay &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear;
    }
    if (!include) continue;

    const dayOfMonth = date.getDate();
    spendingPerDay[dayOfMonth - 1] += Number(data[i].price);
  }

  const chartData = spendingPerDay.map((amount, index) => ({
    day: `${(index + 1).toString()}`,
    amount: amount,
  }));

  const totalSpending = spendingPerDay.reduce((sum, val) => sum + val, 0);
  const averageSpending = totalSpending / spendingPerDay.length;

  const priceFormatter = (number) => {
    return number.toString() + ' Kč';
  };

  const dateFormatter = (dayInMonth) => {
    const date = new Date(currentYear, currentMonth, dayInMonth);
    return date.toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  return (
    <div className="bargraph-wrapper" style={{ width: '100%', height: 170 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            interval={1}
            tick={{
              fontSize: 10,
              angle: -45,
              textAnchor: 'end',
            }}
            tickFormatter={dateFormatter}
          />
          <YAxis tickFormatter={priceFormatter} tick={{ fontSize: 12 }} />
          <ReferenceLine
            y={averageSpending}
            stroke="red"
            strokeDasharray="3 3"
          />
          <Tooltip
            formatter={(value) => [`${value} Kč`, 'Price']}
            labelFormatter={(label) => `Date: ${dateFormatter(label)}`}
          />

          <Bar dataKey="amount" fill="#123150" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
