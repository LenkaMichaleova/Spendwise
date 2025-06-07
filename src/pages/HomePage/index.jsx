import { AddSpending } from '../../components/AddSpending';
import { SpeedDialTooltipOpen } from '../../components/SpeedDial';
import './style.css';

export const HomePage = () => {
  return (
    <div className="spendings">
        <h1>Spendings</h1>
        <AddSpending />
        <SpeedDialTooltipOpen />
    </div>
  );
};
