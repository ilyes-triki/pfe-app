import React, { useState, useEffect, useContext } from 'react';
import { BoardContext } from '../../BoardsProvider.js';
import { message, Button, Checkbox } from 'antd';

import './Popup.css';

/**
 * Renders a popup component.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - {boolean} isOpen - Indicates whether the popup is open or not.
 *   - {function} onClose - The function to be called when the popup is closed.
 * @return {JSX.Element} The rendered popup component.
 */
const Popup = ({ isOpen, onClose }) => {
  const { addBoardsToLocal, commonBoards, setCommonBoards, firestoreBoards } =
    useContext(BoardContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setSelectedItems(commonBoards);
  }, [commonBoards]);
  useEffect(() => {
    setHasChanges(!arraysEqual(selectedItems, commonBoards));
  }, [selectedItems, commonBoards]);

  /**
   * Checks if two arrays are equal in terms of elements and length.
   *
   * @param {Array} arr1 - The first array to compare.
   * @param {Array} arr2 - The second array to compare.
   * @return {boolean} Returns true if the arrays are equal, false otherwise.
   */
  const arraysEqual = (arr1, arr2) => {
    let unequalElem = true;
    let unequalLen = true;
    if (arr1.length !== arr2.length) unequalLen = false;
    for (const element of arr1) {
      if (arr2.indexOf(element) === -1) {
        unequalElem = false;
      }
    }
    return unequalElem && unequalLen;
  };

  /**
   * A function that handles the addition of items to the common boards.
   *
   * @param {type} selectedItems - the items to be added to the common boards
   * @return {type} undefined
   */
  const handleAdd = () => {
    setCommonBoards(selectedItems);
    addBoardsToLocal(selectedItems);
  };

  /**
   * Clears the selected items by setting the state of 'selectedItems' to an empty array.
   *
   * @return {void}
   */
  const unselect = () => {
    setSelectedItems([]);
  };
  /**
   * Selects all items from the firestoreBoards array and sets the selectedItems state to the array of item ids.
   *
   * @return {void}
   */
  const select = () => {
    if (selectedItems.length === 0) {
      setSelectedItems(firestoreBoards.map((item) => item.id));
    }
  };
  /**
   * A function that handles the checkbox change event for adding or removing an item from the selectedItems array.
   *
   * @param {type} id - The id of the checkbox being changed
   * @return {type} undefined
   */
  const handleCheckboxChangeAdd = (id) => {
    const selectedIndex = selectedItems.indexOf(id);

    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };
  return (
    <div className={`popup ${isOpen ? 'active' : ''}`}>
      <div className="popup-content-mode">
        <div className="title">
          <h2>Select Boards</h2>
        </div>

        {selectedItems.length > 0 && (
          <button className="outlined-button" onClick={unselect}>
            Unselect all
          </button>
        )}
        {selectedItems.length === 0 && (
          <button className="outlined-button" onClick={select}>
            Select all
          </button>
        )}
        <div className="coordinates-list">
          <div className="scrollable-container">
            <ul>
              {firestoreBoards.map((item, key) => (
                <li key={key}>
                  <Checkbox
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
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
        </div>

        {hasChanges && (
          <button className="outlined-button" onClick={handleAdd}>
            Add Boards
          </button>
        )}
        <button className="outlined-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
