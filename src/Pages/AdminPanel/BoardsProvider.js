import React, { createContext, useState } from 'react';
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
    const fetchFirestoreData = async () => {
      const data = await fetchFirestoreBoardsSync();
      setFirestoreBoards(data);
    };
    const fetchRealtimeData = async () => {
      const data = await fetchRealtimeBoardsSync();
      setRealtimeBoards(data);
    };
    fetchFirestoreData();
    fetchRealtimeData();
  }, []);

  return (
    <BoardContext.Provider
      value={{ firestoreBoards, realtimeBoards, localBoards, addBoardsToLocal }}
    >
      {children}
    </BoardContext.Provider>
  );
};
