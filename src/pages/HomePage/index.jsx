import { ReusableModal } from '../../components/ReusableModal';
import { SpeedDialTooltipOpen } from '../../components/SpeedDial';
import './style.css';
import { useState } from 'react';

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([])

  console.log(items)

  const handleSubmit = (formItems) => {
    setItems(prevItems => [...prevItems, formItems])
  }

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
        onSubmit={handleSubmit}
      />
      <SpeedDialTooltipOpen 
        onSpendingClick={() => setIsModalOpen(true)} 
      />
    </div>
  );
};
