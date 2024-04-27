import React, { useContext } from 'react';
import { BoardContext } from '../BoardsProvider.js';
import './CoordinatesList.css';

/**
 * Handles the checkbox change event.
 *
 * @param {number} id - The id of the checkbox
 * @return {void}
 */
const CoardinatesList = ({
  items,
  setItems,
  // mode,

  // setdeleteItems,
}) => {
  const { firestoreBoards } = useContext(BoardContext);

  /**
   * Handles the checkbox change event for adding an item to the list.
   *
   * @param {number} id - The id of the checkbox
   * @return {void}
   */
  const handleCheckboxChangeAdd = (id) => {
    const selectedIndex = items.indexOf(id);

    if (selectedIndex === -1) {
      setItems([...items, id]);
    } else {
      setItems(items.filter((item) => item !== id));
    }
  };

  return (
    <div className="coordinates-list">
      <div className="scrollable-container">
        <ul>
          {firestoreBoards.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={items.includes(item.id)}
                onChange={() => handleCheckboxChangeAdd(item.id)}
              />
              {item.id}: {item.lantitude}, {item.altitude}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoardinatesList;
