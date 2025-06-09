import { BarGraph } from '../../components/BarGraph';
import { DonutChart } from '../../components/DonutChart';
import { OverviewForm } from '../../components/OverviewForm';
import { useState } from 'react';
import './style.css';

export const StatsPage = () => {
  const [selectedView, setSelectedView] = useState('Monthly');
  const localStorageItems = JSON.parse(localStorage.getItem('items')) || [];
  console.log(localStorageItems);

  return (
    <div className="content">
      <div className="stats-header">
        <h1>{selectedView} Overall</h1>
        <OverviewForm
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />
      </div>
      <BarGraph data={localStorageItems} view={selectedView} />
      <DonutChart data={localStorageItems} view={selectedView} />
    </div>
  );
};
