import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './style.css';

// export const TitlePage = ({ user }) => {
//   const [name, setName] = useState(localStorage.getItem('userName') || '');
//   const [error, setError] = useState(false);
//   const [showContent1, setShowContent1] = useState(true);
//   const [showContent2, setShowContent2] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowContent1(false);
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, []);

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name.trim()) {
//       localStorage.setItem('userName', name.trim());
//       setShowContent2(false);
//       navigate('/');
//     } else {
//       setError(true);
//     }
//   };

//   return (
//     <div>
//       {user ? (
//         <>
//           {showContent1 && (
//             <>
//               <div className="title-page">
//                 <div className="title-page__header">
//                   <h1>Welcome back, {`${user}!`}</h1>
//                   <p>Track your spending</p>
//                   <p>Pay what's fair</p>
//                 </div>
//               </div>
//               <p>Loading ...</p>
//             </>
//           )}
//         </>
//       ) : (
//         <>
//           {showContent2 && (
//             <form onSubmit={handleSubmit}>
//               <div className="title-page__name">
//                 <label>Set username</label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <p className="error-text">
//                   {error && 'Please set your username'}
//                 </p>
//               </div>
//               <button type="submit" className="title-page__button">
//                 Start Spending
//               </button>
//             </form>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

export const TitlePage = () => {
  const [name, setName] = useState(localStorage.getItem('userName') || '');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName');

  // localStorage.clear();
  // localStorage.removeItem();

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
        <h1>Welcome {userName && ` back, ${userName}!`}</h1>
        <p>Track your spending</p>
        <p>Pay what's fair</p>
      </div>

      {!userName ? (
        <form onSubmit={handleSubmit}>
          <div className="title-page__name">
            <TextField
              sx={{ '& .MuiInputBase-root': { height: '50px' } }}
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              id="outlined-basic"
              label="Set username"
              variant="outlined"
            />
            {/* <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /> */}
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
          {/* <button type="submit" className="title-page__button">
            Start Spending
          </button> */}
        </form>
      ) : (
        <Link to="/HomePage" className="title-page__button">
          Start Spending
        </Link>
      )}
    </div>
  );
};
