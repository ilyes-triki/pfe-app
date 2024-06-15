import React, { useRef, useState, useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import osm from './mapConfig';
import { icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { BoardContext } from '../../BoardsProvider.js';
import { getDatabase, ref, get } from 'firebase/database';
import app from '../../../../config/firebase-config.js';

import 'leaflet/dist/leaflet.css';
import './MapElement.css';

/**
 * Renders a map element with markers based on firestoreBoards data.
 *
 * @return {JSX.Element} The map element JSX
 */
const MapElement = () => {
  const { firestoreBoards, errorMessages, realtimeBoards } =
    useContext(BoardContext);
  const [markers, setMarkers] = useState([]);
  let [mode, setmode] = useState();

  const db = getDatabase(app);

  useEffect(() => {
    fetchData();
  });
  const fetchData = async () => {
    const dbRef = ref(db, 'options');
    const snapShot = await get(dbRef);

    if (snapShot.exists()) {
      setmode(snapShot.val().mode);
    }
  };

  useEffect(() => {
    const newMarkers = firestoreBoards.map((board) => ({
      geocode: [parseFloat(board.altitude), parseFloat(board.latitude)],
      popUp: `hello im position ${board.id}`,
    }));
    setMarkers(newMarkers);
  }, [firestoreBoards]);
  const [center, setCenter] = useState({ lat: 36.796454, lng: 10.177566 });
  const ZOOM_LEVEL = 11;

  const yellowIcon = new icon({
    iconUrl: osm.yellowIcon,
    iconSize: [20, 20],
  });

  const blackIcon = new icon({
    iconUrl: osm.blackIcon,
    iconSize: [20, 20],
  });
  const redIcon = new icon({
    iconUrl: osm.redIcon,
    iconSize: [20, 20],
  });

  const mapRef = useRef();

  const isErrorBoard = (boardNumber) => {
    return errorMessages.some((error) => error.board_number === boardNumber);
  };
  const isLocalBoard = (boardNumber) => {
    return realtimeBoards.some((board) => board == boardNumber);
  };

  return (
    <div>
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
        <TileLayer url={osm.maptiler.url} />
        <MarkerClusterGroup>
          {markers.map((marker, index) => (
            <Marker
              position={marker.geocode}
              icon={
                isErrorBoard(index + 1)
                  ? redIcon
                  : mode === 5 || mode === 1
                  ? yellowIcon
                  : mode === 6
                  ? blackIcon
                  : [2, 3, 4].includes(mode) && isLocalBoard(index + 1)
                  ? yellowIcon
                  : blackIcon
              }
              popup={marker.popUp}
            >
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapElement;
