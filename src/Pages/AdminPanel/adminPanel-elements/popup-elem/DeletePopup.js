import React, { useState, useContext, useEffect } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { BoardContext } from '../../BoardsProvider.js';
import { db as firestoreDb } from '../../../../config/firebase-config.js';

import './DeletePopup';

const DeletePopup = ({ isOpen, onClose }) => {
  const { firestoreBoards, setFirestoreBoards } = useContext(BoardContext);
  const [selectedToDeleteItems, setSelectedToDeleteItems] = useState([]);
  console.log(selectedToDeleteItems);

  const unselect = () => {
    setSelectedToDeleteItems([]);
  };
  const select = () => {
    if (selectedToDeleteItems.length === 0) {
      setSelectedToDeleteItems(firestoreBoards.map((item) => item.id));
    }
  };
  const handleCheckboxChangeAdd = (id) => {
    const selectedIndex = selectedToDeleteItems.indexOf(id);

    if (selectedIndex === -1) {
      setSelectedToDeleteItems([...selectedToDeleteItems, id]);
    } else {
      setSelectedToDeleteItems(
        selectedToDeleteItems.filter((item) => item !== id)
      );
    }
  };

  const handleDelete = async () => {
    try {
      for (const id of selectedToDeleteItems) {
        const collectionRef = doc(firestoreDb, 'markers', id);
        await deleteDoc(collectionRef);

        console.log(`Document with ID ${id} successfully deleted!`);
      }
      const updatedFirestoreBoards = firestoreBoards.filter(
        (item) => !selectedToDeleteItems.includes(item.id)
      );
      await setFirestoreBoards(updatedFirestoreBoards);
    } catch (error) {
      console.error('Error deleting documents:', error);
    }
    setSelectedToDeleteItems([]);
    onClose();
  };

  return (
    <div className={`popup ${isOpen ? 'active' : ''}`}>
      <div className="popup-content">
        <h2>Popup Title</h2>
        {selectedToDeleteItems.length > 0 && (
          <button onClick={unselect}>Unselect all</button>
        )}
        {selectedToDeleteItems.length === 0 && (
          <button onClick={select}>Select all</button>
        )}
        <div className="scrollable-container">
          <ul>
            {firestoreBoards.map((item) => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  checked={selectedToDeleteItems.includes(item.id)}
                  onChange={() => handleCheckboxChangeAdd(item.id)}
                />
                {item.id}: {item.lantitude}, {item.altitude}
              </li>
            ))}
          </ul>
        </div>
        <button onClick={onClose}>Close</button>
        {selectedToDeleteItems.length > 0 && (
          <button onClick={handleDelete}>Delete Boards</button>
        )}
      </div>
    </div>
  );
};

export default DeletePopup;
