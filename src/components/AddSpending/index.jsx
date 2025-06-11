import './style.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';

export const AddSpending = ({ isModalOpen, setIsModalOpen }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = () => {
    const saveChanges = async (e) => {
      e.preventDefault();
    };
  };

  return (
    <Dialog disableRestoreFocus open={isModalOpen}>
      <div className="add-spending-modal">
        <div className="add-spending-content">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <h3>Add spending</h3>
              <div className="close-btn">
                <CloseIcon onClick={() => setIsModalOpen(false)} />
              </div>
            </div>

            <div className="inputs">
              <TextField
                sx={{ '& .MuiInputBase-root': { height: '50px' } }}
                className="input"
                onChange={(e) => setName(e.target.value)}
                type="text"
                value={name}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                inputProps={{ maxLength: 20 }}
              />

              <TextField
                sx={{ '& .MuiInputBase-root': { height: '50px' } }}
                className="input"
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                label="Price"
                value={price}
                variant="outlined"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 5 }}
              />

              <FormControl className="input">
                <InputLabel>Tag</InputLabel>
                <Select
                  style={{ height: 50 }}
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

              <Button
                className="save-btn"
                type="submit"
                variant="contained"
                style={{ backgroundColor: 'var(--primaryColor)' }}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
