import React, { useState, useEffect, useContext } from 'react';
import CoardinatesList from '../CoardinatesList.js';
import { BoardContext } from '../../BoardsProvider.js';
import './Popup.css';

const Popup = ({ isOpen, onClose }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { addBoardsToLocal } = useContext(BoardContext);

  useEffect(() => {
    if (!isOpen && selectedItems.length > 0) {
    }
  }, [isOpen, selectedItems]);

  const handleAdd = () => {
    addBoardsToLocal(selectedItems);
    onClose();
  };

  return (
    <div className={`popup ${isOpen ? 'active' : ''}`}>
      <div className="popup-content">
        <h2>Popup Title</h2>
        <CoardinatesList items={selectedItems} setItems={setSelectedItems} />

        {selectedItems.length > 0 && (
          <button onClick={handleAdd}>Add Boards</button>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
