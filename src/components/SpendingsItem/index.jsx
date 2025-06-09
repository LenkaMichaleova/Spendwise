import { Tag } from 'lucide-react';
import './style.css';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import NightlifeOutlinedIcon from '@mui/icons-material/NightlifeOutlined';
import { useNavigate } from 'react-router-dom';

export const SpendingItem = ( {name, tag, price, icon, id} ) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (icon === "session") {
      navigate(`/Session/${id}`)
    }
  }

  return(
    <button className='spending-item' onClick={handleClick}>
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
