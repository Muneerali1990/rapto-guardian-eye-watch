'use client';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet marker icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  locations: Array<{
    coordinates: {
      lat: number;
      lon: number;
    };
    address: string;
  }>;
}

const Map = ({ locations }: MapProps) => (
  <MapContainer
    center={[40.7128, -74.0060]}
    zoom={13}
    className="h-full w-full"
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    {locations.map((location, index) => (
      <Marker
        key={index}
        position={[location.coordinates.lat, location.coordinates.lon]}
      >
        <Popup>{location.address}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default Map;