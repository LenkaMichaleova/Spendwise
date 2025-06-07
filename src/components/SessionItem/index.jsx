import './style.css';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { useState } from 'react';

export const SessionItem = ( {id, name, price, setItems} ) => {
  const [count, setCount] = useState(1)

  const handlePlus = () => {
    setCount(old => old + 1)
  }

  const handleMinus = () => {
    if (count === 1) {
      const isConfirmed = window.confirm("Are you sure you want to delete this item?")
      if (isConfirmed) {
        setItems(old => old.filter(item => item.id !== id))
      }
    }
    setCount(old => old -1)
  }

  return(
    <div className='session__item'>
      <span className='session__item__name'>{name}</span>
      <span className='session__item__others'>
        <span className='item__count'>{count}x</span>
        <span className='item__price'><strong>{price}</strong></span>
        <span role='button' className='item__icon' onClick={handlePlus}>
          <AddBoxOutlinedIcon style={{color:"var(--primaryColor)"}}/>
        </span>
        <span role='button' className='item__icon' onClick={handleMinus}>
          <IndeterminateCheckBoxOutlinedIcon style={{color:"var(--primaryColor)"}}/>
        </span>
      </span>
    </div>
  )
}