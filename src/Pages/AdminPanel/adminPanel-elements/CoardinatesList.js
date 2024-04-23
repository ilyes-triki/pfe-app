import React, { useEffect, useState } from 'react';
import { markers } from './mapConfig';

const CoardinatesList = () => {
  let [markers, setMarkers] = useState([]);

  const handleDelete = (id) => {
    const updatedData = markers.filter((item) => item.marker.id !== id);
    setMarkers(updatedData);
  };
  return (
    <div className="coardinates-list">
      <ul>
        {markers.map((e) => {
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
