import { PieChart, Pie, Cell, Tooltip } from 'recharts';

export const LimitDonut = ({ spent, free }) => {
  const data01 = [
    { name: 'Spent', value: spent, price: `${spent} Kč` },
    { name: 'Free', value: free, price: `${free} Kč` },
  ];

  const COLORS = ['#123150', '#E6DFD4'];

  return (
    <PieChart width={300} height={100}>
      <Pie
        data={data01}
        s
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
        {data01.map((_, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip
        formatter={(value, name, entry) => entry?.payload?.price || ''}
      />
    </PieChart>
  );
};
