import { PieChart, Pie, Cell, Tooltip } from 'recharts';

export const LimitDonut = ({ spent, free }) => {
  const isLimitExceeded = spent > spent + free;

  const totalLimit = spent + free;

  const normalData = [
    { name: 'Spent', value: spent, display: `${spent} Kč`, color: '#123150' },
    { name: 'Free', value: free, display: `${free} Kč`, color: '#E6DFD4' },
  ];

  const exceededData = [
    { name: 'Spent', value: 100, display: `${spent} Kč`, color: '#ff0000' },
    { name: 'Exceeded', value: 0, display: `${free} Kč`, color: '#ff0000' },
  ];

  const chartData = isLimitExceeded ? exceededData : normalData;

  // const colors = ['#123150', '#E6DFD4'];
  // const exceededColors = ['#ff0000', '#ff0000'];

  return (
    <PieChart width={100} height={100}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={15}
        outerRadius={40}
        startAngle={90}
        endAngle={450}
        // label={({ name }) => name}
      >
        {chartData.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip
        formatter={(value, name, entry) =>
          isLimitExceeded
            ? [`Over limit: ${spent - totalLimit} Kč`]
            : [`Remaining ${totalLimit - spent} Kč` || '']
        }
      />
    </PieChart>
  );
};
