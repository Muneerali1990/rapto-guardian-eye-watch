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
  
  export interface ApiError {
    message: string;
    statusCode: number;
  }