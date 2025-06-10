import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import './style.css';
import { useState } from 'react';
import { ReusableBtn } from '../ReusableBtn';

export const ReusableModal = ({
  title,
  isModalOpen,
  setIsModalOpen,
  itemName,
  itemPrice,
  itemTag,
  sessionLimit,
  username,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [limit, setLimit] = useState(null);

  const [userName, setUserName] = useState(localStorage.getItem('userName'));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userName) {
      localStorage.setItem('userName', userName.trim());
      setIsModalOpen(false);
    }
    const objectToSend = {
      name,
      price,
      tag,
      limit,
      id: crypto.randomUUID(),
      date: new Date().toISOString(), //
      count: 1,
    };
    onSubmit?.(objectToSend); //

    setName('');
    setPrice('');
    setTag('');
    setLimit('');

    setIsModalOpen(false);
  };

  const isDisabled =
    (username && !!userName) ||
    (itemTag && !!name && !!price && !!tag) ||
    (!itemTag && !!name && !!price);

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
              {itemName && (
                <TextField
                  sx={{ '& .MuiInputBase-root': { height: '50px' } }}
                  className="input"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  value={name}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                />
              )}

              {itemPrice && (
                <TextField
                  sx={{ '& .MuiInputBase-root': { height: '50px' } }}
                  className="input"
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  label="Price"
                  value={price}
                  variant="outlined"
                />
              )}

              {itemTag && (
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
                    <MenuItem value="groceries">Groceries</MenuItem>
                    <MenuItem value="eating-out">Eating Out</MenuItem>
                    <MenuItem value="entertainment">Entertainment</MenuItem>
                    <MenuItem value="transport-and-travel">
                      Transport & Travel
                    </MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              )}

              {sessionLimit && (
                <TextField
                  sx={{ '& .MuiInputBase-root': { height: '50px' } }}
                  className="input"
                  onChange={(e) => setLimit(e.target.value)}
                  type="number"
                  value={limit}
                  id="outlined-basic"
                  label="Limit"
                  variant="outlined"
                />
              )}

              {username && (
                <TextField
                  sx={{ '& .MuiInputBase-root': { height: '50px' } }}
                  className="input"
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  value={userName}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                />
              )}

              <ReusableBtn title="Save" type="submit" disabled={!isDisabled} />
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
