import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import ModeSelector from './adminPanel-elements/modeSelector-elem/ModeSelector.js';
import app from '../../config/firebase-config';
import MapElement from './adminPanel-elements/map-element/MapElement.js';
import AddCoardinates from './adminPanel-elements/addCoardinates-element/AddCoardinates.js';

import './AdminPage.css';

/**
 * Fetches data from the database and sets the mode based on the retrieved data.
 *
 * @return {void}
 */
const AdminPanel = () => {
  let [mode, setmode] = useState();

  const db = getDatabase(app);

  useEffect(() => {
    fetchData();
  });

  /**
   * Fetches data asynchronously from the database and updates the mode based on the snapshot.
   *
   * @return {void} No return value
   */
  const fetchData = async () => {
    const dbRef = ref(db, 'options');
    const snapShot = await get(dbRef);

    if (snapShot.exists()) {
      setmode(snapShot.val().mode);
    }
  };

  return (
    <div className="admin-container">
      <div className="panels-container">
        {/* Ligth control panel */}
        <div className="ligth-control">
          <div className="ligth-control-element">
            {' '}
            {mode !== undefined ? (
              <ModeSelector initialMode={mode} />
            ) : (
              'fetching data ...'
            )}{' '}
          </div>
        </div>
        <MapElement />
        {/* coardinates control panel */}
        <div className="coardinates-control">
          <AddCoardinates />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
