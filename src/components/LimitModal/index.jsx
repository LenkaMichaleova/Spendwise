import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';

export const LimitModal = ({
  isLimitModalOpen,
  setIsLimitModalOpen,
  sessionLimit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newLimitValue = e.target.limit.value;
    setIsLimitModalOpen(false);
    console.log(newLimitValue);
  };

  return (
    <>
      <Dialog disableRestoreFocus open={isLimitModalOpen}>
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>Edit limit</h3>
            {/* <div className="close-btn">
              <CloseIcon onClick={() => setIsModalOpen(false)} />
            </div> */}
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
