import { Tag, Trash, Trash2 } from 'lucide-react';
import './style.css';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import NightlifeOutlinedIcon from '@mui/icons-material/NightlifeOutlined';
import { useNavigate } from 'react-router-dom';

export const SpendingItem = ({ name, tag, price, icon, id, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (icon === 'session') {
      navigate(`/Session/${id}`);
    }
  };

  return (
    <button
      className={`spending-item ${
        icon === 'spendings' ? 'spendings-item' : 'session-item'
      }`}
      onClick={handleClick}
    >
      <span className="item__tag">
        <Tag color={`var(--${tag})`} size={22} />
      </span>
      <span className="spending-item__name">{name}</span>
      <span className="spending-item__others">
        <span className="item__price">{price} Kč</span>
        <span className="item__icon">
          {icon === 'spendings' ? (
            <AddCardOutlinedIcon />
          ) : (
            <NightlifeOutlinedIcon />
          )}
        </span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="item__delete"
        >
          <Trash2 color={`var(--primaryColor)`} size={20} />
        </span>
      </span>
    </button>
  );
};
