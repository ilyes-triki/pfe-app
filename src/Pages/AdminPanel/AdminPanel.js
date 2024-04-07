import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db as fdb } from '../../config/firebase-config';
import { getDatabase, ref, set, push, get } from 'firebase/database';
import app from '../../config/firebase-config';
import MapElement from './MapElement.js';
import { markers, storeMarker } from './mapConfig';
import './AdminPage.css';

const AdminPanel = () => {
  useEffect(() => {
    const fetchMarkers = async () => {
      const docRef = collection(fdb, 'markers');
      try {
        const docSnap = await getDocs(docRef);
        if (docSnap.exists) {
          console.log('Document data:', docSnap.data());
        } else {
          console.log('nothing !');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMarkers();
  }, []);
  let [monotone, setMonotone] = useState();
  let [ldrValue, setLdrValue] = useState();
  let [ldrVoltage, setLdrVoltage] = useState();
  let [lantitude, setLantitude] = useState();
  let [altitude, setAltitude] = useState();
  let [markersData, setMarkersData] = useState(markers);

  const db = getDatabase(app);

  const fetchData = async () => {
    const dbRef = ref(db, 'capteur');
    const snapShot = await get(dbRef);

    if (snapShot.exists()) {
      setLdrValue(snapShot.val().ldrValue);
      setLdrVoltage(snapShot.val().ldrVoltage);
      setMonotone(snapShot.val().monotone);
    }
  };
  const switchMode = async () => {
    const dbRef = ref(db, 'capteur');

    set(dbRef, {
      ldrValue: ldrValue,
      ldrVoltage,
      monotone: !monotone,
    });
    setMonotone(!monotone);
  };
  const addPoint = () => {
    const regex = /^[0-9.]+$/;
    if (
      altitude &&
      lantitude &&
      regex.test(lantitude) &&
      regex.test(altitude)
    ) {
      setLantitude('');
      setAltitude('');
      storeMarker({
        marker: {
          id: markers.length,
          lan: lantitude,
          alt: altitude,
        },
      });
      setMarkersData(markers);
    } else {
      alert('the input needs to be numerical');
    }
  };

  console.log(markersData);
  console.log(lantitude, altitude);

  return (
    <div className="admin-container">
      <div className="ligth-control">
        <p className="ligth-control-element">
          ldrValue : <input type="text" value={ldrValue} />{' '}
        </p>
        <p className="ligth-control-element">
          ldrVoltage : <input type="text" value={ldrVoltage} />{' '}
        </p>
        <p className="ligth-control-element">
          mode monotone : <input type="text" value={monotone} /> change monotone
          to :{' '}
          {monotone ? (
            <button onClick={switchMode}>off</button>
          ) : (
            <button onClick={switchMode}>on</button>
          )}
        </p>
        <button onClick={fetchData}>Fetch data</button>
      </div>
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
  );
};

export default AdminPanel;
