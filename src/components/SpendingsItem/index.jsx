import { Tag } from 'lucide-react';
import './style.css';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import NightlifeOutlinedIcon from '@mui/icons-material/NightlifeOutlined';

export const SpendingItem = ( {name, tag, price, icon} ) => {

  return(
    <button className='spending-item'>
      <span className='spending-item__name'>{name}</span>
      <span className='spending-item__others'>
        <span className='item__tag'>
          <Tag color={`var(--${tag})`}/>
        </span>
        <span className='item__price'>{price} Kč</span>
        <span className='item__icon'>
          {icon === "spendings" ?
            <AddCardOutlinedIcon />
          :
            <NightlifeOutlinedIcon />
          }
        </span>
      </span>
    </button>
  )
}
