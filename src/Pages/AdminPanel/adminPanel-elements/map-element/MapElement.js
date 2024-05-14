import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import osm, { markers } from '../mapConfig';
import { icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import './MapElement.css';

const MapElement = () => {
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
