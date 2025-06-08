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

export const SessionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [session, setSession] = useState();
  const [items, setItems] = useState([]);
  // const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const { sessionId } = useParams();

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

  const localStorageItems = JSON.parse(localStorage.getItem("items")) ?? []

  console.log(localStorageItems)

  const sessionItems = localStorageItems?.find((item) => item.id === sessionId)?.items ?? []

  console.log("session items", sessionItems)

  const handleSubmit = (obj) => {
    const localStorageItems = JSON.parse(localStorage.getItem('items'));
    const matchingSession = localStorageItems.filter(
      (item) => item.id === sessionId,
    )?.[0];

    const currentItems = matchingSession.items ?? []
    matchingSession.items = [...currentItems, obj]
    console.log("match", matchingSession)

    Object.assign(localStorageItems.find(item=> item.id === sessionId ), matchingSession)
    localStorage.setItem("items", JSON.stringify(localStorageItems))
  }

  useEffect(() => {
    const localStorageItems = JSON.parse(localStorage.getItem('items'));
    const matchingSession = localStorageItems.filter(
      (item) => item.id === sessionId,
    );
    setSession(matchingSession[0]);
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
          onClick={() => navigate(`/Menu/${sessionId}`)}
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
        onSubmit={handleSubmit}
      />

      <div className="session__items-box">
        {sessionItems?.map((item, index) => (
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
        {session?.sessionLimit !== 0 && (
          <div className="limit">
            <span>Limit: {session?.sessionLimit}</span>
          </div>
        )}

        {session?.sessionLimit !== 0 && (
          <LimitDonut spent={400} free={100} />
        )}
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
