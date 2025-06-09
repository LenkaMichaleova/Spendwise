import { useNavigate } from 'react-router-dom';
import { ReusableModal } from '../../components/ReusableModal';
import { SpeedDialTooltipOpen } from '../../components/SpeedDial';
import { SpendingItem } from '../../components/SpendingsItem';
import './style.css';
import { useState } from 'react';
import { NewSessionModal } from '../../components/NewSessionModal';

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false)
  const navigate = useNavigate()

  const localStorageItems = JSON.parse(localStorage.getItem("items")) ?? []

  const handleSpendingSubmit = (formItems) => {
    const currentLocalStorage = JSON.parse(localStorage.getItem("items")) ?? []
    localStorage.setItem("items", JSON.stringify([...currentLocalStorage, formItems]))
  }

  const handleSessionSubmit = (obj) => {
    const currentLocalStorage = JSON.parse(localStorage.getItem("items")) ?? []
    localStorage.setItem("items", JSON.stringify([...currentLocalStorage, obj]))

    navigate(`/Session/${obj.id}`)
  }

  return (
    <div className="content">
      <h1>Spendings</h1>

      <div className='spendings'>
        {localStorageItems.slice().reverse().map(item => 
          <SpendingItem 
            key={item.id} 
            name={item.name || item.sessionName} 
            price={item.price} 
            tag={item.tag} 
            icon={item.name ? "spendings" : "session"}
            id={item.id}
          />
        )}
      </div>
      
      <ReusableModal 
        title="Add Spending" 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen}
        itemName={true}
        itemPrice={true}
        itemTag={true}
        onSubmit={handleSpendingSubmit}
      />

      <NewSessionModal 
        title="Name a session" 
        isModalOpen={isSessionModalOpen} 
        setIsModalOpen={setIsSessionModalOpen}
        onSubmit={handleSessionSubmit}
      />

      <SpeedDialTooltipOpen 
        onSpendingClick={() => setIsModalOpen(true)}
        onSessionClick={() => setIsSessionModalOpen(true)} 
      />
    </div>
  );
};
