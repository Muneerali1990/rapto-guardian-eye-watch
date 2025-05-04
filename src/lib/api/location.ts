// src/lib/api/location.ts

// 1. Define the ApiError interface
export interface ApiError {
    message: string;
    statusCode: number;
  }
  
  // 2. Define the LocationData interface
  export interface LocationData {
    id: string;
    deviceId: string;
    coordinates: {
      lat: number;
      lon: number;
    };
    address: string;
    timestamp: string;
  }
  
  // 3. Update the API functions
  export const fetchLocations = async (): Promise<LocationData[]> => {
    const response = await fetch('http://localhost:5000/api/locations');
    
    if (!response.ok) {
      const error: ApiError = await response.json(); // Now using defined ApiError
      throw new Error(error.message || 'Failed to fetch locations');
    }
  
    return response.json();
  };
  
  export const postLocation = async (data: {
    lat: number;
    lon: number;
    deviceId: string;
  }): Promise<LocationData> => {
    const response = await fetch('http://localhost:5000/api/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const error: ApiError = await response.json(); // Now using defined ApiError
      throw new Error(error.message || 'Failed to save location');
    }
  
    return response.json();
  };