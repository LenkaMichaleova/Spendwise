import './style.css';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { useParams } from 'react-router-dom';

export const SessionItem = ({ id, name, price, count, setSession }) => {
  const { sessionId } = useParams();

  const handlePlus = () => {
    const localStorageItems = JSON.parse(localStorage.getItem('items')) || [];
    const sessionIndex = localStorageItems.findIndex(
      (item) => item.id === sessionId,
    );

    if (sessionId === -1) return;
    const sessionItems = localStorageItems[sessionIndex].items;
    if (sessionItems[id]) {
      sessionItems[id].count += 1;
    }
    localStorageItems[sessionIndex].items = sessionItems;
    localStorage.setItem('items', JSON.stringify(localStorageItems));
    setSession((old) => ({ ...old, items: sessionItems }));
  };

  const handleMinus = () => {
    const localStorageItems = JSON.parse(localStorage.getItem('items')) || [];
    const sessionIndex = localStorageItems.findIndex(
      (item) => item.id === sessionId,
    );

    if (sessionId === -1) return;
    const sessionItems = localStorageItems[sessionIndex].items;
    if (sessionItems[id].count === 1 || sessionItems[id].count === undefined) {
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this item?',
      );
      if (!isConfirmed) return;
      sessionItems.splice(id, 1);
    } else {
      sessionItems[id].count -= 1;
    }
    localStorageItems[sessionIndex].items = sessionItems;
    localStorage.setItem('items', JSON.stringify(localStorageItems));
    setSession((old) => ({ ...old, items: sessionItems }));
  };

  return (
    <div className="session__item">
      <span className="session__item__name">{name}</span>
      <span className="session__item__others">
        <span className="item__count">{count}x</span>
        <span className="item__price">
          <strong>{price} ,-</strong>
        </span>
        <span role="button" className="item__icon" onClick={handlePlus}>
          <AddBoxOutlinedIcon style={{ color: 'var(--primaryColor)' }} />
        </span>
        <span role="button" className="item__icon" onClick={handleMinus}>
          <IndeterminateCheckBoxOutlinedIcon
            style={{ color: 'var(--primaryColor)' }}
          />
        </span>
      </span>
    </div>
  );
};
