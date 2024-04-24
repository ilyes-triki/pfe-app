import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import app from '../../../config/firebase-config.js';

import './Popup.css';
import CoardinatesList from './CoardinatesList.js';

const Popup = ({ isOpen, onClose, markers, boards }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const db = getDatabase(app);
  console.log('from mode popup', boards);

  useEffect(() => {
    if (!isOpen && selectedItems.length > 0) {
      // setSelectedItems([]);
    }
  }, [isOpen, selectedItems]);

  const handleAdd = () => {
    const boardsRef = ref(db, 'options/boards');
    set(boardsRef, {
      ...selectedItems,
    })
      .then(() => {
        console.log('Items added to Realtime Database:', selectedItems);
        setSelectedItems([]);
      })
      .catch((error) => {
        console.error('Error adding items to Realtime Database:', error);
      });
    onClose();
    window.location.reload();
  };
  return (
    <div className={`popup ${isOpen ? 'active' : ''}`}>
      <div className="popup-content">
        <h2>Popup Title</h2>
        <CoardinatesList
          items={selectedItems}
          setItems={setSelectedItems}
          data={markers}
          rtdbboards={boards}
        />

        {selectedItems.length > 0 && (
          <button onClick={handleAdd}>Add Boards</button>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
