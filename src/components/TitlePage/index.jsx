import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './style.css';

export const TitlePage = () => {
  const [name, setName] = useState(localStorage.getItem('userName') || '');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName');

  useEffect(() => {
    if (name) {
      setTimeout(() => {
        navigate('/HomePage');
      }, 3000);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim()) {
      localStorage.setItem('userName', name.trim());
      navigate('/HomePage');
    } else {
      setError(true);
    }
  };

  return (
    <div className="title-page">
      <div className="title-page__header">
        <div className="title-logo">
          <img
            className="logo-image"
            src="src\components\Header\img\logo1.png"
            alt="logo"
          ></img>
          <p>Spendwise</p>
        </div>
        <div className="title-page__heading">
          <div className="welcome">
            Welcome {userName && ` back, ${userName}!`}
          </div>
          <div>Track your spending.</div>
          <div>Pay what's fair.</div>
        </div>
      </div>

      {!userName ? (
        <form className="title-page__form" onSubmit={handleSubmit}>
          <div className="title-page__name">
            <TextField
              sx={{ '& .MuiInputBase-root': { height: '50px', width: '100%' } }}
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              id="outlined-basic"
              label="Set username"
              variant="outlined"
            />

            <p className="error-text">{error && 'Please set your username'}</p>
          </div>
          <Button
            className="save-btn"
            type="submit"
            variant="contained"
            style={{ backgroundColor: 'var(--primaryColor)' }}
          >
            Start Spending
          </Button>
        </form>
      ) : (
        <div className="loading">Loading ...</div>
      )}
    </div>
  );
};
