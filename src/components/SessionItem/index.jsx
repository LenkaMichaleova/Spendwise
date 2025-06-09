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
  setSession,
}) => {
  const { sessionId } = useParams();

  // const handlePlus = () => {
  //   const localStorageItems = JSON.parse(localStorage.getItem('items'));
  //   console.log('localStorageItems', localStorageItems);

  //   const matchingSession = localStorageItems.filter(
  //     (item) => item.id === sessionId,
  //   )?.[0];
  //   console.log('matching session', matchingSession);

  //   const sessionItems = matchingSession.items;
  //   console.log('sessionItems', sessionItems);

  //   // const itemCount = sessionItems[id].count
  //   // console.log("itemCount", itemCount)

  //   // itemCount = ((old) => old + 1)
  //   // console.log('itemCount', uptdateCount);
  //   // let newCount = (sessionItems[id].count += 1);
  //   setItemCount((old) => old + 1);
  //   sessionItems[id].count = itemCount;

  //   setSession((old) => ({ ...old, count: sessionItems[id].count }));
  // };

  const handlePlus = () => {
    const localStorageItems = JSON.parse(localStorage.getItem('items')) || [];
    const sessionIndex = localStorageItems.findIndex(
      (item) => item.id === sessionId,
    );

    if (sessionId === -1) return;
    const sessionItems = localStorageItems[sessionIndex].items; //zoberieme v3etkz items zo session
    if (sessionItems[id]) {
      sessionItems[id].count += 1;
    }
    localStorageItems[sessionIndex].items = sessionItems;
    localStorage.setItem('items', JSON.stringify(localStorageItems));
    setSession((old) => ({ ...old, items: sessionItems }));
  };

  // const handleMinus = () => {
  //   if (count === 1) {
  //     const isConfirmed = window.confirm(
  //       'Are you sure you want to delete this item?',
  //     );
  //     if (isConfirmed) {
  //       setItems((old) => old.filter((item) => item.id !== id));
  //     }
  //   } else {
  //     setItemCount(id, -1);
  //   }
  // };
  const handleMinus = () => {
    const localStorageItems = JSON.parse(localStorage.getItem('items')) || [];
    const sessionIndex = localStorageItems.findIndex(
      (item) => item.id === sessionId,
    ); // index aktualnej session podla session id

    if (sessionId === -1) return; // ak nenajde tak nič
    const sessionItems = localStorageItems[sessionIndex].items; //yoberieme v3etkz items yo session
    if (sessionItems[id].count === 1) {
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
