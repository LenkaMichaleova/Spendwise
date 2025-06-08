import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { BackButton } from '../../components/BackButton';
import { SessionItem } from '../../components/SessionItem';
import { ReusableBtn } from '../../components/ReusableBtn';
import { ReusableModal } from '../../components/ReusableModal';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LimitDonut } from '../../components/LimitDonut';
import { useParams } from 'react-router-dom';

const polozky = [
  { id: 1, name: 'knedlo vepřo zelo', price: 250, count: 1 },
  { id: 2, name: 'knedlo kuřo zelo', price: 248, count: 1 },
  { id: 3, name: 'knedlo zelo (pro vegany)', price: 205, count: 1 },
];

export const SessionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState(polozky);
  // const [total, setTotal] = useState(0);
  const [isLimit, setIsLimit] = useState(false);
  const [sessionLimit, setSessionLimit] = useState(0);
  const navigate = useNavigate();
  const { sessionId } = useParams();

  console.log(sessionId);

  const setItemCount = (id, count) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count + count };
      }
      return item;
    });

    setItems(newItems);
  };

  const totalPrice = items.reduce(
    (acc, polozka) => acc + polozka.price * polozka.count,
    0,
  );

  const limit = localStorage.getItem('limit');
  useEffect(() => {
    const localStorageItems = JSON.parse(localStorage.getItem('items'));
    const matchingItem = localStorageItems.filter((id) => id === sessionId);
    console.log(matchingItem);
  }, [sessionId]);

  return (
    <div className="content">
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
            count={item.count}
            setItemCount={setItemCount}
            key={`${item.name}-${index}`}
            id={item.id}
            name={item.name}
            price={`${item.price},-`}
            setItems={setItems}
          />
        ))}
      </div>

      <div className="limit-price-wrapper">
        {isLimit && (
          <div className="limit">
            <span>Limit: {limit}</span>
          </div>
        )}

        <LimitDonut spent={400} free={100} />
        <div className="price-wrapper">
          <div className="total-price">
            <span>Total:</span>
            {totalPrice} Kč
          </div>
        </div>
      </div>
    </div>
  );
};
