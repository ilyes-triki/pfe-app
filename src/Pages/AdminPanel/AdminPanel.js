import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db as fdb } from '../../config/firebase-config';
import { getDatabase, ref, get } from 'firebase/database';
import Navbar from '../../elements/navbar/Navbar.js';

import ModeSelector from './adminPanel-elements/ModeSelector.js';

import app from '../../config/firebase-config';
import MapElement from './adminPanel-elements/MapElement.js';

import './AdminPage.css';

const AdminPanel = () => {
  let [markers, setMarkers] = useState([]);
  let [update, setUpdate] = useState();
  let [mode, setmode] = useState();
  let [lantitude, setLantitude] = useState();
  let [altitude, setAltitude] = useState();
  const db = getDatabase(app);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const markersRef = collection(fdb, 'markers');
        const snapshot = await getDocs(markersRef);
        const markerData = snapshot.docs.map((doc) => ({
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
  useEffect(() => {
    console.log(markers);
  }, [markers]);
  const fetchData = async () => {
    const dbRef = ref(db, 'options');
    const snapShot = await get(dbRef);

    if (snapShot.exists()) {
      setUpdate(snapShot.val().updated);
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
        {/* coardinates control panel */}
        {/* 
        <div className="coardinates-control">
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

        <MapElement /> */}
      </div>
    </div>
  );
};

export default AdminPanel;
// 1 monotone / 2 :monotone specific / 3 :specific on / 4 : specific off / 5 : all on / 6 : all off
