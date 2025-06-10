import './style.css';
import { useState } from 'react';
import { CircleUserRound } from 'lucide-react';
import { ReusableModal } from '../ReusableModal';

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="app-header--left">
        <div className="logo" />
        <h1>Spendwise</h1>
      </div>
      <div className="app-header--right">
        <div
          className="menu"
          role="button"
          onClick={() => setIsModalOpen(true)}
        >
          <CircleUserRound color="var(--primaryColor)" size={40} />
        </div>
        <div className="name">{localStorage.getItem('userName')}</div>
      </div>
      <ReusableModal
        title="Username"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        username={true}
      />
    </header>
  );
};
