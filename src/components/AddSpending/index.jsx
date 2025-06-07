import './style.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';

export const AddSpending = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = () => {
    const saveChanges = async (e) => {
      e.preventDefault();
    };
  };

  return (
    <div className="add-spending-modal">
      <button onClick={() => setIsOpen(true)}> Add Spending</button>

      {isOpen && (
        <div className="add-spending-content">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <h3>Add spending</h3>
              <div className="close-btn">
                <CloseIcon onClick={() => setIsOpen(false)} />
              </div>
            </div>

            <div className="inputs">
              <TextField
                slotProps={{
                  htmlInput: {
                    style: {
                      height: '10px',
                    },
                  },
                }}
                className="input"
                onChange={(e) => setName(e.target.value)}
                type="text"
                value={name}
                id="outlined-basic"
                label="Name"
                variant="outlined"
              />

              <TextField
                slotProps={{
                  htmlInput: {
                    style: {
                      height: '10px',
                    },
                  },
                }}
                className="input"
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                label="Price"
                value={price}
                variant="outlined"
              />

              <FormControl className="input">
                <InputLabel>Tag</InputLabel>
                <Select
                  style={{ height: 35 }}
                  value={tag}
                  label="Tag"
                  onChange={(e) => setTag(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Groceries">Groceries</MenuItem>
                  <MenuItem value="Food&Drink">Eating Out</MenuItem>
                  <MenuItem value="Entertainment">Entertainment</MenuItem>
                  <MenuItem value="Transport&Travel">
                    Transport & Travel
                  </MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <Button className="save-btn" type="submit" variant="contained">
                Save
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
