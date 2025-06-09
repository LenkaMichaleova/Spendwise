import { BarGraph } from '../../components/BarGraph';
import { DonutChart } from '../../components/DonutChart';
import './style.css';

export const StatsPage = () => {
  const localStorageItems = JSON.parse(localStorage.getItem('items')) || [];
  console.log(localStorageItems);

  return (
    <div className="content">
      <h1>Monthly Overall</h1>
      <DonutChart data={localStorageItems} />
      {/* <BarGraph data={localStorageItems} /> */}
    </div>
  );
};
