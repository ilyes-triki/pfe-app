import React, { useState, useContext } from 'react';
import {
  getDocs,
  where,
  collection,
  setDoc,
  query,
  doc,
} from 'firebase/firestore';
import { db } from '../../../../config/firebase-config';
import { BoardContext } from '../../BoardsProvider.js';

const AddCoardinates = () => {
  const { firestoreBoards } = useContext(BoardContext);

  let [lantitude, setLantitude] = useState();
  let [altitude, setAltitude] = useState();
  let [boardNum, setBoardNum] = useState();
  const addPoint = async () => {
    try {
      // Append "-b" to the boardNum
      const modifiedBoardNum = boardNum + '-b' + (firestoreBoards.length + 1);

      // Create a reference to the "markers" collection
      const markersRef = collection(db, 'markers');

      // Query for documents with matching latitude and altitude
      const querySnapshot = await getDocs(
        query(
          markersRef,
          where('lantitude', '==', lantitude),
          where('altitude', '==', altitude)
        )
      );

      // If a matching document exists, alert the user
      if (!querySnapshot.empty) {
        alert(
          'This board already exists. Please choose a different board number.'
        );
        return;
      }

      // Otherwise, add data to Firestore
      await setDoc(doc(db, 'markers', modifiedBoardNum), {
        lantitude,
        altitude,
      });

      console.log('Data successfully added to Firestore');
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
    }

    setAltitude('');
    setBoardNum('');
    setLantitude('');
    window.location.reload();
  };

  return (
    <div>
      <p className="coardinates-control-element">
        board name :{' '}
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
  );
};
export default AddCoardinates;
