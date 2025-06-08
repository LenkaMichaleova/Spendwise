import './style.css';
import Button from '@mui/material/Button';

export const ReusableBtn = ( {title, type, onClick, disabled} ) => {
  return( 
    <Button
        disabled={disabled}
        className="btn"
        type={type}
        variant="contained"
        style={{ backgroundColor: 'var(--primaryColor)' }}
        onClick={onClick}
        >
        {title}
    </Button>
  )
}