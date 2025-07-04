import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import './style.css';
import { useState } from 'react';
import { ReusableBtn } from '../ReusableBtn';

export const NewSessionModal = ({
  title,
  isModalOpen,
  setIsModalOpen,
  onSubmit,
}) => {
  const [sessionName, setSessionName] = useState('Session');
  const [sessionLimit, setSessionLimit] = useState(0);
  const isDisabled = !!sessionName;

  const handleSubmit = (e) => {
    e.preventDefault();

    const objectToSend = {
      sessionName,
      price: Number(0),
      tag: 'eating-out',
      sessionLimit: Number(sessionLimit),
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    onSubmit(objectToSend);

    setIsModalOpen(false);
  };

  return (
    <Dialog
      disableRestoreFocus
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <div className="reusable-modal">
        <div className="reusable-modal__content">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <h3>{title}</h3>
              <div className="close-btn">
                <CloseIcon onClick={() => setIsModalOpen(false)} />
              </div>
            </div>

            <div className="inputs">
              <TextField
                sx={{ '& .MuiInputBase-root': { height: '50px' } }}
                className="input"
                onChange={(e) => setSessionName(e.target.value)}
                type="text"
                value={sessionName}
                id="outlined-basic"
                label="Session name"
                variant="outlined"
                inputProps={{ maxLength: 20 }}
              />

              <TextField
                sx={{ '& .MuiInputBase-root': { height: '50px' } }}
                className="input"
                onChange={(e) => setSessionLimit(e.target.value)}
                type="number"
                value={sessionLimit}
                id="outlined-basic"
                label="limit"
                variant="outlined"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 5 }}
              />

              <ReusableBtn title="Save" type="submit" disabled={!isDisabled} />
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
