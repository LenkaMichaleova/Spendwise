import './style.css';
import { parseISO, getWeek, getDay } from 'date-fns';
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
  const currentDate = new Date();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const spendingPerDay = new Array(daysInMonth).fill(0);
  const spendingPerDayOfWeek = new Array(7).fill(0);
  const currentWeekNumber = getWeek(currentDate, { weekStartsOn: 1 });

  for (let i = 0; i < data.length; i++) {
    const date = new Date(data[i].date);
    const weekNumber = getWeek(date, { weekStartsOn: 1 });
    let include = false;

    if (view === 'Monthly') {
      include =
        date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    } else if (view === 'Weekly') {
      include =
        weekNumber === currentWeekNumber &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear;
    } else if (view === 'Daily') {
      include =
        date.getDate() === currentDay &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear;
    }
    if (!include) continue;

    const dayOfMonth = date.getDate();
    spendingPerDay[dayOfMonth - 1] += Number(data[i].price);

    if (view === 'Weekly') {
      const date2 = parseISO(data[i].date);
      const dayOfWeek = (getDay(date2) + 6) % 7;
      spendingPerDayOfWeek[dayOfWeek] += Number(data[i].price);
    }
  }

  const chartData = spendingPerDay.map((amount, index) => ({
    day: `${(index + 1).toString()}`,
    amount: amount,
  }));

  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const chartData2 = weekDays.map((day, index) => ({
    name: day,
    value: spendingPerDayOfWeek[index],
  }));

  const totalWeeklySpending = spendingPerDayOfWeek.reduce(
    (sum, val) => sum + val,
    0,
  );
  const averageWeeklySpending = totalWeeklySpending / 7;

  const totalMonthlySpending = spendingPerDay.reduce(
    (sum, val) => sum + val,
    0,
  );
  const averageMonthlySpending = totalMonthlySpending / spendingPerDay.length;

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

  if (totalMonthlySpending === 0) {
    return;
  }

  if (view === 'Weekly' && totalWeeklySpending === 0) {
    return;
  }

  return (
    <>
      {view === 'Monthly' && (
        <div
          className="bargraph-wrapper"
          style={{ width: '100%', height: 170 }}
        >
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
                y={averageMonthlySpending}
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
      )}
      {view === 'Weekly' && (
        <div
          className="bargraph-wrapper"
          style={{ width: '100%', height: 170 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                interval={0}
                tick={{
                  fontSize: 10,
                  angle: -20,
                  textAnchor: 'end',
                }}
              />
              <YAxis tickFormatter={priceFormatter} tick={{ fontSize: 12 }} />
              <ReferenceLine
                y={averageWeeklySpending}
                stroke="red"
                strokeDasharray="3 3"
              />
              <Tooltip formatter={(value) => [`${value} Kč`, 'Price']} />

              <Bar dataKey="value" fill="#123150" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};
