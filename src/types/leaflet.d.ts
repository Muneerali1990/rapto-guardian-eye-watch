// src/types/leaflet.d.ts
import 'leaflet';

declare module 'leaflet' {
  interface IconOptions {
    _getIconUrl?: string;
  }
  
  class Icon {
    options: IconOptions;
    constructor(options: IconOptions);
  }
  
  class Default extends Icon {}
}