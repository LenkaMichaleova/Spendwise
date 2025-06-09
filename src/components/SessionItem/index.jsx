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
  setItems,
  // setItemCount,
  setSession
}) => {

  const [itemCount, setItemCount] = useState()
  const { sessionId } = useParams()

  const handlePlus = () => {

    const localStorageItems = JSON.parse(localStorage.getItem('items'));
    console.log("localStorageItems", localStorageItems)

    const matchingSession = localStorageItems.filter(
      (item) => item.id === sessionId,
    )?.[0];
    console.log("matching session",matchingSession)

    const sessionItems = matchingSession.items
    console.log("sessionItems", sessionItems)

    const itemCount = sessionItems[id].count
    console.log("itemCount", itemCount)
    
    
    itemCount = ((old) => old + 1)
    console.log("itemCount", uptdateCount)

    setSession((old) => ({ ...old, count: sessionItems[id].count + 1 }))
  };

  const handleMinus = () => {
    if (count === 1) {
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this item?',
      );
      if (isConfirmed) {
        setItems((old) => old.filter((item) => item.id !== id));
      }
    } else {
      setItemCount(id, -1);
    }
  };

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
