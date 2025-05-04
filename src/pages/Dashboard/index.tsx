'use client';
import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import { useLocations } from '@/hooks/use-location';
import Tilt from 'react-parallax-tilt';
import axios from 'axios';
import { Globe, MapPin, Clock, Activity } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

// Initialize Mapbox with your access token
const MAPBOX_ACCESS_TOKEN = 'pk.0d72cc5bfed4f78abf2de774fba784f9';
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

interface Location {
  id: string;
  deviceId: string;
  coordinates: { lat: number; lon: number };
  address: string;
  timestamp: string;
}

const LocationMap = ({ locations, center, currentPosition }: {
  locations: Location[];
  center?: [number, number];
  currentPosition: GeolocationPosition | null;
}) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [currentAddress, setCurrentAddress] = useState('Locating...');
  const [autoFollow, setAutoFollow] = useState(true);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(12);

  const fetchAddress = useCallback(async (lat: number, lon: number) => {
    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json`, {
        params: {
          access_token: MAPBOX_ACCESS_TOKEN,
          types: 'place,address'
        }
      });
      setCurrentAddress(response.data.features[0]?.place_name || 'Unknown location');
      setAddressError(null);
    } catch (error) {
      setCurrentAddress(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
      setAddressError('Could not fetch address');
    }
  }, []);

  useEffect(() => {
    const initializeMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center || [67.0011, 24.8607], // Default to Karachi
      zoom: zoomLevel,
      pitch: 45,
      bearing: 0,
      antialias: true
    });

    initializeMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    initializeMap.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    initializeMap.on('load', () => {
      initializeMap.addSource('path', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: locations.map(loc => [loc.coordinates.lon, loc.coordinates.lat])
          }
        }
      });

      initializeMap.addLayer({
        id: 'path-layer',
        type: 'line',
        source: 'path',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#FF3366',
          'line-width': 4,
          'line-opacity': 0.8
        }
      });

      locations.forEach(loc => {
        new mapboxgl.Marker({ color: '#00F5D4' })
          .setLngLat([loc.coordinates.lon, loc.coordinates.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <div class="p-4 bg-gray-800 text-white rounded-lg">
              <h3 class="font-bold">${loc.address}</h3>
              <p class="text-sm">${new Date(loc.timestamp).toLocaleString()}</p>
            </div>
          `))
          .addTo(initializeMap);
      });

      setMap(initializeMap);
    });

    return () => {
      if (initializeMap && !initializeMap._removed) {
        initializeMap.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!map || !currentPosition) return;

    const { latitude, longitude } = currentPosition.coords;
    
    if (autoFollow) {
      map.flyTo({
        center: [longitude, latitude],
        zoom: 14,
        speed: 0.8
      });
    }

    const markerEl = document.createElement('div');
    markerEl.className = 'pulsating-marker';
    markerEl.style.background = 'radial-gradient(circle, #FF3366 0%, rgba(255, 51, 102, 0.2) 70%)';
    markerEl.style.width = '32px';
    markerEl.style.height = '32px';
    markerEl.style.borderRadius = '50%';

    const currentMarker = new mapboxgl.Marker({ element: markerEl })
      .setLngLat([longitude, latitude])
      .addTo(map);

    const pathSource = map.getSource('path') as mapboxgl.GeoJSONSource;
    pathSource.setData({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: locations.map(loc => [loc.coordinates.lon, loc.coordinates.lat])
      }
    });

    fetchAddress(latitude, longitude);

    return () => {
      currentMarker.remove();
    };
  }, [map, currentPosition, locations, autoFollow, fetchAddress]);

  return (
    <div className="relative h-full w-full">
      <style>{`
        .pulsating-marker {
          animation: pulsate 1.4s ease-in-out infinite;
        }
        @keyframes pulsate {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div id="map" className="h-full w-full rounded-xl overflow-hidden shadow-lg" />
      {currentPosition && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 p-4 bg-gray-900/90 backdrop-blur-md text-white rounded-xl shadow-xl max-w-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <h3 className="font-semibold text-cyan-400">Current Location</h3>
          </div>
          <p className="text-sm text-gray-300">{currentAddress}</p>
          {addressError && <p className="text-xs text-red-400 mt-1">{addressError}</p>}
        </motion.div>
      )}
    </div>
  );
};

const LocationTable = ({ locations, isLoading }: { locations: Location[], isLoading: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg mb-4"
      >
        <Clock className="w-5 h-5 inline mr-2" />
        {isOpen ? 'Hide History' : 'Show History'}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600/50">
                  <th className="p-3 text-left text-gray-200">Device</th>
                  <th className="p-3 text-left text-gray-200">Address</th>
                  <th className="p-3 text-left text-gray-200">Coordinates</th>
                  <th className="p-3 text-left text-gray-200">Time</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="p-3">
                      <Skeleton className="h-10 w-full" />
                    </td>
                  </tr>
                ) : locations.map((loc) => (
                  <motion.tr
                    key={loc.id}
                    className="border-b border-gray-600/20 hover:bg-gray-700/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td className="p-3 text-gray-300">{loc.deviceId}</td>
                    <td className="p-3 text-gray-300">{loc.address}</td>
                    <td className="p-3 text-gray-300">
                      {loc.coordinates.lat.toFixed(4)}, {loc.coordinates.lon.toFixed(4)}
                    </td>
                    <td className="p-3 text-gray-300">
                      {new Date(loc.timestamp).toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function DashboardPage() {
  const { locations, isLoading, error, saveLocation } = useLocations();
  const [currentPosition, setCurrentPosition] = useState<GeolocationPosition | null>(null);
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [positionError, setPositionError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setPositionError("Geolocation is not supported by your browser");
    }
  }, []);

  useEffect(() => {
    if (!trackingEnabled) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentPosition(position);
        saveLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          deviceId: 'user-device'
        });
      },
      (error) => {
        setPositionError(error.message);
        setCurrentPosition(null);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [trackingEnabled, saveLocation]);

  const allLocations = [
    ...locations,
    ...(currentPosition ? [{
      id: 'current',
      deviceId: 'live-position',
      coordinates: {
        lat: currentPosition.coords.latitude,
        lon: currentPosition.coords.longitude
      },
      address: 'Current Position',
      timestamp: new Date().toISOString()
    }] : [])
  ].slice(-25);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Live Location Tracker
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setTrackingEnabled(!trackingEnabled)}
            className={`px-6 py-3 rounded-full font-semibold flex items-center gap-2 ${
              trackingEnabled
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            <Activity className="w-5 h-5" />
            {trackingEnabled ? 'Stop Tracking' : 'Start Tracking'}
          </motion.button>
        </div>

        {positionError && (
          <div className="mb-4 p-4 bg-red-600/20 text-red-100 rounded-xl">
            Error: {positionError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-300">Tracking Status</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-6 w-24" />
              ) : (
                <div className={`text-xl font-bold ${
                  trackingEnabled ? 'text-green-400' : 'text-red-400'
                }`}>
                  {trackingEnabled ? 'Active' : 'Inactive'}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-300">Locations Tracked</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-6 w-16" />
              ) : (
                <div className="text-xl font-bold text-cyan-400">
                  {locations.length}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-300">Last Update</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : (
                <div className="text-xl font-bold text-cyan-400">
                  {new Date().toLocaleTimeString()}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 bg-gray-800/50 border-gray-700">
          <CardContent className="h-[600px] p-0">
            {!MAPBOX_ACCESS_TOKEN ? (
              <div className="h-full flex items-center justify-center text-red-400">
                Map configuration error - missing access token
              </div>
            ) : isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading map...</div>
              </div>
            ) : error ? (
              <div className="h-full flex items-center justify-center text-red-400">
                Error: {error.message}
              </div>
            ) : (
              <LocationMap
                locations={allLocations}
                currentPosition={currentPosition}
                center={currentPosition && [
                  currentPosition.coords.longitude,
                  currentPosition.coords.latitude
                ]}
              />
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-6">
            <LocationTable locations={allLocations} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}