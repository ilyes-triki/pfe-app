import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db as fdb } from '../../config/firebase-config';
import { getDatabase, ref, get } from 'firebase/database';
import Navbar from '../../elements/navbar/Navbar.js';

import ModeSelector from './adminPanel-elements/modeSelector-elem/ModeSelector.js';

import app from '../../config/firebase-config';
import MapElement from './adminPanel-elements/map-element/MapElement.js';

import './AdminPage.css';

const AdminPanel = () => {
  let [mode, setmode] = useState();
  let [lantitude, setLantitude] = useState();
  let [altitude, setAltitude] = useState();
  let [boardNum, setBoardNum] = useState();

  const db = getDatabase(app);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const dbRef = ref(db, 'options');
    const snapShot = await get(dbRef);

    if (snapShot.exists()) {
      setmode(snapShot.val().mode);
    }
  };
  const addPoint = () => {};

  return (
    <div className="admin-container">
      <Navbar />
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
          <p className="coardinates-control-element">
            board number :{' '}
            <input
              type="text"
              value={boardNum}
              onChange={(e) => setBoardNum(e.target.value)}
            />{' '}
          </p>
          <p className="coardinates-control-element">
            altitude :{' '}
            <input
              type="text"
              value={altitude}
              onChange={(e) => setAltitude(e.target.value)}
            />{' '}
          </p>
          <p className="coardinates-control-element">
            lantitude :{' '}
            <input
              type="text"
              value={lantitude}
              onChange={(e) => setLantitude(e.target.value)}
            />{' '}
          </p>
          <button onClick={addPoint}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
