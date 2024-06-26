import React, { createContext, useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';
import { db as firestoreDb } from '../../config/firebase-config.js';

import app from '../../config/firebase-config.js';

export const BoardContext = createContext();

const fetchFirestoreErrors = async () => {
  try {
    const errorsRef = collection(firestoreDb, 'errorMessages');
    const snapshot = await getDocs(errorsRef);
    const errorData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return errorData;
  } catch (error) {
    console.error('Error fetching Firestore errors:', error);
    return [];
  }
};

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
  const [errorMessages, setErrorMessages] = useState([]);

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

  useEffect(() => {
    const setupRealTimeListener = () => {
      const errorsRef = collection(firestoreDb, 'errorMessages');
      return onSnapshot(errorsRef, (snapshot) => {
        const errorData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (errorData) {
          return;
        } else {
          setErrorMessages(errorData);
        }
      });
    };

    const unsubscribe = setupRealTimeListener();

    const intervalId = setInterval(async () => {
      const errorData = await fetchFirestoreErrors();
      setErrorMessages(errorData);
      const rtdbBoards = await fetchRealtimeBoardsSync();
      setRealtimeBoards(rtdbBoards);
    }, 5000);

    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, []);

  /**
   * Adds new boards to the local boards list if they are unique.
   *
   * @param {Array} boards - The array of boards to be added locally.
   * @return {void} This function does not return anything.
   */
  const addBoardsToLocal = (boards) => {
    const lastChars = boards.map((board) => board.match(/-b(\d+)/)[1]);
    setLocalBoards(lastChars);
  };
  useState(() => {
    const fetchData = async () => {
      const firestoreData = await fetchFirestoreBoardsSync();
      setFirestoreBoards(firestoreData);
      const realtimeData = await fetchRealtimeBoardsSync();
      setRealtimeBoards(realtimeData);
      const errors = await fetchFirestoreErrors();
      setErrorMessages(errors);
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
        errorMessages,
        setErrorMessages,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
