import { AddSpending } from '../../components/AddSpending';
import { SpeedDialTooltipOpen } from '../../components/SpeedDial';
import { TitlePage } from '../../components/TitlePage';

import './style.css';
import React, { useState } from 'react';

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const user = localStorage.getItem('userName');

  const onSpendingClick = () => {
    setIsModalOpen(true);
  };

  console.log('Hello', user);
  return (
    <div className="spendings">
      {!!user ? (
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
      )}
    </div>
  );
};
