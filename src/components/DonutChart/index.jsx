import './style.css';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const DonutChart = ({ data, view }) => {
  const colors = {
    groceries: '#87CEEB',
    'eating-out': '#79CB9C',
    'transport-and-travel': '#E6C87C',
    entertainment: '#FF6961',
    other: '#CCCCCC',
  };

  console.log('Here is you dream data', data);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // const tags = [
  //   'groceries',
  //   'eating-out',
  //   'entertainment',
  //   'transport-and-travel',
  //   'other',
  // ];

  const tags = [
    { id: 'groceries', label: 'Groceries' },
    { id: 'eating-out', label: 'Eating Out' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'transport-and-travel', label: 'Transport&Travel' },
    { id: 'other', label: 'Other' },
  ];

  const monthlySpendingPerTag = new Array(tags.length).fill(0);

  for (let i = 0; i < data.length; i++) {
    const date = new Date(data[i].date);

    if (
      date.getMonth() !== currentMonth ||
      date.getFullYear() !== currentYear
    ) {
      continue;
    }

    const itemTag = data[i].tag;
    const tagIndex = tags.findIndex((tag) => tag.id === itemTag);

    if (tagIndex !== -1) {
      monthlySpendingPerTag[tagIndex] += Number(data[i].price);
    }
  }

  const chartData = monthlySpendingPerTag.map((price, index) => ({
    id: tags[index].id,
    label: tags[index].label,
    price: price,
  }));

  const filteredData = chartData.filter((item) => item.price > 0);
  console.log(filteredData);

  if (filteredData.length === 0) {
    return <p>No data available for this month. </p>;
  }

  return (
    <div className="donutchart-wrapper">
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={filteredData}
            dataKey="price"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={15}
            outerRadius={40}
            paddingAngle={1}
            label
          >
            {filteredData.map((input, index) => {
              return (
                <Cell
                  key={`cell${index}`}
                  fill={colors[input.id] || '#000000'}
                />
              );
            })}
          </Pie>
        </PieChart>
        <div className="label-wrapper">
          <ul className="list-of-categories">
            {filteredData.map((entry, index) => {
              return (
                <li
                  key={`item${index}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    listStyleType: 'none',
                  }}
                >
                  <span
                    style={{
                      width: '1rem',
                      height: '1rem',
                      backgroundColor: colors[entry.id] || '#000000',
                      marginRight: '0.5rem',
                    }}
                  ></span>
                  <span>{entry.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </ResponsiveContainer>
      <p>{view}</p>
    </div>
  );
};
