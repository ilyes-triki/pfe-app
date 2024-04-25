import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import osm from '../mapConfig';
import 'leaflet/dist/leaflet.css';
import './MapElement.css';

const MapElement = () => {
  const [center, setCenter] = useState({ lat: 36.796454, lng: 10.177566 });
  const ZOOM_LEVEL = 11;
  const mapRef = useRef();
  return (
    <div>
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
        <TileLayer url={osm.maptiler.url} />
      </MapContainer>
    </div>
  );
};

export default MapElement;
