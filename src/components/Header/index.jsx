import './style.css';
import { CircleUserRound } from 'lucide-react';

export const Header = () => (
  <header className="app-header">
    <div className="app-header--left">
      <div className="logo" />
      <h1>Spendwise</h1>
    </div>
    <div className="app-header--right">
      <div className="menu">
        <CircleUserRound color="var(--primaryColor)" size={40} />
      </div>
      <div className="name">{localStorage.getItem('userName')}</div>
    </div>
  </header>
);
