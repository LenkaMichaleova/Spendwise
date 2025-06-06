import { ChartNoAxesColumn, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import './style.css';

export const NavPC = () => (
  <nav className="navigace__PC-mode">
    <Link to="/HomePage" className="ikon home">
      <Home color="var(--secondaryColor)" size={36} strokeWidth={2} />
      Home
    </Link>
    <Link to="/Stats" className="ikon stats">
      <ChartNoAxesColumn
        color="var(--secondaryColor)"
        size={36}
        strokeWidth={2}
      />
      Stats
    </Link>
  </nav>
);
