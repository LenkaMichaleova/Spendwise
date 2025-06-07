import './style.css';
import React, { useState } from 'react';

export const AddSpending = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [tag, setTag] = useState('Groceries');

  const handleSubmit = () => {
    const saveChanges = async (e) => {
      e.preventDefault();
    };
  };

  return (
    <div className="add-spending-modal">
      <div className="add-spending-content">
        <button onClick={() => setIsOpen(true)}> Add Spending</button>

        {isOpen && (
          <form onSubmit={handleSubmit}>
            <button
              type="button"
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
            <label>Name:</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
            />
            <label>Price:</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              value={price}
            />

            <label>Tag:</label>
            <select
              onChange={(e) => setTag(e.target.value)}
              value={tag}
              id="select"
            >
              <option value="Groceries">Groceries</option>
              <option value="Food&Drink">Eating Out</option>
              <option value="Shopping&Clothes">Shopping & Clothes</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Transport&Travel">Transport & Travel</option>

              <option value="Other">Other</option>
            </select>

            <button className="save-btn" type="submit">
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
