import { AddSpending } from '../../components/AddSpending';
import { SpeedDialTooltipOpen } from '../../components/SpeedDial';
import './style.css';

export const HomePage = () => {
  return (
    <div className="container">
      <h1>HomePage</h1>
      <AddSpending />
      <SpeedDialTooltipOpen />
    </div>
  );
};
