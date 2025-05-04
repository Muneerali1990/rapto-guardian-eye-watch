'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LocationChartProps {
  locations: Array<{
    timestamp: string;
    coordinates: {
      lat: number;
      lon: number;
    };
  }>;
}

const LocationChart = ({ locations }: LocationChartProps) => {
  const chartData = locations.map(location => ({
    time: new Date(location.timestamp).toLocaleTimeString(),
    latitude: location.coordinates.lat,
    longitude: location.coordinates.lon
  }));

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }}
            label={{ 
              value: 'Time', 
              position: 'bottom',
              fontSize: 14
            }}
          />
          <YAxis
            label={{ 
              value: 'Coordinates',
              angle: -90,
              position: 'left',
              fontSize: 14
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="latitude"
            stroke="#8884d8"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="longitude"
            stroke="#82ca9d"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LocationChart;