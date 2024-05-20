import React, { useState, useContext, useEffect } from 'react';
import { getDatabase, ref, set, update } from 'firebase/database';
import Popup from '../popup-elements/Popup.js';
import { BoardContext } from '../../BoardsProvider.js';

import './ModeSelector.css';

/**
 * Renders a component for selecting a mode and updating the mode in the database.
 *
 * @param {Object} props - The component props.
 * @param {string} props.initialMode - The initial mode to be selected.
 * @return {JSX.Element} The rendered component.
 */
const ModeSelector = ({ initialMode }) => {
  const { localBoards, setLocalBoards, commonBoards } =
    useContext(BoardContext);

  useEffect(() => {
    setLocalBoards(commonBoards);
  });
  const [selectedMode, setSelectedMode] = useState(`${initialMode}`);
  const [descriptionsVisible, setDescriptionsVisible] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const db = getDatabase();

  /**
   * A function that handles the mode change event.
   *
   * @param {Event} event - The event object triggered by the mode change.
   * @return {void} No return value.
   */
  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
    setDescriptionsVisible(true);
  };
  /**
   * Toggles the visibility of the popup.
   *
   * @return {void} No return value.
   */
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  /**
   * Updates the mode in the database.
   *
   * @return {Promise<void>} - A promise that resolves when the mode is updated successfully.
   */

  const updateModeInDatabase = async () => {
    let updatedLocalBoards = localBoards.map(
      (board) => board.match(/-b(\d+)/)[1]
    );
    if (
      parseInt(selectedMode) === 1 ||
      parseInt(selectedMode) === 5 ||
      parseInt(selectedMode) === 6
    ) {
      setLocalBoards([]);
      updatedLocalBoards = [];
    }
    try {
      const boardsRef = ref(db, 'options/boards');

      await set(boardsRef, {
        ...updatedLocalBoards,
      }).catch((error) => {
        console.error('Error adding items to Realtime Database:', error);
      });
      await update(ref(db, 'options'), {
        mode: parseInt(selectedMode),
        updated: true,
      });

      console.log('Mode updated in the database:', selectedMode);

      alert('Mode updated successfully!');
    } catch (error) {
      console.error('Error updating mode:', error);
      alert('Error updating mode. Please try again.');
    }
  };
  return (
    <div>
      <h2>Select Mode:</h2>
      {/*  1 monotone  */}
      <div>
        <input
          type="radio"
          id="mode1"
          name="mode"
          value="1"
          checked={selectedMode === '1'}
          onChange={handleModeChange}
        />
        <label htmlFor="mode1">Mode 1</label>
        {selectedMode === '1' && descriptionsVisible && (
          <p>Description for Mode 2</p>
        )}
      </div>
      {/*   2 :monotone specific */}
      <div>
        <input
          type="radio"
          id="mode2"
          name="mode"
          value="2"
          checked={selectedMode === '2'}
          onChange={handleModeChange}
        />
        <label htmlFor="mode2">Mode 2</label>
        {selectedMode === '2' && descriptionsVisible && (
          <div className="description">
            <p>Description for Mode 2</p>
            <button onClick={togglePopup}>Select Boards</button>
            <Popup isOpen={isPopupOpen} onClose={togglePopup} />
          </div>
        )}
      </div>
      {/*   3 :specific on  */}
      <div>
        <input
          type="radio"
          id="mode3"
          name="mode"
          value="3"
          checked={selectedMode === '3'}
          onChange={handleModeChange}
        />
        <label htmlFor="mode3">Mode 3</label>
        {selectedMode === '3' && descriptionsVisible && (
          <div className="description">
            <p>Description for Mode 2</p>
            <button onClick={togglePopup}>Select Boards</button>
            <Popup isOpen={isPopupOpen} onClose={togglePopup} />
          </div>
        )}
      </div>
      {/* 4 : specific off  */}
      <div>
        <input
          type="radio"
          id="mode4"
          name="mode"
          value="4"
          checked={selectedMode === '4'}
          onChange={handleModeChange}
        />
        <label htmlFor="mode4">Mode 4</label>
        {selectedMode === '4' && descriptionsVisible && (
          <div className="description">
            <p>Description for Mode 2</p>
            <button onClick={togglePopup}>Select Boards</button>
            <Popup isOpen={isPopupOpen} onClose={togglePopup} />
          </div>
        )}
      </div>
      {/* 5 : all on */}
      <div>
        <input
          type="radio"
          id="mode5"
          name="mode"
          value="5"
          checked={selectedMode === '5'}
          onChange={handleModeChange}
        />
        <label htmlFor="mode5">Mode 5</label>
        {selectedMode === '5' && descriptionsVisible && (
          <p>Description for Mode 2</p>
        )}
      </div>
      {/*   6 : all off */}
      <div>
        <input
          type="radio"
          id="mode6"
          name="mode"
          value="6"
          checked={selectedMode === '6'}
          onChange={handleModeChange}
        />
        <label htmlFor="mode6">Mode 6</label>
        {selectedMode === '6' && descriptionsVisible && (
          <p>Description for Mode 2</p>
        )}
      </div>
      <button onClick={updateModeInDatabase}>Update Mode</button>
    </div>
  );
};

export default ModeSelector;
