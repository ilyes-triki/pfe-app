import React, { createContext, useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { getDocs, collection } from 'firebase/firestore';
import { db as firestoreDb } from '../../config/firebase-config.js';
import app from '../../config/firebase-config.js';

export const BoardContext = createContext();

const fetchFirestoreBoardsSync = async () => {
  try {
    const boardsRef = collection(firestoreDb, 'markers');
    const snapshot = await getDocs(boardsRef);
    const boardData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return boardData;
  } catch (error) {
    console.error('Error fetching Firestore boards:', error);
    return [];
  }
};

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

export const BoardProvider = ({ children }) => {
  const [firestoreBoards, setFirestoreBoards] = useState([]);
  const [realtimeBoards, setRealtimeBoards] = useState([]);
  const [localBoards, setLocalBoards] = useState([]);
  const [commonBoards, setCommonBoards] = useState([]);

  const updateCommonBoards = (firestoreData, realtimeData) => {
    const common = firestoreData
      .filter((board) =>
        realtimeData.some(
          (realtimeBoard) => board.id[board.id.length - 1] === realtimeBoard
        )
      )
      .map((board) => board.id);
    setCommonBoards(common);
  };

  const addBoardsToLocal = (boards) => {
    const uniqueBoards = boards.filter(
      (board) =>
        !localBoards.some((existingBoard) => existingBoard.id === board.id)
    );
    const lastChars = uniqueBoards.map((board) =>
      board.charAt(board.length - 1)
    );
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
  // useEffect(() => { const fetchData = async () => {
  //   const firestoreData = await fetchFirestoreBoardsSync();
  //   setFirestoreBoards(firestoreData);
  //   const realtimeData = await fetchRealtimeBoardsSync();
  //   setRealtimeBoards(realtimeData);
  //   updateCommonBoards(firestoreData, realtimeData);
  // };
  // fetchData();}, []);

  return (
    <BoardContext.Provider
      value={{
        firestoreBoards,
        realtimeBoards,
        localBoards,
        addBoardsToLocal,
        commonBoards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
