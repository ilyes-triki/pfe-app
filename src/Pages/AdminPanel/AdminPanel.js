import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db as fdb } from '../../config/firebase-config';
import { getDatabase, ref, get } from 'firebase/database';
import Navbar from '../../elements/navbar/Navbar.js';

import ModeSelector from './adminPanel-elements/ModeSelector.js';

import app from '../../config/firebase-config';
import MapElement from './adminPanel-elements/MapElement.js';

import './AdminPage.css';
import { Await } from 'react-router-dom';

const AdminPanel = () => {
  let [markers, setMarkers] = useState([]);
  let [boards, setboards] = useState([]);
  let [mode, setmode] = useState();
  let [lantitude, setLantitude] = useState();
  let [altitude, setAltitude] = useState();
  let [boardNum, setBoardNum] = useState();

  const db = getDatabase(app);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const markersRef = collection(fdb, 'markers');
        const snapshot = await getDocs(markersRef);
        const markerData = await snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMarkers(markerData);
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };
    fetchMarkers();
    fetchData();
  }, []);
  // useEffect(() => {
  //   console.log(markers);
  //   console.log('boards from rtdb', boards);
  // }, [markers, boards]);
  const fetchData = async () => {
    const dbRef = ref(db, 'options');
    const snapShot = await get(dbRef);

    if (snapShot.exists()) {
      setboards(snapShot.val().boards);

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
            {mode && boards !== undefined ? (
              <ModeSelector
                initialMode={mode}
                coardinates={markers}
                rtdbBoards={boards}
              />
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
