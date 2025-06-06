import { ChartNoAxesColumn, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import './style.css';

export const NavMobile = () => (
  <nav className="navigation mobile-mode">
    <Link to="/HomePage" className="home">
      <Home color="var(--primaryColor)" size={36} strokeWidth={2} />
    </Link>
    <Link to="/Stats" className="stats">
      <ChartNoAxesColumn
        color="var(--primaryColor)"
        size={36}
        strokeWidth={2}
      />
    </Link>
  </nav>
);
