import { useState } from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';

export const LimitModal = ({
  isLimitModalOpen,
  setIsLimitModalOpen,
  sessionLimit,
  sessionId,
  setSession,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newLimitValue = Number(e.target.limit.value);
    setIsLimitModalOpen(false);
    // console.log(newLimitValue);

    const localStorageItems = JSON.parse(localStorage.getItem('items'));
    const matchingSession = localStorageItems.filter(
      (item) => item.id === sessionId,
    )?.[0];

    matchingSession.sessionLimit = newLimitValue;

    Object.assign(
      localStorageItems.find((item) => item.id === sessionId),
      matchingSession,
    );

    localStorage.setItem('items', JSON.stringify(localStorageItems));
    setSession((old) => ({ ...old, sessionLimit: newLimitValue }));
  };

  return (
    <>
      <Dialog disableRestoreFocus open={isLimitModalOpen}>
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>Edit limit</h3>
            <div className="close-btn">
              <CloseIcon onClick={() => setIsLimitModalOpen(false)} />
            </div>
          </div>

          <TextField
            sx={{ '& .MuiInputBase-root': { height: '50px' } }}
            className="input"
            name="limit"
            type="number"
            label="Limit"
            variant="outlined"
            defaultValue={sessionLimit}
          />

          <Button
            className="save-btn"
            type="submit"
            variant="contained"
            style={{ backgroundColor: 'var(--primaryColor)' }}
          >
            Save
          </Button>
        </form>
      </Dialog>
    </>
  );
};
