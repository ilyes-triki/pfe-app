import React, { useRef, useState, useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import osm from './mapConfig';
import { icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { BoardContext } from '../../BoardsProvider.js';

import 'leaflet/dist/leaflet.css';
import './MapElement.css';

/**
 * Renders a map element with markers based on firestoreBoards data.
 *
 * @return {JSX.Element} The map element JSX
 */
const MapElement = () => {
  const { firestoreBoards } = useContext(BoardContext);
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    const newMarkers = firestoreBoards.map((board) => ({
      geocode: [parseFloat(board.altitude), parseFloat(board.latitude)],
      popUp: `hello im position ${board.id}`,
    }));
    setMarkers(newMarkers);
  }, [firestoreBoards]);
  const [center, setCenter] = useState({ lat: 36.796454, lng: 10.177566 });
  const ZOOM_LEVEL = 11;
  const customIcon = new icon({
    iconUrl: osm.iconUrl,
    iconSize: [20, 20],
  });
  const mapRef = useRef();
  return (
    <div>
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
        <TileLayer url={osm.maptiler.url} />
        <MarkerClusterGroup>
          {markers.map((marker) => (
            <Marker
              position={marker.geocode}
              icon={customIcon}
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
