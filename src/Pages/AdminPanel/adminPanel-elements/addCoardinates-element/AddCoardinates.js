import React, { useState, useContext, useEffect } from 'react';
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

  const checkMissingNumber = (board) => {
    const existingNumbers = board
      .map((item) => parseInt(item.id[item.id.length - 1]))
      .sort((a, b) => a - b);
    let missingNumber;
    for (let i = 0; i <= existingNumbers.length - 1; i++) {
      if (existingNumbers[i + 1] - existingNumbers[i] > 1) {
        missingNumber = existingNumbers[i] + 1;
        break;
      }
    }
    if (missingNumber === undefined) {
      missingNumber = board.length + 1;
    }
    return missingNumber;
  };

  const addPoint = async () => {
    try {
      let missingNumber = checkMissingNumber(firestoreBoards);

      const modifiedBoardNum = boardNum + '-b' + missingNumber;

      const markersRef = collection(db, 'markers');

      const querySnapshot = await getDocs(
        query(
          markersRef,
          where('lantitude', '==', lantitude),
          where('altitude', '==', altitude)
        )
      );

      if (!querySnapshot.empty || !lantitude || !altitude) {
        alert('This board already exists. Please choose a valid coardinates.');
        setAltitude('');

        setLantitude('');
        return;
      }

      await setDoc(doc(db, 'markers', modifiedBoardNum), {
        lantitude,
        altitude,
      });

      console.log('Data successfully added to Firestore');
      alert('Mode updated successfully!');

      window.location.reload();
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
    }
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
