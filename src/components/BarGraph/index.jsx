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

export const BarGraph = ({ data }) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const spendingPerDay = new Array(daysInMonth).fill(0);

  for (let i = 0; i < data.length; i++) {
    const date = new Date(data[i].date);

    if (
      date.getMonth() !== currentMonth ||
      date.getFullYear() !== currentYear
    ) {
      continue;
    }

    const dayOfMonth = date.getDate();
    spendingPerDay[dayOfMonth - 1] += Number(data[i].price);
  }

  const chartData = spendingPerDay.map((amount, index) => ({
    day: (index + 1).toString(),
    amount: amount,
  }));

  const totalSpending = spendingPerDay.reduce((sum, val) => sum + val, 0);
  const averageSpending = totalSpending / spendingPerDay.length;

  return (
    <div style={{ width: '100%', height: 250, marginBottom: 50 }}>
      <h2>Monthly spending for June</h2>
      <ResponsiveContainer width="80%" height="80%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" interval={1} tick={{ fontSize: 10 }} />
          <YAxis />
          <ReferenceLine
            y={averageSpending}
            stroke="red"
            strokeDasharray="3 3"
          />
          <Tooltip />
          <Bar dataKey="amount" fill="#123150" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
