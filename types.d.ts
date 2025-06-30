declare module '@mapsindoors/map-template/dist/mapsindoors-react.es.js' {
  // Define the exports from the module
  export interface MapsIndoorsMapProps {
    // Add properties as required
    apiKey?: string,
    mapboxAccessToken?: string,
    logo?: string,
    directionsFrom?: string,
    directionsTo?: string,
    center?: string
  }

  const MapsIndoorsMap: React.ComponentType<MapsIndoorsMapProps>;
  export default MapsIndoorsMap;
}