import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, update } from 'firebase/database';
import './ModeSelector.css';

const ModeSelector = ({ initialMode }) => {
  const [selectedMode, setSelectedMode] = useState(`${initialMode}`);
  const [descriptionsVisible, setDescriptionsVisible] = useState(true);
  const db = getDatabase();
  const dbRef = ref(db, 'options');

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
    setDescriptionsVisible(true);
  };
  const updateModeInDatabase = async () => {
    try {
      await update(ref(db, 'options'), { mode: selectedMode });
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
          <p>Description for Mode 2</p>
        )}
      </div>
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
          <p>Description for Mode 2</p>
        )}
      </div>
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
          <p>Description for Mode 2</p>
        )}
      </div>
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
