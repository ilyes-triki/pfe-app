import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import app from '../../../config/firebase-config.js';

import './Popup.css';

const Popup = ({ isOpen, onClose, markers }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const db = getDatabase(app);

  useEffect(() => {
    if (!isOpen && selectedItems.length > 0) {
      setSelectedItems([]);
    }
  }, [isOpen, selectedItems, markers]);

  const handleCheckboxChange = (id) => {
    const selectedIndex = selectedItems.indexOf(id);
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

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
  };
  return (
    <div className={`popup ${isOpen ? 'active' : ''}`}>
      <div className="popup-content">
        <h2>Popup Title</h2>

        <ul>
          {markers.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              {item.id}: {item.alt}, {item.lan}
            </li>
          ))}
        </ul>
        {selectedItems.length > 0 && (
          <button onClick={handleAdd}>Add Boards</button>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
