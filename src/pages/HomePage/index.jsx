import { AddSpending } from '../../components/AddSpending';
import { ReusableModal } from '../../components/ReusableModal';
import { SpeedDialTooltipOpen } from '../../components/SpeedDial';

import './style.css';
import React, { useState } from 'react';

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="content">
      <h1>Spendings</h1>

      <div className='spendings'>

      </div>
      
      <ReusableModal 
        title="Add Spending" 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen}
        itemName={true}
        itemPrice={true}
        itemTag={true}
      />
      <SpeedDialTooltipOpen 
        onSpendingClick={() => setIsModalOpen(true)} 
      />
    </div>
  );
};
