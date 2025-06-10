import './style.css';
import Button from '@mui/material/Button';

export const ReusableBtn = ( {title, type, onClick, disabled} ) => {
  return( 
    <Button
        disabled={disabled}
        className="btn"
        type={type}
        variant="contained"
        style={{ backgroundColor: disabled ? "var(--secondaryColor)" : "var(--primaryColor)" }}
        onClick={onClick}
        >
        {title}
    </Button>
  )
}