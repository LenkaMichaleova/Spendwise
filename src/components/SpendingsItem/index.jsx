import { Tag } from 'lucide-react';
import './style.css';

export const SpendingItem = ( {name, tag, price, icon} ) => {

  return(
    <button className='spending-item'>
      <span className='spending-item__name'>{name}</span>
      <span className='spending-item__others'>
        <span className='item__tag'>
          <Tag color={`var(--${tag})`}/>
        </span>
        <span className='item__price'>{price} Kč</span>
        <span className='item__icon'>{icon}</span>
      </span>
    </button>
  )
}
