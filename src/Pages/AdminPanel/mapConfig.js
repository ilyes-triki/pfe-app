export default {
  maptiler: {
    url: 'https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=YPCh7N0i9v5QQ65m4oz9',
    attribution: '',
  },
};
let markers = [];

const storeMarker = (marker) => {
  markers.push(marker);
};

export { storeMarker, markers };
