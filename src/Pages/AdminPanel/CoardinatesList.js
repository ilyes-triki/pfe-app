import React, { useEffect, useState } from 'react';
import { markers } from './mapConfig';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

const CoardinatesList = () => {
  useEffect(() => {
    const fetchMarkers = async () => {
      const docRef = doc(db, 'Markers');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
      } else {
        console.log('No such document!');
      }
    };
    fetchMarkers();
  }, []);
  let [markersData, setMarkersData] = useState(markers);

  const handleDelete = (id) => {
    const updatedData = markers.filter((item) => item.marker.id !== id);
    setMarkersData(updatedData);
  };
  return (
    <div className="coardinates-list">
      <ul>
        {markersData.map((e) => {
          return (
            <li key={e.marker.id}>
              <p>lantitude : {e.marker.lan} </p>
              <p>altitude : {e.marker.alt} </p>
              <button onClick={() => handleDelete(e.marker.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CoardinatesList;
