import { AddSpending } from '../../components/AddSpending';
import { SpeedDialTooltipOpen } from '../../components/SpeedDial';
import './style.css';
import React from 'react';

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const onSpendingClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="spendings">
      <h1>Spendings</h1>
      <AddSpending isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <SpeedDialTooltipOpen onSpendingClick={onSpendingClick} />
    </div>
  );
};
