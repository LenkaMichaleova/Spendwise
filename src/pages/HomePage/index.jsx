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
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  const seznam = [ 
    //spending
    {name: "jméno", id:1, tag:"groceries", price: 0, icon},
    //session
    {name: "Název session", id:1, tag:"groceries", price: 0, icon, polozky: [{name: "jméno", id:1, tag:"eating-out", price: 0, icon}] }

  ]

  const handleSubmit = (formItems) => {
    setItems(prevItems => [...prevItems, formItems])
  }

  const handleSessionSubmit = () => {

    navigate("/Session")
  }

  return (
    <div className="content">
      <h1>Spendings</h1>

      <div className='spendings'>
        {items.map(item => 
          <SpendingItem key={item.id} name={item.name} price={item.price} tag={item.tag}/>
        )}
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
