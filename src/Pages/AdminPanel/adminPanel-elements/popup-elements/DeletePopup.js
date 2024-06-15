import React, { useState, useContext } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { BoardContext } from '../../BoardsProvider.js';
import { db as firestoreDb } from '../../../../config/firebase-config.js';
import { message, Button, Checkbox } from 'antd';

import './DeletePopup.css';

/**
 * Renders a popup for deleting items from the firestoreBoards array.
 *
 * @param {Object} props - The props object containing isOpen and onClose.
 * @param {boolean} props.isOpen - A boolean indicating whether the popup is open.
 * @param {function} props.onClose - A function to close the popup.
 * @return {JSX.Element} The rendered DeletePopup component.
 */
const DeletePopup = ({ isOpen, onClose }) => {
  const {
    setCommonBoards,
    firestoreBoards,
    setFirestoreBoards,
    setLocalBoards,
    localBoards,
    commonBoards,
  } = useContext(BoardContext);
  const [selectedToDeleteItems, setSelectedToDeleteItems] = useState([]);

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

  /**
   * A function that handles the deletion of documents from firestore based on the selectedToDeleteItems.
   *
   * @return {Promise<void>} A promise that resolves after successful deletion or rejects with an error.
   */

  const handleDelete = async () => {
    try {
      for (const id of selectedToDeleteItems) {
        const collectionRef = doc(firestoreDb, 'markers', id);
        await deleteDoc(collectionRef);
        message.success('Coardinates deleted successfully !');

        console.log(`Document with ID ${id} successfully deleted!`);
      }
      const updatedFirestoreBoards = firestoreBoards.filter(
        (item) => !selectedToDeleteItems.includes(item.id)
      );
      const updatedLocalBoards = localBoards.filter(
        (board) =>
          !selectedToDeleteItems
            .map((board) => board.match(/-b(\d+)/)[1])
            .includes(board)
      );
      const updatedCommonBoards = commonBoards.filter(
        (board) =>
          !selectedToDeleteItems
            .map((board) => board.match(/-b(\d+)/)[1])
            .includes(board)
      );

      await setFirestoreBoards(updatedFirestoreBoards);
      await setLocalBoards(updatedLocalBoards);
      await setCommonBoards(updatedCommonBoards);
    } catch (error) {
      console.error('Error deleting documents:', error);
    }
    setSelectedToDeleteItems([]);
  };

  return (
    <div className={`popup ${isOpen ? 'active' : ''}`}>
      <div className="popup-content-delete">
        <h2>Delete Coardinates</h2>
        {selectedToDeleteItems.length > 0 && (
          <button className="outlined-button" onClick={unselect}>
            Unselect all
          </button>
        )}
        {selectedToDeleteItems.length === 0 && (
          <button className="outlined-button" onClick={select}>
            Select all
          </button>
        )}
        <div className="scrollable-container">
          <ul>
            {firestoreBoards
              .sort(
                (a, b) => a.id.match(/-b(\d+)/)[1] - b.id.match(/-b(\d+)/)[1]
              )
              .map((item, index) => (
                <li key={index}>
                  <Checkbox
                    type="checkbox"
                    checked={selectedToDeleteItems.includes(item.id)}
                    onChange={() => handleCheckboxChangeAdd(item.id)}
                  >
                    {item.id} :
                    <p>
                      {' '}
                      latitude : {item.latitude}, altitude : {item.altitude}
                    </p>
                  </Checkbox>
                </li>
              ))}
          </ul>
        </div>
        {selectedToDeleteItems.length > 0 && (
          <Button danger onClick={handleDelete}>
            Delete Boards
          </Button>
        )}
        <button className="outlined-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
