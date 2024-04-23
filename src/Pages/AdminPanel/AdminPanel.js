import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db as fdb } from '../../config/firebase-config';
import { getDatabase, ref, set, push, get, off } from 'firebase/database';
import Navbar from '../../elements/navbar/Navbar.js';
import Footer from '../../elements/footer/Footer.js';

import app from '../../config/firebase-config';
import MapElement from './MapElement.js';

import './AdminPage.css';

const AdminPanel = () => {
  let [markers, setMarkers] = useState([]);

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
  }, []);
  useEffect(() => {
    console.log(markers);
  }, [markers]);
  let [update, setUpdate] = useState();
  let [mode, setmode] = useState();
  let [onOff, setonOff] = useState();
  let [lantitude, setLantitude] = useState();
  let [altitude, setAltitude] = useState();

  const db = getDatabase(app);

  const fetchData = async () => {
    const dbRef = ref(db, 'options');
    const snapShot = await get(dbRef);

    if (snapShot.exists()) {
      setUpdate(snapShot.val().updated);
      setmode(snapShot.val().mode);
      setonOff(snapShot.val().onOff);
    }
  };

  const addPoint = () => {};

  return (
    <div className="admin-container">
      <Navbar />
      <div className="panels-container">
        {/* Ligth control panel */}
        <div className="ligth-control">
          <p className="ligth-control-element">
            Please choose the operating mode to use :
          </p>

          <button onClick={fetchData}>Fetch data</button>
        </div>
        {/* coardinates control panel */}

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

        <MapElement />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default AdminPanel;
// 1 monotone / 2 :monotone specific / 3 :specific on / 4 : specific off / 5 : all on / 6 : all off
