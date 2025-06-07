import './style.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
            <h3>Add spending</h3>
            <div className="close-btn">
              <Button onClick={() => setIsOpen(false)} variant="outlined">
                X
              </Button>
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

              <FormControl
                className="input"
                sx={{ m: 1, minWidth: 120 }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Tag</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
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
            </div>

            <Button className="save-btn" type="submit" variant="contained">
              Save
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
