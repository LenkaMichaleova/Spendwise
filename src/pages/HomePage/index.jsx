import { AddSpending } from '../../components/AddSpending';
import { SpeedDialTooltipOpen } from '../../components/SpeedDial';

import './style.css';
import React, { useState } from 'react';

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // const user = localStorage.getItem('userName');

  const onSpendingClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="content">
      <h1>Spendings</h1>
      <AddSpending isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <SpeedDialTooltipOpen onSpendingClick={onSpendingClick} />

      {/* {!!user ? (
        <>
          <TitlePage user={user} />
          <h1>Spendings</h1>
          <AddSpending
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          <SpeedDialTooltipOpen onSpendingClick={onSpendingClick} />
        </>
      ) : (
        <>
          <TitlePage />
        </>
      )} */}
    </div>
  );
};
