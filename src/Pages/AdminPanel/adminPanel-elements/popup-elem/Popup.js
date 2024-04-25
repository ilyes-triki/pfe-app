import React, { useState, useEffect, useContext } from 'react';
import CoardinatesList from '../CoardinatesList.js';
import { BoardContext } from '../../BoardsProvider.js';
import './Popup.css';

const Popup = ({ isOpen, onClose }) => {
  const { addBoardsToLocal, commonBoards } = useContext(BoardContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setSelectedItems(commonBoards);
  }, [commonBoards]);
  useEffect(() => {
    setHasChanges(!arraysEqual(selectedItems, commonBoards));
  }, [selectedItems, commonBoards]);

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const handleAdd = () => {
    addBoardsToLocal(selectedItems);
    onClose();
  };

  return (
    <div className={`popup ${isOpen ? 'active' : ''}`}>
      <div className="popup-content">
        <h2>Popup Title</h2>
        <CoardinatesList items={selectedItems} setItems={setSelectedItems} />

        {hasChanges && <button onClick={handleAdd}>Add Boards</button>}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
