import { Link } from 'react-router-dom';
import './style.css';
import { ArrowLeft } from 'lucide-react';

export const BackButton = ( {path} ) => (
  <Link to={path} className='back-btn'>
    <ArrowLeft 
      color="var(--primaryColor)" 
      size={36} 
      strokeWidth={2}
    />
  </Link>
)
