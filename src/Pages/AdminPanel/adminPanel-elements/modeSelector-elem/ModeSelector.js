import React, { useState, useContext, useEffect } from 'react';
import { getDatabase, ref, set, update } from 'firebase/database';
import Popup from '../popup-elements/Popup.js';
import { BoardContext } from '../../BoardsProvider.js';
import { Radio, message } from 'antd';

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

      message.success('mode updated successfully');
    } catch (error) {
      console.error('Error updating mode:', error);
      message.error('An error occurred while updating the mode.');
    }
  };
  return (
    <div className="outer-mode-selector">
      <div className="title">
        <h2>Select Mode</h2>
      </div>

      <Radio.Group
        className="inner-mode-selector"
        onChange={handleModeChange}
        value={selectedMode}
      >
        {/* 1 monotone */}
        <Radio checked={selectedMode === '1'} value={'1'}>
          <h3>Mode Monotone : </h3>
          {selectedMode === '1' && descriptionsVisible && (
            <div className="description">
              <p>
                Cette mode permettre aux poteaux de fonction sans aucune
                intervention
              </p>
            </div>
          )}
        </Radio>
        {/*   2 :monotone specific */}

        <Radio checked={selectedMode === '2'} value={'2'}>
          <h3>Mode Monotone-Spécific : </h3>

          {selectedMode === '2' && descriptionsVisible && (
            <div className="description">
              <p>
                Cette mode permettre aux poteaux choisis de fonctioné sans
                aucune intervention
              </p>
              <button className="outlined-button" onClick={togglePopup}>
                Select Boards
              </button>
              <Popup isOpen={isPopupOpen} onClose={togglePopup} />
            </div>
          )}
        </Radio>
        {/*   3 :specific on  */}

        <Radio checked={selectedMode === '3'} value={'3'}>
          <h3>Mode Specific-On : </h3>
          {selectedMode === '3' && descriptionsVisible && (
            <div className="description">
              <p>Cette mode allume touts les poteaux choisis</p>
              <button className="outlined-button" onClick={togglePopup}>
                Select Boards
              </button>
              <Popup isOpen={isPopupOpen} onClose={togglePopup} />
            </div>
          )}
        </Radio>
        {/* 4 : specific off  */}

        <Radio checked={selectedMode === '4'} value={'4'}>
          <h3> Mode Specific-Off : </h3>
          {selectedMode === '4' && descriptionsVisible && (
            <div className="description">
              <p>Cette mode éteint touts les poteaux choisis</p>
              <button className="outlined-button" onClick={togglePopup}>
                Select Boards
              </button>
              <Popup isOpen={isPopupOpen} onClose={togglePopup} />
            </div>
          )}
        </Radio>
        {/* 5 : all on */}

        <Radio checked={selectedMode === '5'} value={'5'}>
          <h3>Mode On : </h3>
          {selectedMode === '5' && descriptionsVisible && (
            <div className="description">
              <p>Cette mode allume touts les poteaux</p>
            </div>
          )}
        </Radio>
        {/*   6 : all off */}
        <Radio checked={selectedMode === '6'} value={'6'}>
          <h3>Mode Off : </h3>
          {selectedMode === '6' && descriptionsVisible && (
            <div className="description">
              <p>Cette mode éteint touts les poteaux</p>
            </div>
          )}
        </Radio>
      </Radio.Group>
      <div className="mode-button"></div>
      <button className="outlined-button" onClick={updateModeInDatabase}>
        Update Mode
      </button>
    </div>
  );
};

export default ModeSelector;
