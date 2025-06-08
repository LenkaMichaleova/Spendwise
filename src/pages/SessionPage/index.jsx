import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { BackButton } from '../../components/BackButton';
import { SessionItem } from '../../components/SessionItem';
import { ReusableBtn } from '../../components/ReusableBtn';
import { ReusableModal } from '../../components/ReusableModal';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const polozky = [
  { id: 1, name: 'knedlo vepřo zelo', price: 250 },
  { id: 2, name: 'knedlo kuřo zelo', price: 248 },
  { id: 3, name: 'knedlo zelo (pro vegany)', price: 205 },
];

export const SessionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState(polozky);
  const [total, setTotal] = useState(0);
  const [sessionLimit, setSessionLimit] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let totalPrice = 0;
    polozky.forEach((polozka) => {
      totalPrice += polozka.price;
    });
    setTotal(totalPrice);
  }, [polozky]);

  return (
    <div className="session">
      <BackButton path="/HomePage" />
      <div className="session-header">
        <div className="session-edit">
          <h1>Session</h1>
          <EditOutlinedIcon />
        </div>
        <div
          role="button"
          className="session-menu"
          onClick={() => navigate('/Menu')}
        >
          <CameraAltOutlinedIcon />
          <span>Menu</span>
        </div>
      </div>

      <div className="session-btn">
        <ReusableBtn
          title="Add Spending"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <ReusableModal
        title="Add Item"
        itemName={true}
        itemPrice={true}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <div className="session__items-box">
        {items.map((item, index) => (
          <SessionItem
            key={`${item.name}-${index}`}
            id={item.id}
            name={item.name}
            price={`${item.price},-`}
            setItems={setItems}
          />
        ))}
      </div>

      <div className="limit-wrapper">
        <ReusableModal
          sessionLimit={sessionLimit}
          setSessionLimit={setSessionLimit}
        />
      </div>
      <div className="price-wrapper">
        <div className="total-price">
          <span>Total:</span>
          {total} Kč
        </div>
      </div>
    </div>
  );
};
