import React, { useState, useContext, useEffect } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { BoardContext } from '../../BoardsProvider.js';
import { db as firestoreDb } from '../../../../config/firebase-config.js';

import './DeletePopup';

/**
 * Renders a popup for deleting items from the firestoreBoards array.
 *
 * @param {Object} props - The props object containing isOpen and onClose.
 * @param {boolean} props.isOpen - A boolean indicating whether the popup is open.
 * @param {function} props.onClose - A function to close the popup.
 * @return {JSX.Element} The rendered DeletePopup component.
 */
const DeletePopup = ({ isOpen, onClose }) => {
  const { firestoreBoards, setFirestoreBoards } = useContext(BoardContext);
  const [selectedToDeleteItems, setSelectedToDeleteItems] = useState([]);
  console.log(selectedToDeleteItems);

  /**
   * Clears the selected items by setting the state of 'selectedToDeleteItems' to an empty array.
   *
   * @return {void}
   */
  const unselect = () => {
    setSelectedToDeleteItems([]);
  };
  /**
   * Selects all items to delete if no items are currently selected.
   *
   * @return {void}
   */
  const select = () => {
    if (selectedToDeleteItems.length === 0) {
      setSelectedToDeleteItems(firestoreBoards.map((item) => item.id));
    }
  };
  /**
   * Handles the checkbox change event for adding or removing an item from the selectedToDeleteItems array.
   *
   * @param {type} id - The id of the checkbox being changed
   * @return {type} void
   */
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
            {firestoreBoards
              .sort(
                (a, b) => a.id.match(/-b(\d+)/)[1] - b.id.match(/-b(\d+)/)[1]
              )
              .map((item) => (
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
