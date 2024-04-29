import React, { createContext, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { getDocs, collection } from 'firebase/firestore';
import { db as firestoreDb } from '../../config/firebase-config.js';
import app from '../../config/firebase-config.js';

export const BoardContext = createContext();

/**
 * Fetches Firestore boards synchronously.
 *
 * @return {Array} An array of board data.
 */
const fetchFirestoreBoardsSync = async () => {
  try {
    const boardsRef = collection(firestoreDb, 'markers');
    const snapshot = await getDocs(boardsRef);
    const boardData = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => {
        const aNumber = parseInt(a.id.match(/-b(\d+)/)[1]);
        const bNumber = parseInt(b.id.match(/-b(\d+)/)[1]);
        return aNumber - bNumber;
      });

    return boardData;
  } catch (error) {
    console.error('Error fetching Firestore boards:', error);
    return [];
  }
};

/**
 * Fetches Realtime Database boards synchronously.
 *
 * @return {Promise<Array>} A promise that resolves to an array of board data.
 * If the snapshot exists, it returns the values of the existing data.
 * If the snapshot does not exist, it returns an empty array.
 * If an error occurs, it logs the error and returns an empty array.
 */
const fetchRealtimeBoardsSync = async () => {
  try {
    const db = getDatabase(app);
    const boardsRef = ref(db, 'options/boards');
    const snapshot = await get(boardsRef);
    if (snapshot.exists()) {
      const existingData = snapshot.val();
      return existingData ? Object.values(existingData) : [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching Realtime Database boards:', error);
    return [];
  }
};

/**
 * Initializes the BoardProvider component with Firestore, Realtime, and Local boards.
 * Updates common boards, adds new boards locally, and fetches data asynchronously.
 *
 * @param {Object} children - The children components.
 * @return {JSX.Element} The BoardContext.Provider component with board data.
 */
export const BoardProvider = ({ children }) => {
  const [firestoreBoards, setFirestoreBoards] = useState([]);
  const [realtimeBoards, setRealtimeBoards] = useState([]);
  const [localBoards, setLocalBoards] = useState([]);
  const [commonBoards, setCommonBoards] = useState([]);

  /**
   * Updates the common boards based on the provided Firestore data and Realtime data.
   *
   * @param {Array} firestoreData - The Firestore data containing board objects.
   * @param {Array} realtimeData - The Realtime data containing board IDs.
   * @return {void} This function does not return anything.
   */
  const updateCommonBoards = (firestoreData, realtimeData) => {
    const common = firestoreData
      .filter((board) =>
        realtimeData.some(
          (realtimeBoard) => board.id.match(/-b(\d+)/)[1] === realtimeBoard
        )
      )
      .map((board) => board.id);
    setCommonBoards(common);
  };

  /**
   * Adds new boards to the local boards list if they are unique.
   *
   * @param {Array} boards - The array of boards to be added locally.
   * @return {void} This function does not return anything.
   */
  const addBoardsToLocal = (boards) => {
    const uniqueBoards = boards.filter(
      (board) =>
        !localBoards.some(
          (existingBoard) => existingBoard === board.match(/-b(\d+)/)[1]
        )
    );
    const lastChars = uniqueBoards.map((board) => board.match(/-b(\d+)/)[1]);
    setLocalBoards((prevBoards) => [...prevBoards, ...lastChars]);
  };
  useState(() => {
    const fetchData = async () => {
      const firestoreData = await fetchFirestoreBoardsSync();
      setFirestoreBoards(firestoreData);
      const realtimeData = await fetchRealtimeBoardsSync();
      setRealtimeBoards(realtimeData);
      updateCommonBoards(firestoreData, realtimeData);
    };
    fetchData();
  }, []);

  return (
    <BoardContext.Provider
      value={{
        firestoreBoards,
        realtimeBoards,
        localBoards,
        addBoardsToLocal,
        commonBoards,
        setFirestoreBoards,
        setLocalBoards,
        setCommonBoards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
