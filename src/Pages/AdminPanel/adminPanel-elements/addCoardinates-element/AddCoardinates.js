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
import PopupDelete from '../popup-elements/DeletePopup.js';
import { Input, message } from 'antd';

import './AddCoardinates.css';

/**
 * Renders a component for adding coordinates to Firestore.
 *
 * @return {JSX.Element} The rendered component.
 */
const AddCoardinates = () => {
  const { firestoreBoards, setFirestoreBoards } = useContext(BoardContext);

  let [latitude, setLatitude] = useState();
  let [altitude, setAltitude] = useState();
  let [boardNum, setBoardNum] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  /**
   * Calculates the missing number in a sequence of existing numbers.
   *
   * @param {array} board - The board containing the existing numbers.
   * @return {number} The missing number in the sequence.
   */
  const checkMissingNumber = (board) => {
    const existingNumbers = board
      .map((item) => parseInt(item.id.match(/-b(\d+)/)[1]))
      .sort((a, b) => a - b);
    console.log(existingNumbers);
    let missingNumber = existingNumbers[0];
    for (let i = 1; i <= existingNumbers.length + 1; i++) {
      if (!existingNumbers.includes(i)) {
        missingNumber = i;
        break;
      }
    }

    return missingNumber;
  };

  /**
   * Adds a point to Firestore with the given coordinates.
   *
   * @return {Promise<void>} Resolves when the point is successfully added, or rejects with an error.
   */
  const addPoint = async () => {
    try {
      let missingNumber = checkMissingNumber(firestoreBoards);
      console.log(missingNumber);

      const modifiedBoardNum = boardNum + '-b' + missingNumber;

      const markersRef = collection(db, 'markers');

      const querySnapshot = await getDocs(
        query(
          markersRef,
          where('latitude', '==', latitude),
          where('altitude', '==', altitude)
        )
      );

      if (!querySnapshot.empty || !latitude || !altitude) {
        alert('Please check your inputs.');
        setAltitude('');
        setLatitude('');
        return;
      }

      await setDoc(doc(db, 'markers', modifiedBoardNum), {
        latitude,
        altitude,
      });
      await setFirestoreBoards([
        ...firestoreBoards,
        {
          id: boardNum + '-b' + missingNumber,
          latitude: latitude,
          altitude: altitude,
        },
      ]);

      setAltitude('');
      setLatitude('');
      setBoardNum('');

      message.success('Coardinates added successfully');
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="outer-coardinates-control-panel">
      <div className="title">
        <h2>Add & Delete Coardinates</h2>
      </div>
      <div className="coardinates-control-panel">
        <p className="coardinates-control-element">
          <h4> Board name :</h4>

          <Input
            placeholder="board name"
            value={boardNum}
            onChange={(e) => setBoardNum(e.target.value)}
          />
        </p>
        <p className="coardinates-control-element">
          <h4> Altitude :</h4>
          <Input
            placeholder="altitude"
            value={altitude}
            onChange={(e) => setAltitude(e.target.value)}
          />
        </p>
        <p className="coardinates-control-element">
          <h4>Latitude :</h4>
          <Input
            placeholder="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </p>
      </div>
      <div className="coardinates-control-buttons">
        <button className="outlined-button" onClick={addPoint}>
          Add
        </button>
        <button className="outlined-button" onClick={togglePopup}>
          Select Boards
        </button>
        <PopupDelete isOpen={isPopupOpen} onClose={togglePopup} />
      </div>
    </div>
  );
};
export default AddCoardinates;
