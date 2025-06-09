import './style.css';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SessionItem = ({
  id,
  name,
  price,
  count,
  setSession
}) => {

  const { sessionId } = useParams()

  const handlePlus = () => {
    const localStorageItems = JSON.parse(localStorage.getItem('items')) ?? [];
    const matchingSession = localStorageItems.find(item => item.id === sessionId);

    const itemIndex = matchingSession.items.findIndex(item => item.id === id);

    matchingSession.items[itemIndex].count += 1;
    
    localStorage.setItem('items', JSON.stringify(localStorageItems));
    setSession({ ...matchingSession });
  };

  const handleMinus = () => {
    const localStorageItems = JSON.parse(localStorage.getItem('items')) ?? [];
    const matchingSession = localStorageItems.find(item => item.id === sessionId);
    const itemIndex = matchingSession.items.findIndex(item => item.id === id);

    if (count === 1) {
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this item?',
      );
      if (isConfirmed) {
        matchingSession.splice(itemIndex, 1)
        setSession(...matchingSession)
      }
    } else {
      matchingSession.items[itemIndex].count -= 1;
        
      localStorage.setItem('items', JSON.stringify(localStorageItems));
      setSession({ ...matchingSession });
    }
  };

  useEffect(() => {
    setSession()
  },[])

  return (
    <div className="session__item">
      <span className="session__item__name">{name}</span>
      <span className="session__item__others">
        <span className="item__count">{count}x</span>
        <span className="item__price">
          <strong>{price}</strong>
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
